const {
  create,
  getEventByEventId, 
  getEvents,
  getWPCountByEventID,
  getAllEventsCount,
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

  //for api 1
  getEvents: (req, res) => {
    getEvents((err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      getAllEventsCount((err, results1) => {
        if (err) {
          console.log(err);
          return;
        }
        let total_pages;
        if(results1[0].total<10){
          total_pages=1;
        }else{
          total_pages=results1[0].total;
        }
        Math.round(results1[0].total/10);
        let pagination_arr ={total: results1[0].total, per_page: 10, total_pages: total_pages, current_page: 1};
        return res.json({
          //success: 1,
          events: results,
          pagination: pagination_arr
        });
      });
      
      // return res.json({
      //   //success: 1,
      //   events: results,
      //   pagination: results
      //});
    });
  },

  //for api 2
  getEventByEventId: (req, res) => {
    const id = req.params.id;
    let mainArr = [];

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
      getWPCountByEventID(id, (err, results1) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results1) {
          return res.json({
            message: "Record not Found"
          });
        }
        //mainArr = results.concat(results1);
        //let event_count_new = results1[0].event_count;
        //let new_arr = results.push(event_count_new);
        //let one = results[0].title;
        //console.log(mainArr[event_count]);
        let new_arr = {id: results[0].id, title: results[0].title, start_at: results[0].start_at, end_at: results[0].end_at, total_workshops: results1[0].event_count};

        return res.json({
          //data: value.id,
          data:  new_arr,
          //event_count: results1
        });
      });

     
    });
  
  },
  
};
