/**
 * Task Sync Utility
 * 
 * Detects completed tasks from git commits and updates Monday.com accordingly.
 * Supports parsing commit messages, branch names, and file changes to identify tasks.
 */

import { MondayClient } from "./MondayClient.js";
import { execSync } from "child_process";

export interface TaskSyncConfig {
    mondayApiToken: string;
    boardId: string;
    statusColumnId: string;
    // Pattern to match task IDs in commit messages (e.g., "#123", "TASK-123", "MON-456")
    taskIdPattern?: RegExp;
    // Pattern to match "done", "complete", "finished" keywords
    completionKeywords?: string[];
    // Map branch names to Monday.com item IDs (optional)
    branchToItemMap?: Record<string, string>;
}

export interface TaskInfo {
    itemId?: string;
    taskName?: string;
    boardId: string;
}

export class TaskSync {
    private mondayClient: MondayClient;
    private config: TaskSyncConfig;

    constructor(config: TaskSyncConfig) {
        this.config = {
            taskIdPattern: /#(\d+)|(?:TASK|MON|ITEM)[-:](\d+)/i,
            completionKeywords: ["done", "complete", "finished", "completed", "fixed", "resolved"],
            ...config,
        };
        this.mondayClient = new MondayClient({
            apiToken: config.mondayApiToken,
        });
    }

    /**
     * Parse commit message to extract task information
     */
    private parseCommitMessage(commitMessage: string): TaskInfo | null {
        const taskIdMatch = commitMessage.match(this.config.taskIdPattern!);
        
        if (!taskIdMatch) {
            return null;
        }

        const taskId = taskIdMatch[1] || taskIdMatch[2] || taskIdMatch[3];
        const hasCompletionKeyword = this.config.completionKeywords!.some((keyword) =>
            commitMessage.toLowerCase().includes(keyword.toLowerCase())
        );

        if (!hasCompletionKeyword) {
            return null;
        }

        // Extract task name from commit message (everything after the task ID)
        const taskNameMatch = commitMessage.match(new RegExp(`${this.config.taskIdPattern!.source}\\s*[:-]?\\s*(.+)`, "i"));
        const taskName = taskNameMatch ? taskNameMatch[1].trim() : undefined;

        return {
            itemId: taskId,
            taskName,
            boardId: this.config.boardId,
        };
    }

    /**
     * Get the current git branch name
     */
    private getCurrentBranch(): string {
        try {
            return execSync("git rev-parse --abbrev-ref HEAD", { encoding: "utf-8" }).trim();
        } catch {
            return "";
        }
    }

    /**
     * Get the latest commit message
     */
    private getLatestCommitMessage(): string {
        try {
            return execSync("git log -1 --pretty=%B", { encoding: "utf-8" }).trim();
        } catch {
            return "";
        }
    }

    /**
     * Check if a commit message indicates task completion
     */
    async checkAndUpdateFromCommit(commitMessage?: string): Promise<boolean> {
        const message = commitMessage || this.getLatestCommitMessage();
        const taskInfo = this.parseCommitMessage(message);

        if (!taskInfo || !taskInfo.itemId) {
            return false;
        }

        try {
            await this.mondayClient.markItemAsDone(
                taskInfo.itemId,
                taskInfo.boardId,
                this.config.statusColumnId
            );
            console.log(`✅ Updated Monday.com item ${taskInfo.itemId} to "Done"`);
            return true;
        } catch (error) {
            console.error(`❌ Failed to update Monday.com item ${taskInfo.itemId}:`, error);
            return false;
        }
    }

    /**
     * Update task based on branch name (if mapped)
     */
    async updateFromBranch(branchName?: string): Promise<boolean> {
        const branch = branchName || this.getCurrentBranch();
        const itemId = this.config.branchToItemMap?.[branch];

        if (!itemId) {
            return false;
        }

        try {
            await this.mondayClient.markItemAsDone(
                itemId,
                this.config.boardId,
                this.config.statusColumnId
            );
            console.log(`✅ Updated Monday.com item ${itemId} from branch ${branch}`);
            return true;
        } catch (error) {
            console.error(`❌ Failed to update Monday.com item ${itemId}:`, error);
            return false;
        }
    }

    /**
     * Sync task from current git state (commit message + branch)
     */
    async syncCurrentState(): Promise<boolean> {
        const commitUpdated = await this.checkAndUpdateFromCommit();
        if (commitUpdated) {
            return true;
        }

        return await this.updateFromBranch();
    }

    /**
     * Manually mark a task as done
     */
    async markTaskDone(itemId: string): Promise<void> {
        await this.mondayClient.markItemAsDone(
            itemId,
            this.config.boardId,
            this.config.statusColumnId
        );
        console.log(`✅ Manually updated Monday.com item ${itemId} to "Done"`);
    }
}

