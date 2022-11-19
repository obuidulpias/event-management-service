const {
  create,
  getEventByEventId, 
  getEvents,
  getEventCount,
} = require("./events.service");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
  getEvents: (req, res) => {
    getEvents((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        //success: 1,
        events: results,
        pagination: results
      });
    });
  },
  getEventByEventId: (req, res) => {
    const id = req.params.id;
    let results = [];

    getEventByEventId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          message: "Record not Found"
        });
      }
      return res.json({
        //data: value.id,
        data: results
      });
    });

    getEventCount(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          message: "Record not Found"
        });
      }
      // return res.json({
      //   data: value.id,
      //   event_count: results
      // });
    });


    // return res.json({
    //   //data: value.id,
    //   event_count: results
    // });
  
  },
  
};
