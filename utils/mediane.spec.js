import assert from "assert";
import { getMediane } from "./mediane.js";

describe("Mediane", function () {
  const precision = 0.00001;
  it("GET mediane: Case length impair", function () {
    const expected = 1;
    assert.equal(
      Math.abs(getMediane([5, 6, 3, 1, 9, 8, 7]) - expected) < precision,
      true
    );
  });
  it("GET mediane: Case length pair", function () {
    const expected = 5.5;
    assert.equal(
      Math.abs(getMediane([5, 6, 3, 8, 9, 7]) - expected) < precision,
      true
    );
  });
});
