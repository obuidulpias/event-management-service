const pool = require("../../config/databse");

module.exports = {


  create: (data, callBack) => {
    pool.query(
      `select id,name,email from reservations where  name=?`,
      [data.name],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  createReservationInfo: (data, callBack) => {
    pool.query(
      `select w.id,w.title,w.description,w.start_at,w.end_at from reservations as r,workshops as w  where w.id=r.workshop_id and r.name=?`,
      [data.name],
      (error, resv, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, resv);
      }
    );
  },
  createResEventInfo: (data, callBack) => {
    pool.query(
      `select e.id,e.title,e.start_at,e.end_at from reservations as r,workshops as w, events as e  where w.id=r.workshop_id and e.id=w.event_id and r.name=?`,
      [data.name],
      (error, event, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, event);
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

  //for api 3
  getAllWSByEventId: (id, callBack) => {
    pool.query(
      `select id,title,start_at,end_at from events where status_active=1 and id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);       
      }
    );
  },
  getWSByEventId: (id, callBack) => {
    pool.query(
      `select id,	title,description,start_at,end_at from workshops where status_active=1 and event_id = ?`,
      [id],
      (error, results1, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results1);       
      }
    );
  },

  //for api 4 
  getSingleWSInfo: (id, callBack) => {
    pool.query(
      `select id,	title,description,start_at,end_at from workshops where status_active=1 and id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);       
      }
    );
  },
  getAllWSById: (id, callBack) => {
    pool.query(
      `select count(workshop_id) as total_reservations from reservations where workshop_id = ?`,
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
