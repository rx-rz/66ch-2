const assert = require("assert");
const firebase = require("@firebase/testing");

const MY_PROJECT_ID = "66ch-d6665"
describe("66ch", () => {
  it("Understands basic math", () => {
    assert.equal(2 + 2, 42);
  });

  it("Can read items in the read-only collection", async () => {
    const db = firebase.initializeTestApp({projectId: MY_PROJECT_ID}).firestore()
    const testDoc = db.collection("readonly").doc("testDoc")
    await firebase.assertSucceeds(testDoc.get())
  })
});
