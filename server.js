var express = require('express');
var serveStatic = require('serve-static');
const bodyparser = require('body-parser')
const _ = require('lodash')
const cors = require('cors')
const app = express();
var storage = []
var idcounter = 0
app.use(serveStatic(__dirname + "/dist"));
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(cors())
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
app.get('/topic/upvote/:id', (req, res) => {
    // check item index has in storage
    const index = storage.map(e => {return e.id;}).indexOf(parseInt(req.params.id))
    if(index >= 0 && storage[index]) {
        // counter upvote
        storage[index].upvote++
        return res.json({success: true,result: storage[index]})
    }
    res.json({success: false, result: null})
})
app.get('/topic/downvote/:id', (req, res) => {
    // check item index has in storage
    const index = storage.map(e => {return e.id}).indexOf(parseInt(req.params.id))
    if(index >= 0 && storage[index]) {
        // counter downvote
        storage[index].downvote++
        return res.json({success: true,result: storage[index]})
    }
    res.json({success: false, result: null})
})
// when dobouncer is called on frond-end
app.get('/topic/sorting', (req,res) =>{
    storage = _.orderBy(storage, ['upvote'], ['desc'])
    const result = storage.slice(0, 20)
    res.json({success: true, result: result})
})
app.get('/get-list/topic', (req, res) => {
    const result = storage.slice(0, 20)
    res.json({success: true, result: result})
})
const port = process.env.PORT || 5000;
app.listen(port);

// eslint-disable-next-line
console.log('application serve on port' + port)