module.exports = {
  "extends": "airbnb-base",
  "plugins": [
      "import"
  ],
  "rules": {
    "radix": [0],
    "arrow-body-style": [0],
    "no-else-return": [0],
    "consistent-return": [0],
    "no-restricted-syntax": [0],
    "no-shadow": [0]
  },
  "env": {
    "browser": true,
    "node": true,
    "mocha": true,
    "jquery": true
  },
  "globals": {
    "document": false,
    "describe": false,
    "it": false,
    "beforeEach": false,
    "should": false
  }
}
