const pool = require('../connection');
const bcrypt = require('bcrypt');

class Auth {
    static async login(req, res) {
                
    }

    static async signup(req ,res) {
        try {
            if( !!req.body.email && !!req.body.password){
                let sql = "INSERT INTO users SET ?";
                let hash = bcrypt.hashSync(req.body.password, 10);
                let user = {
                    email: 'email',
                    password: hash
                }

                pool.query(sql, user, (err, result) => {
                    if(err) return res.status(500).json(err);

                    
                });
            }
        } catch (error) {
            res.status(422).json({message: "Can't be processed", error});
        }
        res.status(422).json({message: "Can't be processed"});
    }
}

module.exports = Auth;