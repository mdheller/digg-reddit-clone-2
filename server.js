var express = require('express');
var serveStatic = require('serve-static');
const bodyparser = require('body-parser')
const _ = require('lodash')
const app = express();
var storage = []
var idcounter = 0
app.use(serveStatic(__dirname + "/dist"));
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.post('/create/topic', (req, res) => {
    const body = req.body
    if(body && typeof body.title !== 'undefined' && typeof body.content !== 'undefined') {
        idcounter++
        const result = Object.assign({ upvote: 0, downvote: 0, id: idcounter}, body)
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
    // check item index has in storage
    if(storage[req.params.index]) {
        // counter downvote
        storage[req.params.index].downvote++
        return res.json({success: true,result: storage[req.params.index]})
    }
    res.json({success: false, result: null})
})
// when dobouncer is called on frond-end
app.get('/topic/sorting', (req,res) =>{
    storage = _.orderBy(storage, ['upvote'], ['desc'])
    res.json({success: true})
})
app.get('/get-list/topic', (req, res) => {
    const result = storage.slice(0, 20)
    res.json({success: true, result: result})
})
var port = process.env.PORT || 5000;
app.listen(port);