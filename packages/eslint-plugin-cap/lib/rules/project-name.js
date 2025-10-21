const path = require("path");

function isKebabMax4(name) {
  if (name.includes("_") || name.includes(".")) return false;
  const kebab = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!kebab.test(name)) return false;
  return name.split("-").length <= 4;
}

module.exports = {
  meta: {
    type: "problem",
    docs: { description: "Validate project name (package.json:name) and match folder; kebab-case, <=4 words." },
    schema: [],
    messages: {
      pkgMissing: "package.json must have a 'name' field.",
      notKebab: "Project name '{{name}}' must be kebab-case, lowercase, '-' only, and max 4 words.",
      folderMismatch: "Folder name '{{folder}}' must match package.json name '{{name}}'."
    }
  },
  create(context) {
    const filename = context.getFilename().replace(/\\/g, "/");
    if (!filename.endsWith("/package.json")) return {};

    return {
      "JSONProperty[key.value='name'] > JSONLiteral[value]"(node) {
        const name = node.value;
        if (!name) {
          context.report({ node, messageId: "pkgMissing" });
          return;
        }
        if (!isKebabMax4(name)) {
          context.report({ node, messageId: "notKebab", data: { name } });
          return;
        }
        const folder = path.basename(path.dirname(context.getFilename()));
        if (folder !== name) {
          context.report({ node, messageId: "folderMismatch", data: { folder, name } });
        }
      }
    };
  }
};
