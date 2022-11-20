const router = require("express").Router();
const {
  createUser,
  getEventByEventId,
  getEvents,
  getAllWSByEventId,
  getSingleWSInfo
} = require("./events.controller");
//api 1
router.get("/", getEvents);
//api 2
router.get("/:id", getEventByEventId);
//api 3
router.get("/allWSBySV/:id", getAllWSByEventId);
//api 4 
router.get("/wsDetails/:id", getSingleWSInfo);

router.post("/",  createUser);


module.exports = router;
