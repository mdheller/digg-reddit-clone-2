var express = require('express');
var serveStatic = require('serve-static');
const bodyparser = require('body-parser')
const app = express();
const storage = []
app.use(serveStatic(__dirname + "/dist"));
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.post('/create/topic', (req, res) => {
    const body = req.body
    if(body && typeof body.title !== 'undefined' && typeof body.content !== 'undefined') {
        const result = Object.assign({ upvote: 0, downvote: 0 }, body)
        storage.push(result)   
        return res.json({success: true, result: result})
    }
    res.json({success: false, result: null})
})
app.get('/topic/upvote/:index', (req, res) => {
    // check item index has in storage
    if(storage[req.params.index]) {
        // counter upvote
        storage[req.params.index].upvote++
        return res.json({success: true,result: storage[req.params.index]})
    }
    res.json({success: false, result: null})
})
app.get('/topic/downvote/:index', (req, res) => {
    
    if(storage[req.params.index]) {
        // counter downvote
        storage[req.params.index].downvote++
        return res.json({success: true,result: storage[req.params.index]})
    }
    res.json({success: false, result: null})
})
var port = process.env.PORT || 5000;
app.listen(port);