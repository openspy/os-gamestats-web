const express = require('express')
const app = express()
const url = require('url');

var DbCtx = require('./lib/DbCtx');
var ctx = new DbCtx();
ctx.getDatabaseCtx().then(function(dbctx) {
    global.DATABASE_CONNECTION = dbctx.db('gamestats');
    global.LEADERBOARDS_COLLECTION = global.DATABASE_CONNECTION.collection('leaderboards');
    global.PLAYER_PROGRESS_COLLECTION = global.DATABASE_CONNECTION.collection('player_progress');
    
    //THPS PS2 series
    require('./API/requests/THPSLeaderboards')(app, "thug/", {gameid: 706, ratingsLimit: 20});
    require('./API/requests/THPSLeaderboards')(app, "thug2/", {gameid: 917, ratingsLimit: 20});
    require('./API/requests/THPSLeaderboards')(app, "thps7ps2/web/thaw_", {gameid: 1128, ratingsLimit: 20});

    //THPS PC series
    require('./API/requests/THPSLeaderboards')(app, "thugpc/", {gameid: 1005, ratingsLimit: 20});
    require('./API/requests/THPSLeaderboards')(app, "thug2pc/", {gameid: 1003, ratingsLimit: 20});
    require('./API/requests/THPSLeaderboards')(app, "thawpc/web/thaw_", {gameid: 1307, ratingsLimit: 20});
    
    app.use(function(req, res, next) {
        res.status(200).end();
    });
    app.listen(process.env.PORT || 3000, () => console.log('Server running on port: ', process.env.PORT || 3000))
    
})
