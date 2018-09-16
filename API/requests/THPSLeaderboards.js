module.exports = function(app, prefix, options) {
    var dumpLevelStats = function(entry_name, write_date, req, res, next) {
        global.LEADERBOARDS_COLLECTION.findOne({gameid: options.gameid}, function(err, dbResult) {
            if(!dbResult) return res.end();
            
            
            if(write_date) {
                var date = new Date(dbResult.modified);
                res.write(date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear()+"\n");
            }
            
            var keys = Object.keys(dbResult[entry_name]);
            for(var i of keys) {
                res.write('Level:'+i+'\n');
                var players = dbResult[entry_name][i];
                for(var p of players) {
                    var line = p.score + ":" + p.rating + ":" + p.nick + "\n";
                    res.write(line);
                }
            }
            res.end();
        });
    };

    var dumpTopRatings = function(req, res, next) {
        global.PLAYER_PROGRESS_COLLECTION.aggregate([{$match: {gameid: options.gameid}}, {$sort: {"data.rating": -1}}, {$limit: options.ratingsLimit}], function(err,cursor) {
            cursor.on('data', function(data) {
                var line = data.data.highscore + ":" + data.data.rating + ":" + data.last_name + "\n";
                res.write(line);
            });
            cursor.on('end', function() {
                res.end();
            })
        });
    };

    app.get('/'+prefix+'hs_at.txt', dumpLevelStats.bind(null, "high_scores_alltime", false));
    app.get('/'+prefix+'bc_at.txt', dumpLevelStats.bind(null, "best_combos_alltime", false));
    app.get('/'+prefix+'hs_mo.txt', dumpLevelStats.bind(null, "high_scores_recent", true));
    app.get('/'+prefix+'bc_mo.txt', dumpLevelStats.bind(null, "best_combos_recent", true));
    app.get('/'+prefix+'ratings.txt', dumpTopRatings);
};