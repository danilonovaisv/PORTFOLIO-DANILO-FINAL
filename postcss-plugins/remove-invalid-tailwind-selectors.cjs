const invalidArbitraryBgClass = /^\.bg-\[(?:\.[^\]]+|[0-9A-Fa-f]{3,8})\]$/;

function removeInvalidTailwindSelectors() {
  return {
    postcssPlugin: 'remove-invalid-tailwind-selectors',
    Once(root) {
      root.walkRules((rule) => {
        const selectors = rule.selector.split(',');
        const filtered = selectors
          .map((selector) => selector.trim())
          .filter((selector) => !invalidArbitraryBgClass.test(selector));

        if (filtered.length === 0) {
          rule.remove();
          return;
        }

        if (filtered.length !== selectors.length) {
          rule.selector = filtered.join(', ');
        }
      });
    },
  };
}

module.exports = removeInvalidTailwindSelectors;
module.exports.postcss = true;
