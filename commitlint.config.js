/* eslint-disable import/no-anonymous-default-export */
export default {
  extends: ["@commitlint/config-conventional"],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(:\w+:)\s(\w+)(?:\(([\w\$\.\*/-]+)\))?:\s(.+)$/,
      headerCorrespondence: ["emoji", "type", "scope", "subject"],
    },
  },
};
