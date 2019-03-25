const pool = require('../connection');

class LookBadge{
    static async create(req, res){
        let sql = "INSERT INTO look_badges SET ?";
        pool.query(sql, req.body, (err, results)=>{
            if(err) throw err;
            res.status(201).json("create success");
        }); 
    }

    static async get(req, res) {
        let sql = "SELECT * FROM look_badges";
        pool.query(sql, req.body, (err, results) =>{
            if(err) throw err;
            res.json(results);
        });
    }
}

module.exports = LookBadge;