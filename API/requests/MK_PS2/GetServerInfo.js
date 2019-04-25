var XMLWriter = require('xml-writer');
module.exports = function(req, res, next) {
	res.setHeader("Content-Type", "application/xml");
	var writer = new XMLWriter();
	writer.startDocument();
    writer.startElement("SERVER_INFO");
    var date = new Date();
	writer.writeAttribute("time_month",date.getMonth().toString());
    writer.writeAttribute("time_day",date.getDate().toString());
    writer.writeAttribute("time_year",date.getYear().toString());

    writer.writeAttribute("online_eligible_age",new Number(13).toString());
    writer.writeAttribute("voice_eligible_age",new Number(13).toString());
	writer.endElement();
	writer.endDocument();
    res.send(writer.toString());
}