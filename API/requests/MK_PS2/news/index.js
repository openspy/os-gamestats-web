module.exports = function(app, prefix, options) {
    app.get('/'+prefix+'/news/news.html', function(req, res, next) {
        var send_str = "<NEWS articles=\"1\">";
        send_str += "<ARTICLE subject=\"test\" date=\"10/04/04\" file=\"news_file_1.txt\"/>";
        send_str += "</NEWS>";
        res.send(send_str);
    });

    app.get('/'+prefix+'/news/news_file_1.txt', function(req, res, next) {
        var send_str = "<COLOR=0xDBC249FF>Welcome to Mortal Kombat: Deception News Update #1<COLOR=0x868D98FF>On behalf of everyone at Midway Games, we would like to thank you for purchasing <COLOR=0xDBC249FF>Mortal Kombat Deception<COLOR=0x868D98FF>. We hope you enjoy the game as much as we enjoyed making it. Not only is Deception the <COLOR=0xC52710BB>first 3D fighting game available online<COLOR=0x868D98FF>, but you can also play <COLOR=0xDBC249FF>Chess Kombat<COLOR=0x868D98FF> and <COLOR=0xDBC249FF>Puzzle Kombat<COLOR=0x868D98FF> online as well.<COLOR=0x868D98FF>There are 3 default rooms for you to find opponents in. These rooms are appropriately named <COLOR=0xDBC249FF>BEGINNER<COLOR=0x868D98FF>, <COLOR=0xDBC249FF>ADVANCED<COLOR=0x868D98FF> and <COLOR=0xDBC249FF>EXPERT<COLOR=0x868D98FF>. If you are new to Mortal Kombat you should probably look for opponents in the <COLOR=0xDBC249FF>BEGINNER<COLOR=0x868D98FF> room and try the other rooms as you get better. If you want to hook up with some friends then create a room of your own where they can meet you. You can even password protect your rooms to keep others out.<COLOR=0x868D98FF>Check back here for news and tips directly from the design team to help you get the most out of <COLOR=0xDBC249FF>Mortal Kombat Deception<COLOR=0x868D98FF>.<COLOR=0xC52710BB>FIGHT!";
        res.send(send_str);
    })
}