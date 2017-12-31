const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public/'));

app.get('/', function(req, resp){
    resp.sendFile('index.html');
    resp.status(200);
})

app.listen(5000, function(){
    console.log('listening on port 5000');
})