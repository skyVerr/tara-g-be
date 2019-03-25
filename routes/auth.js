const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const uniqid = require('uniqid');
const path = require('path');

const Auth = require('../controllers/auth.controller');

router.post('/login', Auth.login);
router.post('/signup/travellers', Auth.signupTravellers);
router.post('/signup/businesses', uploadPhoto, Auth.signupBusinesses);

function uploadPhoto(req,res,next){
    var form = new formidable.IncomingForm();
    var profilePath;

    form.parse(req, (err,fields,files)=>{
        req.body = fields;
    });

    form.on('fileBegin', function (name, file){

        let newImageName = uniqid()+'.'+ file.name.split('.').pop();
        let reqPath = path.join(__dirname, '../images/');
        file.path = reqPath+newImageName;
        profilePath = 'http://localhost:8080/images/' + newImageName;
    });

    form.on('file', function (name, file){
        req.body.profile_picture = profilePath;
        console.log('Uploaded ' + file.name);
    });

    form.on('end', () => {
        req.body.logo = profilePath;
        next();
    });

}

module.exports = router;