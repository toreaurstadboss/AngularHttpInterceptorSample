var express = require('express');
var fs = require('fs');
var datafile = 'server/data/townsandcities.json';
var router = express.Router();

/* GET all Norwegian cities and towns in a large json file to be cached and intercepted */
router.route('/')
    .get(function(req, res) {
        console.log('Inside api towns route');
        var data = getSampleData();
        res.send(data);
    });

    function getSampleData() {
        var data = fs.readFileSync(datafile, 'utf8');
        console.log('data: ' + data);
        debugger
        return JSON.parse(data);
    }

module.exports = router;
