const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "id",
    locales: ["id", "en"],
    localeDetection: false,
    localePath: path.resolve("./public/locales"),
  },
};
