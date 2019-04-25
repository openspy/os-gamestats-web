var StatsFormatter = require('./StatsFormatter');
var moment = require('moment');
module.exports = function(app, prefix, options) {
    this.statsFormatter = new StatsFormatter();
    var dumpGameStats = function(entry_name, req, res, next) {
        global.LEADERBOARDS_COLLECTION.findOne({gameid: options.gameid}, function(_res, err, dbResult) {
            var data = dbResult.data[entry_name];
            this.statsFormatter.writeStats(_res, data.tagName, data.rootAttributes, data.pages);
        }.bind(this, res));
    }

    app.get('/'+prefix+'/GetHOFStats.asp', dumpGameStats.bind(this, "HOFStats"));
    app.get('/'+prefix+'/GetOnlineStats.asp', dumpGameStats.bind(this, "OnlineStats"));
    app.get('/'+prefix+'/GetServerInfo.asp', require('./GetServerInfo'));
    app.get('/'+prefix+'/GetPlayerStats.asp', require('./GetPlayerStats'));

    require('./news')(app, prefix, options);
}