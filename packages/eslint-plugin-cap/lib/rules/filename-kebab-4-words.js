const path = require("path");

module.exports = {
  meta: {
    type: "problem",
    docs: { description: "Enforce kebab-case filenames with max N words (lowercase, '-' only)." },
    schema: [{ type: "object", properties: { maxWords: { type: "number", minimum: 1 } }, additionalProperties: false }],
    messages: {
      badChars: "Filename '{{stem}}' must not contain '_' or extra '.' (extension excluded).",
      notKebab: "Filename '{{stem}}' must be kebab-case (lowercase letters/digits with '-' separators).",
      tooManyWords: "Filename '{{stem}}' has {{count}} words (max {{max}})."
    }
  },
  create(context) {
    const maxWords = context.options?.[0]?.maxWords ?? 4;
    return {
      Program() {
        const file = context.getFilename();
        if (!file || file === "<text>") return;

        const base = path.basename(file);
        const ext = path.extname(base);
        const stem = base.slice(0, base.length - ext.length);

        if (stem.includes("_") || stem.includes(".")) {
          context.report({ loc: { line: 1, column: 0 }, messageId: "badChars", data: { stem } });
          return;
        }
        const kebab = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
        if (!kebab.test(stem)) {
          context.report({ loc: { line: 1, column: 0 }, messageId: "notKebab", data: { stem } });
          return;
        }
        const count = stem.split("-").length;
        if (count > maxWords) {
          context.report({ loc: { line: 1, column: 0 }, messageId: "tooManyWords", data: { stem, count, max: maxWords } });
        }
      }
    };
  }
};
