import { parseUserId } from "api/user";

describe("parseUserId", () => {
  it("does not throw errors", () => {
    expect(parseUserId("invalid JWT")).toBeUndefined();
  });
});
