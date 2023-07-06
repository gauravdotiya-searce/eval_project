const request = require("supertest");
const app = require("./app");

describe("User Api", () => {
  test("GET /api/users/all", (done) => {
    request(app)
      .get("/api/users/all")
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
  test("POST /api/users/login", (done) => {
    request(app)
      .post("/api/users/login")
      .send({ username: "gaurav_dotiya", password: "" })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
  test("POST /api/users/login", (done) => {
    request(app)
      .post("/api/users/login")
      .send({ username: "gaurav_dotiya", password: "wrong_password" })
      .expect(500)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
});
describe("Notes Api", () => {
  test("GET /api/notes/all", (done) => {
    request(app)
      .get("/api/notes/all")
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
});
