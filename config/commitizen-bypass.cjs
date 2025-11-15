/* eslint-disable @typescript-eslint/no-require-imports */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const flagPath = path.resolve(".git/commitizen-flag");

// Helper function to safely execute git commands
function safeGitCommand(command, options = {}) {
  try {
    return execSync(command, { encoding: "utf-8", ...options }).trim();
  } catch {
    return "";
  }
}

// Check if a file is tracked by git
function isFileTracked(filePath) {
  try {
    execSync(`git ls-files --error-unmatch "${filePath}"`, {
      encoding: "utf-8",
      stdio: "pipe"
    });
    return true;
  } catch {
    return false;
  }
}

// Check for unstaged and untracked files before starting
function checkWorkingDirectory() {
  const unstagedFiles = safeGitCommand("git diff --name-only");
  const untrackedFiles = safeGitCommand("git ls-files --others --exclude-standard");

  return {
    hasUnstaged: !!unstagedFiles,
    hasUntracked: !!untrackedFiles,
    unstagedList: unstagedFiles ? unstagedFiles.split("\n") : [],
    untrackedList: untrackedFiles ? untrackedFiles.split("\n") : []
  };
}

// Create flag to indicate commit via Commitizen
fs.writeFileSync(flagPath, "commitizen");

// Store initial state
const initialState = checkWorkingDirectory();

try {
  execSync("npx cz", { stdio: "inherit" });
} catch (error) {
  // Check current state after cancellation
  const currentState = checkWorkingDirectory();

  // If user cancelled (Ctrl+C), exit gracefully
  if (error.signal === "SIGINT" || error.status === 130) {
    console.log("\n🔵 Commit cancelled by user.");

    // Check for staged changes
    const stagedFiles = safeGitCommand("git diff --cached --name-only");
    if (stagedFiles) {
      console.log("⚠️  Warning: You have staged changes that were modified by lint-staged.");
      console.log("💡 These changes are still staged and safe. Review with: git status");
    }

    // Check if any unstaged files were lost
    const lostUnstaged = initialState.unstagedList.filter(file => {
      if (!file) return false;
      const stillExists = fs.existsSync(file);
      const stillUnstaged = currentState.unstagedList.includes(file);
      const isTracked = isFileTracked(file);
      // File is lost if it doesn't exist, isn't unstaged anymore, and wasn't tracked
      return !stillExists && !stillUnstaged && !isTracked;
    });

    if (lostUnstaged.length > 0) {
      console.log("\n⚠️  WARNING: Some unstaged files may have been affected:");
      lostUnstaged.forEach(file => console.log(`   - ${file}`));
      console.log("💡 Check your working directory with: git status");
      console.log("💡 If files are missing, check: git fsck --lost-found");
    }

    // Check if untracked files were lost
    const lostUntracked = initialState.untrackedList.filter(
      file => !currentState.untrackedList.includes(file) && !fs.existsSync(file)
    );

    if (lostUntracked.length > 0) {
      console.log("\n⚠️  WARNING: Some untracked files may have been deleted:");
      lostUntracked.forEach(file => console.log(`   - ${file}`));
      console.log("💡 These files cannot be recovered. Please check your backup or re-create them.");
    }

    process.exit(0);
  }

  // If it was another type of error, show the message
  console.error("🚫 Commit cancelled");

  // Check for staged changes
  const stagedFiles = safeGitCommand("git diff --cached --name-only");
  if (stagedFiles) {
    console.log("⚠️  Warning: You have staged changes that may have been modified.");
    console.log("💡 Review your changes with: git status");
  }

  // Check for lost files
  const lostUnstaged = initialState.unstagedList.filter(file => {
    if (!file) return false;
    const stillExists = fs.existsSync(file);
    const stillUnstaged = currentState.unstagedList.includes(file);
    const isTracked = isFileTracked(file);
    // File is lost if it doesn't exist, isn't unstaged anymore, and wasn't tracked
    return !stillExists && !stillUnstaged && !isTracked;
  });

  if (lostUnstaged.length > 0) {
    console.log("\n⚠️  WARNING: Some unstaged files may have been affected:");
    lostUnstaged.forEach(file => console.log(`   - ${file}`));
    console.log("💡 Check your working directory with: git status");
  }

  process.exit(1);
} finally {
  // Always remove the flag, even if there was an error
  if (fs.existsSync(flagPath)) {
    fs.unlinkSync(flagPath);
  }
}
