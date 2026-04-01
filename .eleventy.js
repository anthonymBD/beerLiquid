const path = require("path");

module.exports = async function (eleventyConfig) {
  const EleventyVitePlugin = (await import("@11ty/eleventy-plugin-vite")).default;

  eleventyConfig.addPlugin(EleventyVitePlugin, {
    serverOptions: {
      domDiff: false,
    },
    viteOptions: {
      resolve: {
        alias: {
          "/node_modules": path.resolve(__dirname, "node_modules"),
        },
      },
    },
  });

  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/sass");
  eleventyConfig.addPassthroughCopy("src/images");

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
