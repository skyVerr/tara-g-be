const pool = require('../connection');

class LookBadge{
    static async get(req, res) {
        let sql = "SELECT * FROM businesses";
        pool.query(sql, req.body, (err, results) =>{
            if(err) throw err;
            res.json(results);
        });
    }
}

module.exports = LookBadge;