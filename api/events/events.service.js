const pool = require("../../config/databse");

module.exports = {


  create: (data, callBack) => {
    pool.query(
      `insert into test(name,email) 
                values(?,?)`,
      [
        data.name,
        data.email
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

   //for api 1
   getEvents: callBack => {
    pool.query(
      `select id,title,start_at,end_at from events where status_active=1`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getAllEventsCount: callBack => {
    pool.query(
      `select count(id) as total from events where status_active=1`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  //for api 2
  getEventByEventId: (id, callBack) => {
    pool.query(
      `select id,	title,start_at,end_at from events where status_active=1 and id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);       
      }
    );
    // pool.query(
    //   `select count(event_id) from workshops where and event_id = ?`,
    //   [id],
    //   (error, results, fields) => {
    //     if (error) {
    //       callBack(error);
    //     }
    //     return callBack(null, results);       
    //   }
    // );
  },

  getWPCountByEventID: (id, callBack) => {

    pool.query(
      `select count(event_id) as event_count from workshops where event_id = ?`,
      [id],
      (error, results1, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results1);       
      }
    );
  },

 
};
