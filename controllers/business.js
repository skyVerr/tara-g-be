const pool = require('../connection');
const fetch = require('node-fetch');
var formidable = require('formidable');
const { URLSearchParams } = require('url');
const FormData = require('form-data');
const fs = require('fs');

class LookBadge{
    static async get(req, res) {
        let sql = "SELECT * FROM businesses";
        pool.query(sql, req.body, (err, results) =>{
            if(err) throw err;
            res.json(results);
        });
    }

    static async addChallenge(req, res){

        var form = new formidable.IncomingForm();

        form.parse(req, (err,fields,files)=>{
            req.body = fields;
        });

        form.on('file', async function (name, file){

            delete req.body.image;
            const form = new FormData();
            // form.append('image', file.pa, file.name);
            // form.append('image', file.)
      
            let raw = await fetch('http://ver.gordoncollegeccs-ssite.net/upload/upload.php', { method: 'POST', body: form })
            let json = await raw.json();
            req.body.badges_path = json.path;
            let sql = "INSERT INTO business_challenges SET ?";
            pool.query(sql, req.body, (err, results) =>{
                if(err) throw err;
                res.json(results);
            });
          
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