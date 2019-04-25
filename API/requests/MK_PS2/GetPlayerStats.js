var XMLWriter = require('xml-writer');
module.exports = function(req, res, next) {
	res.setHeader("Content-Type", "application/xml");
    var writer = new XMLWriter();
    var date = new Date();

	writer.startDocument();
    writer.startElement("PLAYER");

    var player_info = {
        id: 10000,
        uniquenick: "StubName"
    };

    writer.writeAttribute("profile_id",new Number(player_info.id).toString());
    writer.writeAttribute("profile_last_update","Oct.2, 2012 11:31pm EST");
    writer.writeAttribute("player_name",player_info.uniquenick);
    writer.writeAttribute("city","StubCity");
    writer.writeAttribute("state","CA");

    writer.writeAttribute("player_dob_month","1");
    writer.writeAttribute("player_dob_day","1");
    writer.writeAttribute("player_dob_year","1980");
    
	writer.writeAttribute("time_month",date.getMonth().toString());
    writer.writeAttribute("time_day",date.getDate().toString());
    writer.writeAttribute("time_year",date.getYear().toString());
    

    writer.writeAttribute("online_eligible_age",new Number(13).toString());
    writer.writeAttribute("voice_eligible_age",new Number(13).toString());

    writer.startElement("GAME_STATS");
    writer.writeAttribute("game_type","0");
    writer.writeAttribute("rank","999");
    writer.writeAttribute("position","5000");
    writer.writeAttribute("wins","0");
    writer.writeAttribute("losses","0");
    writer.writeAttribute("streak","-1");
    writer.writeAttribute("disconnects","1");
    writer.writeAttribute("total_games","1");
    writer.writeAttribute("best_streak","1");
    writer.endElement();

    writer.startElement("STATS");
    writer.writeAttribute("page_type", "1");
    writer.writeAttribute("game_type", "1");
    writer.writeAttribute("column_0", "First Column");
    writer.writeAttribute("column_1", "Second Column");
    writer.writeAttribute("column_3", "Third Column");
    writer.startElement("ENTRY");
    writer.writeAttribute("column_0", "First Column");
    writer.writeAttribute("column_1", "Second Column");
    writer.writeAttribute("column_3", "Third Column");
    writer.endElement();

    writer.endElement();

	writer.endElement();
	writer.endDocument();
    res.send(writer.toString());
}