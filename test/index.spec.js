import assert from "assert";
import request from "request";

const url = "http://localhost:3000";

describe("TENNIS API", function () {
  describe("GET players", function () {
    it("GET: should get all tennis players sorted by rank", function () {
      request(`${url}/players`, function (error, response, body) {
        const players = JSON.parse(body);
        assert.equal(response.statusCode, 200);
        assert.equal(players[0].id, 17);
        assert.equal(players[1].id, 52);
        assert.equal(players[2].id, 102);
      });
    });
  });

  describe("GET player by ID", function () {
    it("GET: should get a player", function () {
      const existedPlayerID = 102;
      request(
        `${url}/player/${existedPlayerID}`,
        function (error, response, body) {
          const player = JSON.parse(body);
          assert.equal(response.statusCode, 200);
          assert.equal(player.id, existedPlayerID);
        }
      );
    });
    it("GET: should return player not found", function () {
      const fakePlayerID = 100;
      request(
        `${url}/player/${fakePlayerID}`,
        function (error, response, body) {
          assert.equal(response.statusCode, 404);
          assert.strictEqual(body, "Player not found");
        }
      );
    });
  });

  describe("GET stats", function () {
    it("GET: should return player not found", function () {
      request(`${url}/stats`, function (error, response, body) {
        const stats = JSON.parse(body);
        console.log("stats", stats);
        assert.equal(response.statusCode, 200);
      });
    });
  });
});
