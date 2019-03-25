const pool = require('../connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = "secret";

class Auth {
    static async login(req, res) {
        try {
            if (!!req.body.email && !!req.body.password) {
                let sql = "SELECT * FROM users WHERE email = ?";

                pool.query(sql, [req.body.email], (err, results) =>{
                    if(err) throw err;
                    let user = results[0];
                    if (!!user) {
                        let hash = bcrypt.hashSync(user.password, 10);
                        if(bcrypt.compareSync(req.body.password, user.password)){
                            delete user.password;
                            let token = {
                                user
                            };
                            pool.query('SELECT * FROM travellers WHERE id = ?', [user.id], (err, results) => {
                                if(err) throw err;
                                if(!!results[0]){
                                    token['traveller'] = results[0];
                                    token = jwt.sign(token,secretKey);
                                    return res.json({token});
                                }
                            });
                            pool.query('SELECT * FROM businesses WHERE id = ?', [user.id], (err, results) => {
                                if(err) throw err;
                                if(!!results[0]){
                                    token['business'] = results[0];
                                    token = jwt.sign(token,secretKey);
                                    return res.json({token});
                                }
                            });
                        } else {
                            return res.status(401).json({message: "Unauthorized"});
                        }
                    } else {
                        return res.status(401).json({message: "Unauthorized"});
                    }
                });
            } else {
                return res.status(401).json({message: "Unauthorized"});
            }
        } catch (error) {
            return res.status(401).json({message: "Unauthorized"});
        }  
    }

    static async signupTravellers(req ,res) {
        try {
            if( !!req.body.email && !!req.body.password && !!req.body.firstname  && !!req.body.lastname && !!req.body.bday){
                let sql1 = "INSERT INTO users SET ?";
                let sql2 = "INSERT INTO travellers SET ?";
                let hash = bcrypt.hashSync(req.body.password, 10);

                let user = {
                    email: req.body.email,
                    password: hash,
                    role: "USER"
                };
                
                pool.getConnection( (err, connection) =>{
                    if (err) throw err;
                    
                    connection.query(sql1, user, (err, results) => {
                        if (err) {
                            return connection.rollback(function() {
                                throw err;
                            });
                        }

                        let traveller = {
                            id: results.insertId,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            bday: req.body.bday
                        };

                        connection.query(sql2, traveller, (err, results) =>{
                            if (err){
                                return connection.rollback( function(){
                                    throw err;
                                });
                            }

                            connection.commit( (err)=>{
                                if(err){
                                    return connection.rollback(()=>{
                                        throw err;
                                    });
                                }
                                console.log('traveller created\n', traveller);
                                delete user.password;
                                user.id = traveller.id;
                                let token = jwt.sign({user, traveller}, secretKey);
                                return res.status(201).json({token});
                            });
                        });
                    });

                    connection.release();
                    if (err) throw err;
                });
            } else {
                return res.status(422).json({message: "Data can't be processed"});
            }
        } catch (error) {
            return res.status(422).json({message: "Can't be processed", error});
        }
    }

    static async signupBusinesses(req ,res) {
        try {
            if( !!req.body.email && !!req.body.password && !!req.body.name  && !!req.body.logo ){
                let sql1 = "INSERT INTO users SET ?";
                let sql2 = "INSERT INTO businesses SET ?";
                let hash = bcrypt.hashSync(req.body.password, 10);

                let user = {
                    email: req.body.email,
                    password: hash,
                    role: "USER"
                };
                
                pool.getConnection( (err, connection) =>{
                    if (err) throw err;
                    
                    connection.query(sql1, user, (err, results) => {
                        if (err) {
                            return connection.rollback(function() {
                                throw err;
                            });
                        }

                        let business = {
                            id: results.insertId,
                            logo: req.body.logo,
                            name: req.body.name,
                            lat: req.body.lat,
                            lng: req.body.lng
                        };

                        connection.query(sql2, business, (err, results) =>{
                            if (err){
                                return connection.rollback( function(){
                                    throw err;
                                });
                            }

                            connection.commit( (err)=>{
                                if(err){
                                    return connection.rollback(()=>{
                                        throw err;
                                    });
                                }
                                delete user.password;
                                user.id = business.id;
                                console.log('business created\n', business);
                                let token = jwt.sign({user, business}, secretKey);
                                return res.status(201).json({token});
                            });
                        });
                    });

                    connection.release();
                    if (err) throw err;
                });
            } else {
                return res.status(422).json({message: "Data can't be processed"});
            }
        } catch (error) {
            return res.status(422).json({message: "Can't be processed", error});
        }
    }

    static async verifyToken(req, res, next) {
        const bearerHeader = req.headers['authorization'];
        if(!!bearerHeader){
            if(bearerHeader.split(' ').length <= 1){
                //Checks if format Bearer 'token' is correct
                res.status(422).json({message: 'Invalid bearer fromat'});
            } else {
                const bearerToken = bearerHeader.split(' ')[1];
                jwt.verify(bearerToken,secretKey , (err,result) =>{
                    if(err){
                        res.status(403).json({message: err.message});
                    } else {
                        req.token = result;
                        next();
                    }
                });
            }
        } else {
            res.status(403).json({message: "Token missing from header"});
        }
    }

    static async isBusiness(req, res, next) {
        if (!!req.token.business) {
            next();
        } else
        res.status(401).json({message: "Unauthorized"});
    }
}

module.exports = Auth;