const pool = require("../config/databse");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into test(name, email) values(?,?)`,
            [
                data.name,
                data.email
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results)
            }
        );
    }
};