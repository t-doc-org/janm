// Copyright 2024 Caroline Blank <caro@c-space.org>
// SPDX-License-Identifier: CC-BY-NC-SA-4.0

'use strict';
(() => {
    // Add a quizz question checking responses against the keys of "results".
    // Keys whose value is true are accepted. Keys with a string value display
    // that value as a hint. If a response is not found in "results", "def" is
    // used as the result.
    tdoc.question = async (prompt, results, def) => {
      const node = document.currentScript;
      const quizz = await tdoc.import('tdoc/quizz.js');
      return quizz.question(node, prompt, resp => {
        return results[resp.replaceAll(' ', '').toLowerCase()] ?? def;
      });
    };
})();