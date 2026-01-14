/**
 * Monday.com GraphQL API Client
 * 
 * This client provides a simple interface to interact with Monday.com's GraphQL API
 * to update tasks, items, and boards.
 */

export interface MondayClientOptions {
    apiToken: string;
    apiVersion?: string;
}

export interface MondayItem {
    id: string;
    name: string;
    column_values?: Array<{
        id: string;
        text?: string;
        value?: string;
    }>;
    board?: {
        id: string;
        name: string;
    };
}

export interface UpdateItemStatusOptions {
    itemId: string;
    boardId: string;
    statusColumnId: string;
    status: string;
}

export interface CreateItemOptions {
    boardId: string;
    itemName: string;
    groupId?: string;
    columnValues?: Record<string, string>;
}

export class MondayClient {
    private readonly apiToken: string;
    private readonly apiVersion: string;
    private readonly apiUrl: string;

    constructor(options: MondayClientOptions) {
        this.apiToken = options.apiToken;
        this.apiVersion = options.apiVersion || "2023-10";
        this.apiUrl = "https://api.monday.com/v2";
    }

    /**
     * Execute a GraphQL query or mutation
     */
    private async executeQuery<T = unknown>(query: string, variables?: Record<string, unknown>): Promise<T> {
        const response = await fetch(this.apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.apiToken,
                "API-Version": this.apiVersion,
            },
            body: JSON.stringify({
                query,
                variables,
            }),
        });

        if (!response.ok) {
            throw new Error(`Monday.com API error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();

        if (result.errors) {
            throw new Error(`Monday.com GraphQL error: ${JSON.stringify(result.errors)}`);
        }

        return result.data as T;
    }

    /**
     * Get an item by ID
     */
    async getItem(itemId: string, boardId: string): Promise<MondayItem | null> {
        const query = `
            query GetItem($itemId: [ID!], $boardId: [ID!]) {
                items(ids: $itemId, board_ids: $boardId) {
                    id
                    name
                    column_values {
                        id
                        text
                        value
                    }
                    board {
                        id
                        name
                    }
                }
            }
        `;

        const result = await this.executeQuery<{ items: MondayItem[] }>(query, {
            itemId: [itemId],
            boardId: [boardId],
        });

        return result.items[0] || null;
    }

    /**
     * Update an item's status column
     */
    async updateItemStatus(options: UpdateItemStatusOptions): Promise<{ id: string }> {
        const mutation = `
            mutation ChangeColumnValue($boardId: ID!, $itemId: ID!, $columnId: String!, $value: JSON!) {
                change_column_value(
                    board_id: $boardId,
                    item_id: $itemId,
                    column_id: $columnId,
                    value: $value
                ) {
                    id
                }
            }
        `;

        // Monday.com status columns expect JSON with index and post_id
        // Common status values: "Done", "Working on it", "Stuck", etc.
        const statusValue = JSON.stringify({
            index: this.getStatusIndex(options.status),
            post_id: null,
        });

        const result = await this.executeQuery<{ change_column_value: { id: string } }>(mutation, {
            boardId: options.boardId,
            itemId: options.itemId,
            columnId: options.statusColumnId,
            value: statusValue,
        });

        return result.change_column_value;
    }

    /**
     * Update an item to "Done" status
     */
    async markItemAsDone(itemId: string, boardId: string, statusColumnId: string): Promise<void> {
        await this.updateItemStatus({
            itemId,
            boardId,
            statusColumnId,
            status: "Done",
        });
    }

    /**
     * Create a new item in a board
     */
    async createItem(options: CreateItemOptions): Promise<{ id: string }> {
        const mutation = `
            mutation CreateItem($boardId: ID!, $groupId: String, $itemName: String!, $columnValues: JSON) {
                create_item(
                    board_id: $boardId,
                    group_id: $groupId,
                    item_name: $itemName,
                    column_values: $columnValues
                ) {
                    id
                }
            }
        `;

        const columnValues = options.columnValues ? JSON.stringify(options.columnValues) : undefined;

        const result = await this.executeQuery<{ create_item: { id: string } }>(mutation, {
            boardId: options.boardId,
            groupId: options.groupId || null,
            itemName: options.itemName,
            columnValues,
        });

        return result.create_item;
    }

    /**
     * Search for items by name
     */
    async searchItems(boardId: string, searchTerm: string): Promise<MondayItem[]> {
        const query = `
            query SearchItems($boardId: [ID!], $searchTerm: String!) {
                items_by_column_values(
                    board_id: $boardId,
                    column_id: "name",
                    column_value: $searchTerm
                ) {
                    id
                    name
                    column_values {
                        id
                        text
                        value
                    }
                    board {
                        id
                        name
                    }
                }
            }
        `;

        const result = await this.executeQuery<{ items_by_column_values: MondayItem[] }>(query, {
            boardId: [boardId],
            searchTerm,
        });

        return result.items_by_column_values || [];
    }

    /**
     * Get board information
     */
    async getBoard(boardId: string): Promise<{ id: string; name: string; columns: Array<{ id: string; title: string; type: string }> } | null> {
        const query = `
            query GetBoard($boardId: [ID!]) {
                boards(ids: $boardId) {
                    id
                    name
                    columns {
                        id
                        title
                        type
                    }
                }
            }
        `;

        const result = await this.executeQuery<{ boards: Array<{ id: string; name: string; columns: Array<{ id: string; title: string; type: string }> }> }>(query, {
            boardId: [boardId],
        });

        return result.boards[0] || null;
    }

    /**
     * Helper to get status index for common status values
     */
    private getStatusIndex(status: string): number {
        const statusMap: Record<string, number> = {
            "Done": 0,
            "Working on it": 1,
            "Stuck": 2,
            "Not started": 3,
        };

        return statusMap[status] ?? 0;
    }
}

