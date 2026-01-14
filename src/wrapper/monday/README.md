# Monday.com Integration

This module provides integration with Monday.com to automatically update task statuses when code is committed.

## Features

- ✅ Automatically mark Monday.com items as "Done" when tasks are completed in commits
- 🔍 Parse commit messages to detect task IDs and completion keywords
- 🌿 Support for branch-to-item mapping
- 🔗 Git post-commit hook integration

## Setup

### 1. Get Your Monday.com API Token

1. Go to Monday.com
2. Click your profile picture → **Administration** → **API**
3. Copy your API token

### 2. Get Your Board and Column IDs

You can find these by:
- Opening your Monday.com board
- The board ID is in the URL: `https://[your-account].monday.com/boards/[BOARD_ID]`
- Column IDs can be found using the Monday.com API or browser dev tools

### 3. Configure the Integration

Create a `.monday-config.json` file in your project root:

```json
{
  "apiToken": "your-api-token-here",
  "boardId": "1234567890",
  "statusColumnId": "status",
  "completionKeywords": ["done", "complete", "finished", "completed", "fixed", "resolved"],
  "branchToItemMap": {
    "feature/task-123": "1234567890"
  }
}
```

Or use environment variables:
- `MONDAY_API_TOKEN`
- `MONDAY_BOARD_ID`
- `MONDAY_STATUS_COLUMN_ID`

### 4. Install the Git Hook

```bash
npm run install:monday-hook
```

Or manually:
```bash
cp scripts/install-monday-hook.js .git/hooks/post-commit
chmod +x .git/hooks/post-commit
```

## Usage

### Automatic Updates via Commit Messages

When you commit code, include the task ID and a completion keyword in your commit message:

```bash
git commit -m "fix: #123 done - Fixed authentication bug"
git commit -m "feat: TASK-456 completed - Added user dashboard"
git commit -m "MON-789 finished - Implemented payment gateway"
```

The hook will automatically:
1. Parse the commit message
2. Find the task ID (supports `#123`, `TASK-123`, `MON-456`, etc.)
3. Check for completion keywords
4. Update the Monday.com item to "Done"

### Manual Updates

You can also manually update tasks programmatically:

```typescript
import { TaskSync } from "hume";

const taskSync = new TaskSync({
    mondayApiToken: "your-token",
    boardId: "your-board-id",
    statusColumnId: "status",
});

// Mark a specific task as done
await taskSync.markTaskDone("1234567890");

// Sync from current git state
await taskSync.syncCurrentState();
```

### Using the Monday.com Client Directly

```typescript
import { MondayClient } from "hume";

const client = new MondayClient({
    apiToken: "your-api-token",
});

// Get an item
const item = await client.getItem("1234567890", "board-id");

// Update item status
await client.updateItemStatus({
    itemId: "1234567890",
    boardId: "board-id",
    statusColumnId: "status",
    status: "Done",
});

// Create a new item
await client.createItem({
    boardId: "board-id",
    itemName: "New Task",
});
```

## Supported Task ID Patterns

- `#123` - Simple hash format
- `TASK-123` - Task prefix
- `MON-456` - Monday prefix
- `ITEM-789` - Item prefix

## Completion Keywords

Default keywords that trigger status updates:
- done
- complete
- finished
- completed
- fixed
- resolved

You can customize these in `.monday-config.json`.

## Troubleshooting

### Hook Not Running

1. Check that the hook is installed: `ls -la .git/hooks/post-commit`
2. Ensure it's executable: `chmod +x .git/hooks/post-commit`
3. Check that `tsx` or `ts-node` is installed: `npm install -D tsx`

### API Errors

- Verify your API token is correct
- Check that board and column IDs are valid
- Ensure you have permission to update items in the board

### Task Not Updating

- Verify the task ID format matches your pattern
- Check that a completion keyword is present in the commit message
- Review the hook output for error messages

