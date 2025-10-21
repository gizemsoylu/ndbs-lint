module.exports = {
  meta: {
    type: "problem",
    docs: { description: "Disallow 'any' type in TypeScript code." },
    schema: [],
    messages: { noAny: "Usage of 'any' type is forbidden." }
  },
  create(context) {
    return {
      TSAnyKeyword(node) {
        context.report({ node, messageId: "noAny" });
      }
    };
  }
};
