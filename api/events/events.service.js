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

  getEventCount: (id, callBack) => {

    pool.query(
      `select count(event_id) as event_count from workshops where event_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);       
      }
    );
  },

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
};
