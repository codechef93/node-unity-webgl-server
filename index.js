
var express = require('express');
var mysql = require('mysql');
var path = require('path');
var cookieParser = require('cookie-parser');
var app = express();

app.use(express.static('public'));
app.get('/index.html', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
 })
/*var con = mysql.createConnection({
    host: "167.172.164.13",
    user: "dev-games",
    password: "+SH9Vc}2q(L2$,w<",
    database: "piggytoken"
});*/
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "piggytoken"
});

con.connect(function(err) {
    if (err) {
        con = null;
        console.log("MySQL Connection Failed");
    }
    else console.log("MySQL Connected");
});

app.post('/savegamescore', function (req, res) {

    var query = req.query;

    console.log(query);

    var gameid = query.gameid;
    var score = query.score;
    var email = query.email;
    var id = 0;

    if (email === undefined || email === null || email === '') {
        res.send('fail');
        return ;
    }

    if (con !== null) {
        var sql = "INSERT INTO game_rank (id, email, score, gameid, date) VALUES (" + id + ", '" + email + "', " + score + ", " + gameid + ", Now())";
        con.query(sql, function (err, result) {
            if (!err)
                console.log("1 record inserted");
        });
    }

    res.send('success');
 })

 var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Server running at port:%s", port)
})