module.exports = {
  name: "flights",
  preset: "../../jest.config.js",
  coverageDirectory: "../../coverage/apps/flights/",
  snapshotSerializers: [
    "jest-preset-angular/AngularSnapshotSerializer.js",
    "jest-preset-angular/HTMLCommentSerializer.js"
  ]
};
