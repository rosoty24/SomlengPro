var clock = 1500;
var timeLeft = function() {
    if (clock > 0) {
        clock--;
        Session.set("time", clock);
    } else {
        return Meteor.clearInterval(interval);
    }
};

var interval = Meteor.setInterval(timeLeft, 2000);

Template.registerHelper("time", function() {
    return Session.get("time");
});
Template.registerHelper("slug", function() {
    return slugname(this.title);
});
slugname = function(title) {
    title = title.replace(/\-/g, "(minus)");
    title = title.replace(/\s/g, "-");
    title = title.replace(/\%/g, "(percentag)");
    title = title.replace(/\+/g, "(plush)");
    title = title.replace(/\ô/g, "(ocir)");
    title = title.replace(/\®/g, "(copyright)");
    title = title.replace(/\°/g, "(number)");
    title = title.replace(/\Ô/g, "(bigocir)");
    title = title.replace(/\²/g, "(square)");
    title = title.replace(/\`/g, "(accentaigu)");
    title = title.replace(/\é/g, "(eaccentaigu)");
    title = title.replace(/\É/g, "(bigeaccentaigu)");
    title = title.replace(/\&/g, "(and)");
    title = title.replace(/\//g, "(slash)");
    title = title.replace(/\’/g, "(apostrophe)");
    title = title.replace(/\'/g, "(quote)");
    title = title.replace(/\!/g, "(warning)");
    title = title.replace(/\?/g, "(question)");
    title = title.replace(/\$/g, "(dolla)");
    title = title.replace(/\è/g, "(eaccentgrave)");
    title = title.replace(/\–/g, "(hyphen)");
    //title = title.toLowerCase();
    return title;
}
    
Template.registerHelper("unSlug",function(){
    return unSlugName(this.title);
});
unSlugName = function(title){
    title = title.replace(/\-/g," ");
    title = title.replace(/\(percentag\)/g,"%");
    title = title.replace(/\(plush\)/g,"+");
    title = title.replace(/\(ocir\)/g,"ô");
    title = title.replace(/\(minus\)/g,"-");
    title = title.replace(/\(copyright\)/g,"®");
    title = title.replace(/\(number\)/g,"°");
    title = title.replace(/\(bigocir\)/g,"Ô");
    title = title.replace(/\(square\)/g,"²");
    title = title.replace(/\(accentaigu\)/g,"`");
    title = title.replace(/\(eaccentaigu\)/g,"é");
    title = title.replace(/\(bigeaccentaigu\)/g,"É");
    title = title.replace(/\(and\)/g,"&");
    title = title.replace(/\(slash\)/g,"/");
    title = title.replace(/\(apostrophe\)/g,"’");
    title = title.replace(/\(quote\)/g,"'");
    title = title.replace(/\(warning\)/g,"!");
    title = title.replace(/\(question\)/g,"?");
    title = title.replace(/\(dolla\)/g,"$");
    title = title.replace(/\(eaccentgrave\)/g,"è");
    title = title.replace(/\(hyphen\)/g,"–");
    return title;
}

Getproduction = function(){
    var musicid = Session.get('DATA-ID');
    var re = musics.findOne({'_id':musicid});
    var pro = production.findOne({'_id':re.production}).title;
    var album = production.findOne({'_id':re.albums}).title;
    var obj = {
        mypro:pro,
        myalbum:album
    }
    return obj;
}
Template.registerHelper('Getproduction', function() {
    return Getproduction;
});
