var XMLWriter = require('xml-writer');
function StatsFormatter() {
}

/*
    var hof_data = {date: Date.now(), version: "(Release: $Revision: #10 $)"};

    var page_versus_top_leader = {"page_type": 2, game_type: 0, columns: ["Versus Top Leader", "name", "city", "state", "wins", "losses", "label"]};
    page_versus_top_leader.entries = [
        {name: "My Name", city: "StubCity", state: "CA", wins: 1111, losses: 3333, label: "18000"}
    ];

    statsFormatter.writeStats("HOF_STATS", hof_data, [page_versus_top_leader]);
*/

StatsFormatter.prototype.writeStats = function(res, element_name, root_data, pages) {
    var writer = new XMLWriter();
    res.setHeader("Content-Type", "application/xml");
    writer.startDocument();
    writer.startElement(element_name);

    var keys = Object.keys(root_data);
    for(var i of keys) {
        writer.writeAttribute(i, root_data[i].toString());
    }

    for(var i of pages) {
        writer.startElement("STATS");
        keys = Object.keys(i);

        var columns = i.columns;

        for(var x of keys) {
            //skip special entries
            if(x.localeCompare("entries") != 0 && x.localeCompare("columns") != 0 && x.localeCompare("sorts") != 0) {
                writer.writeAttribute(x, i[x].toString());
            }
        }

        var idx = 0;
        var column_map = {};
        for(var x of columns) {
            if(idx != 0)
                column_map[idx] = x;
            writer.writeAttribute("column_" + idx, x);
            idx++;
        }

        if(i.sorts) {
            writer.startElement("SORTS");
            idx = 0;
            for(var x of i.sorts) {
                if(x != null) {
                    writer.writeAttribute("column_" + idx, x);
                }
                idx++;
            }
            writer.endElement();
    
        }
        for(var x of i.entries) {
            writer.startElement("ENTRY");
            keys = Object.keys(column_map);
            for(var j of keys) {
                var column = column_map[j];
                writer.writeAttribute("column_" + j, x[column]);
            }
            writer.endElement();
        }

        writer.endElement();

    }


    writer.endElement();
    writer.endDocument();

    res.send(writer.toString());
};

module.exports = StatsFormatter;