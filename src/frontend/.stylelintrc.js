module.exports = {
  "extends": [
    "stylelint-config-sass-guidelines", 
    "stylelint-config-idiomatic-order",
    "stylelint-config-prettier",
  ],
  "plugins": [
    "stylelint-order",
    "stylelint-prettier",
  ],
  "rules": {
    "order/properties-alphabetical-order": null,
    "prettier/prettier": [
      true, 
      {
        "endOfLine":"auto"
      }
    ],
  }
}
