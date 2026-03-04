/**
 * PostCSS plugin: remove-invalid-tailwind-selectors
 *
 * Removes CSS rules whose selectors contain CSS-escaped control characters
 * (U+0001–U+001F, U+007F). These are generated when Tailwind v4 encounters
 * arbitrary-value classes with malformed hex colors (e.g. 8-digit hex like
 * #ffffff1a) or opacity modifiers that produce invalid CSS escapes like
 * \4, \8, \1d, \!. LightningCSS then fails to parse these selectors.
 *
 * The plugin runs BEFORE @tailwindcss/postcss optimizes the output, stripping
 * any rule whose selector matches the control-character pattern.
 *
 * Ghost System v3.0 — Security: this only removes clearly invalid rules
 * and has zero impact on valid CSS classes.
 */

'use strict';

// CSS escape sequence for control chars: \HH  or \HHHH  (hex + space)
// Matches: \4 , \8 , \1d , \1a , etc. (1-4 hex digits followed by space)
const CONTROL_ESCAPE_RE = /\\[0-9a-fA-F]{1,4} /;

/** @type {import('postcss').PluginCreator} */
const plugin = () => ({
    postcssPlugin: 'remove-invalid-tailwind-selectors',
    Rule(rule) {
        if (CONTROL_ESCAPE_RE.test(rule.selector)) {
            rule.remove();
        }
    },
});

plugin.postcss = true;
module.exports = plugin;
