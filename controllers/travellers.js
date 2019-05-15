const pool = require('../connection');
const fetch = require('node-fetch');
const uniqid = require('uniqid');
const path = require('path');
const download = require('image-downloader');

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

    static async addFacebook(req, res) {
        // console.log(req.body);
        // let newImageName = uniqid()+'.jpg';
        // const options = {
        //     url: req.body.picture.data.url,
        //     dest: './images/'+newImageName
        // }
           
        // download.image(options)
        // .then(({ filename, image }) => {
        //     console.log('File saved to', filename)
            let fb = {
                id: req.body.id,
                user_id: req.params.id,
                name: req.body.name,
                // picture: 'https://taragame.appspot.com/'+newImageName,
                picture: req.body.picture.data.url
            };
            let sql = "INSERT INTO users_facebook SET ? ";
            pool.query(sql, fb, (err, results) =>{
                if(err) return res.json({message: 'existing'});
                res.json(results);
            });
        // })
        // .catch((err) => {
        //     throw err;
        // })
    }

    static async challengeDone(req, res){
        let sql = "SELECT * FROM travellers_challenges WHERE user_id = ? ";
        pool.query(sql , [req.params.id], (err, results) => {
            if(err) throw err;
            if(!!!results.length){
                sql = "INSERT INTO travellers_challenges SET user_id = ? ";
                pool.query(sql, [req.params.id], (err, results) => {
                    if(err) throw err;
                    res.json({message: 'joined'});
                })
            } else {
                res.json({message: 'already joined'});
            }
        });
    }

    static async leaderboard(req, res) {
        let sql = 
        `SELECT users_facebook.id, users_facebook.name, users_facebook.picture 
        FROM travellers_challenges LEFT JOIN users_facebook ON 
        users_facebook.user_id = travellers_challenges.user_id`;
        pool.query(sql, req.body, (err, results) =>{
            if(err) throw err;
            res.json(results);
        });
    }

}

module.exports = Travellers;