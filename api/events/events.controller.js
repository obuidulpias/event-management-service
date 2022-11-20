const {
  create,
  createReservationInfo,
  createResEventInfo,
  getEventByEventId, 
  getEvents,
  getWPCountByEventID,
  getAllWSByEventId,
  getWSByEventId,
  getSingleWSInfo,
  getAllWSById
} = require("./events.service");

module.exports = {

  //for api 5
  createUser: (req, res) => {
    const body = req.body;
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Database connection errror"
        });
      }
      createResEventInfo(body, (err, event) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Database connection errror"
          });
        }
        createReservationInfo(body, (err, resv) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              message: "Database connection errror"
            });
          }
          return res.status(200).json({
            reservation: results,
            event: event,
            workshop: resv
          });
          
        });
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
      let length = results.length;
      let total_pages;
        if(length<10){
          total_pages=1;
        }else{
          total_pages=Math.round(length/10);
        }
        let pagination_arr ={total: length, per_page: 10, total_pages: total_pages, current_page: 1};
       
        return res.json({
          //success: 1,
          events: results,
          pagination: pagination_arr
        });

      // getAllEventsCount((err, results1) => {
      //   if (err) {
      //     console.log(err);
      //     return;
      //   }
      //   let total_pages;
      //   if(results1[0].total<10){
      //     total_pages=1;
      //   }else{
      //     total_pages=Math.round(results1[0].total/10);
      //   }
      //   let pagination_arr ={total: results1[0].total, per_page: 10, total_pages: total_pages, current_page: 1};
      //   let length = results.length;
      //   return res.json({
      //     //success: 1,
      //     events: length,
      //     pagination: pagination_arr
      //   });
      // });
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
  //for api 3
  getAllWSByEventId: (req, res) => {
    const id = req.params.id;

    getAllWSByEventId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          message: "Record not Found"
        });
      }
      getWSByEventId(id, (err, results1) => {
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
        let new_arr = {id: results[0].id, title: results[0].title, start_at: results[0].start_at, end_at: results[0].end_at, workshops: [{
          id: results1[0].id,title: results1[0].title,description: results1[0].description,start_at: results1[0].start_at,end_at: results1[0].end_at
        }]};

        return res.json({
          //data: value.id,
          data:  new_arr,
          //event_count: results1
        });
      });
      

     
    });
  
  },

  //for api 4
  getSingleWSInfo: (req, res) => {
    const id = req.params.id;
    let mainArr = [];

    getSingleWSInfo(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          message: "Record not Found"
        });
      }
      getAllWSById(id, (err, results1) => {
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
        let new_arr = {id: results[0].id, title: results[0].title, description: results[0].description, start_at: results[0].start_at, end_at: results[0].end_at, total_workshops: results1[0].total_reservations};

        return res.json({
          //data: value.id,
          data:  new_arr,
          //event_count: results1
        });
      });

     
    });
  
  },
  
};
