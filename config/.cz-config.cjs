module.exports = {
  types: [
    { value: "🎉 init", name: "🎉 init:        Initial commit" },
    { value: "✨ feat", name: "✨ feat:        New feature" },
    { value: "🐛 fix", name: "🐛 fix:         Bug fix" },
    { value: "📚 docs", name: "📚 docs:        Documentation" },
    { value: "💄 style", name: "💄 style:       Styling" },
    { value: "♻️ refactor", name: "♻️  refactor:    Refactoring" },
    { value: "⚡ perf", name: "⚡ perf:        Performance" },
    { value: "🧪 test", name: "🧪 test:        Tests" },
    { value: "🔧 chore", name: "🔧 chore:       Configuration" },
    { value: "🧱 ci", name: "🧱 ci:          CI/CD config" },
    { value: "📦 build", name: "📦 build:       Build system" },
    { value: "🗃️ raw", name: "🗃️  raw:        Raw data" },
    { value: "🧹 cleanup", name: "🧹 cleanup:     Code cleanup" },
    { value: "🗑️ remove", name: "🗑️  remove:      Removing files" },
    { value: "🚚 move", name: "🚚 move:        Move/Rename" },
    { value: "🔒 security", name: "🔒 security:    Security" },
    { value: "♿ accessibility", name: "♿ accessibility: Accessibility" },
    { value: "📱 responsive", name: "📱 responsive:  Responsiveness" },
    { value: "🔍 seo", name: "🔍 seo:         SEO" },
    { value: "🔖 release", name: "🔖 release:     Release version" },
    { value: "🚀 deploy", name: "🚀 deploy:      Deployment" },
    { value: "🚧 wip", name: "🚧 wip:         Work in progress" },
    { value: "💥 breaking", name: "💥 breaking:    Breaking change" },
    { value: "🏷️ types", name: "🏷️  types:       Types and interfaces" },
    { value: "🥅 error", name: "🥅 error:       Error handling" },
    { value: "💫 animation", name: "💫 animation:   Animations" },
    { value: "💡 comments", name: "💡 comments:    Comments" },
    { value: "📝 text", name: "📝 text:        Text content" },
    { value: "🔜 ideas", name: "🔜 ideas:       Ideas / tasks" },
  ],

  scopes: [
    { name: "api" },
    { name: "auth" },
    { name: "backend" },
    { name: "config" },
    { name: "database" },
    { name: "deps" },
    { name: "docs" },
    { name: "frontend" },
    { name: "hooks" },
    { name: "lint" },
    { name: "organization" },
    { name: "performance" },
    { name: "security" },
    { name: "tests" },
    { name: "ui" },
    { name: "validation" },
    { name: "formatting" },
    { name: "model" },
    { name: "entity" },
    { name: "service" },
    { name: "utils" },
  ],

  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"],

  messages: {
    type: "Select the type of commit:",
    scope: "Select a scope (or leave blank):",
    customScope: "Enter a custom scope:",
    subject: "Short description:",

    // ⭐ NEW QUESTION
    body: "Describe something (optional):",

    breaking: "Describe breaking changes (optional):",

    // ⭐ PR / Issue automation
    footer: "Add Issue reference: (e.g. Fixes #123 or Closes #19)",

    confirmCommit: "Confirm this commit?",
  },

  skipQuestions: ["breaking"],

  subjectLimit: 120,
  breaklineChar: "|",

  format: ({ type, scope, subject, body, footer }) => {
    const scopeStr = scope ? `(${scope})` : "";
    const bodyStr = body ? `\n\n${body}` : "";
    const footerStr = footer ? `\n\n${footer}` : "";
    return `${type}${scopeStr}: ${subject}${bodyStr}${footerStr}`;
  },
};
