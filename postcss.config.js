module.exports = {
  plugins: [
    // Auto prefixer adds crossbrowser styles automatically
    require("autoprefixer")({
      browsers: ["> 1%", "last 2 versions"]
    })
  ]
};
