const pool = require('../connection');

class LookBadge{
    static async get(req, res) {
        let sql = "SELECT * FROM businesses";
        pool.query(sql, req.body, (err, results) =>{
            if(err) throw err;
            res.json(results);
        });
    }

    static async addChallenge(req, res){
        let sql = "INSERT INTO business_challenges SET ?";
        pool.query(sql, req.body, (err, results) =>{
            if(err) throw err;
            res.json(results);
        });
    }

    static async getChallenges(req, res){
        let sql = "SELECT * FROM business_challenges";
        pool.query(sql, req.body, (err, results) =>{
            if(err) throw err;
            res.json(results);
        });
    }
}

module.exports = LookBadge;