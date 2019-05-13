const pool = require('../connection');

class Travellers{
    static async get(req, res) {
        let sql = 
        `SELECT users.id, users.email, travellers.firstname, travellers.lastname 
        FROM travellers 
        LEFT JOIN users ON travellers.id = users.id`;
        pool.query(sql, req.body, (err, results) =>{
            if(err) throw err;
            res.json(results);
        });
    }
}

module.exports = Travellers;