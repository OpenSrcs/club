module.exports = {
  extends: ['./node_modules/@opensrcs/club-rig/profiles/node/eslint.config.json'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json'
  }
}
