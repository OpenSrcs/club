module.exports = {
  extends: ['./node_modules/@opensrcs/club-rig/profiles/ui/eslint.config.json'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json'
  }
}
