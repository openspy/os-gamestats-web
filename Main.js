const express = require('express')
const app = express()
const url = require('url');

var DbCtx = require('./lib/DbCtx');
var ctx = new DbCtx();
ctx.getDatabaseCtx().then(function(dbctx) {
    global.DATABASE_CONNECTION = dbctx.db('gamestats');
    global.LEADERBOARDS_COLLECTION = global.DATABASE_CONNECTION.collection('leaderboards');
    
    var THPS5PS2RequestHandler = require('./API/requests/THPSLeaderboards')(app, "thug", {gameid: 706});
    
    
    app.listen(process.env.PORT || 3000, () => console.log('Server running on port: ', process.env.PORT || 3000))
    
})
