module.exports = {
  presets: ["@vue/app"],
  plugins: [
    '@babel/plugin-transform-runtime',
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
    ]
  ]
};
