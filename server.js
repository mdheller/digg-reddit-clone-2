var express = require('express');
var serveStatic = require('serve-static');
const app = express();
app.use(serveStatic(__dirname + "/dist"));
app.post('/create/topic', (req, res) => {
    console.log(req.body)
    res.json({success: true})
})
var port = process.env.PORT || 5000;
app.listen(port);