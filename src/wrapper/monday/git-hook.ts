#!/usr/bin/env node
/**
 * Git Post-Commit Hook Script
 * 
 * This script should be installed as a git post-commit hook.
 * It automatically updates Monday.com when tasks are completed.
 * 
 * Installation:
 *   cp src/wrapper/monday/git-hook.ts .git/hooks/post-commit
 *   chmod +x .git/hooks/post-commit
 * 
 * Or use the install-hook script in package.json
 */

import { TaskSync } from "./TaskSync.js";
import * as fs from "fs";
import * as path from "path";

// Load configuration from .monday-config.json or environment variables
function loadConfig(): { apiToken: string; boardId: string; statusColumnId: string } | null {
    // Try to load from config file
    const configPath = path.join(process.cwd(), ".monday-config.json");
    if (fs.existsSync(configPath)) {
        try {
            const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
            return {
                apiToken: config.apiToken || process.env.MONDAY_API_TOKEN || "",
                boardId: config.boardId || process.env.MONDAY_BOARD_ID || "",
                statusColumnId: config.statusColumnId || process.env.MONDAY_STATUS_COLUMN_ID || "",
            };
        } catch (error) {
            console.error("Error loading .monday-config.json:", error);
        }
    }

    // Fall back to environment variables
    const apiToken = process.env.MONDAY_API_TOKEN;
    const boardId = process.env.MONDAY_BOARD_ID;
    const statusColumnId = process.env.MONDAY_STATUS_COLUMN_ID;

    if (apiToken && boardId && statusColumnId) {
        return { apiToken, boardId, statusColumnId };
    }

    return null;
}

async function main() {
    const config = loadConfig();

    if (!config) {
        console.log("⚠️  Monday.com config not found. Skipping task sync.");
        console.log("   Create .monday-config.json or set MONDAY_API_TOKEN, MONDAY_BOARD_ID, and MONDAY_STATUS_COLUMN_ID");
        process.exit(0);
    }

    const taskSync = new TaskSync({
        mondayApiToken: config.apiToken,
        boardId: config.boardId,
        statusColumnId: config.statusColumnId,
    });

    try {
        await taskSync.syncCurrentState();
    } catch (error) {
        console.error("Error syncing with Monday.com:", error);
        // Don't fail the commit if sync fails
        process.exit(0);
    }
}

main().catch((error) => {
    console.error("Unexpected error:", error);
    process.exit(0);
});

