#!/usr/bin/env node
/**
 * Install Monday.com git hook
 * 
 * This script installs the post-commit hook that automatically
 * syncs completed tasks to Monday.com
 */

const fs = require("fs");
const path = require("path");

const hookSource = path.join(__dirname, "../src/wrapper/monday/git-hook.ts");
const hookTarget = path.join(process.cwd(), ".git/hooks/post-commit");

// Check if .git directory exists
const gitDir = path.join(process.cwd(), ".git");
if (!fs.existsSync(gitDir)) {
    console.error("❌ Error: .git directory not found. Are you in a git repository?");
    process.exit(1);
}

// Check if hooks directory exists, create if not
const hooksDir = path.join(gitDir, "hooks");
if (!fs.existsSync(hooksDir)) {
    fs.mkdirSync(hooksDir, { recursive: true });
}

// Read the hook source
if (!fs.existsSync(hookSource)) {
    console.error(`❌ Error: Hook source not found at ${hookSource}`);
    process.exit(1);
}

// Create a Node.js version of the hook (since git hooks need to be executable)
const hookContent = `#!/usr/bin/env node
// Auto-generated Monday.com git hook
// Run: npx tsx src/wrapper/monday/git-hook.ts

const { execSync } = require("child_process");
const path = require("path");

try {
    // Try to run the TypeScript hook using tsx or ts-node
    const hookPath = path.join(__dirname, "../../src/wrapper/monday/git-hook.ts");
    execSync(\`npx tsx \${hookPath}\`, { stdio: "inherit", cwd: process.cwd() });
} catch (error) {
    // If tsx is not available, try ts-node
    try {
        execSync(\`npx ts-node \${hookPath}\`, { stdio: "inherit", cwd: process.cwd() });
    } catch (e) {
        // Silently fail if neither is available
        console.log("⚠️  Monday.com hook: tsx or ts-node required. Install with: npm install -D tsx");
    }
}
`;

// Write the hook
fs.writeFileSync(hookTarget, hookContent);
fs.chmodSync(hookTarget, "755");

console.log("✅ Monday.com git hook installed successfully!");
console.log(`   Hook location: ${hookTarget}`);
console.log("\n📝 Next steps:");
console.log("   1. Create .monday-config.json (see .monday-config.example.json)");
console.log("   2. Or set MONDAY_API_TOKEN, MONDAY_BOARD_ID, and MONDAY_STATUS_COLUMN_ID environment variables");
console.log("   3. Make commits with task IDs in the message (e.g., 'fix: #123 done')");

