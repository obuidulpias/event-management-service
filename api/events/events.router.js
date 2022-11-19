const router = require("express").Router();
const {
  createUser,
  getEventByEventId,
  getEvents,
} = require("./events.controller");
router.get("/", getEvents);
router.get("/:id", getEventByEventId);

router.post("/",  createUser);


module.exports = router;
