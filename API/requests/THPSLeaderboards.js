module.exports = function(app, prefix, options) {
    var dumpLevelStats = function(entry_name, req, res, next) {
        global.LEADERBOARDS_COLLECTION.findOne({gameid: options.gameid}, function(err, dbResult) {
            var keys = Object.keys(dbResult[entry_name]);
            for(var i of keys) {
                res.write('Level:'+i+'\r\n');
                var players = dbResult[entry_name][i];
                for(var p of players) {
                    var line = p.score + ":" + p.rating + ":" + p.nick + "\r\n";
                    res.write(line);
                }
            }
            res.end();
        });
    };

    app.get('/'+prefix+'/hs_at.txt', dumpLevelStats.bind(null, "high_scores_alltime"));
    app.get('/'+prefix+'/bc_at.txt', dumpLevelStats.bind(null, "best_combos_alltime"));
    app.get('/'+prefix+'/hs_mo.txt', dumpLevelStats.bind(null, "high_scores_recent"));
    app.get('/'+prefix+'/bc_mo.txt', dumpLevelStats.bind(null, "best_combos_recent"));
};