//Session.set("MORE-MUSIC",100);
// var processScroll = true;
// $(window).scroll(function() {
//     if (processScroll && $(window).scrollTop() > $(document).height() - $(window).height() - 600) {
//         processScroll = false;
//         var route=window.location.href;
//         if(route.indexOf('/playlist')>-1){
//             var val=Session.get('MORE-MUSIC');
//             val=val+50;
//             Session.set('MORE-MUSIC',val);
//         }
//         processScroll = true;
//     }
// });
// Tracker.autorun(function () {
// 	 var limit=Session.get('MORE-MUSIC');
// 	 var id = Session.get("GETSINGER-ID");
// 	 if(limit){
// 			 var lim=Session.get('MORE-MUSIC');
// 			 Meteor.subscribe("musicsList",id,lim);
// 	 }
// });
Template.playlist.rendered=function(){
	//Session.set("searchsingersidebar", undefined);
	$("html, body").animate({ scrollTop: 0 }, "slow");
	$('#dataSinger').html('');
};
Template.playlist.helpers({
	Myplaylist:function(){
		var id = Session.get("GETSINGER-ID");
		var result = musics.find({singerid:id},{limit:25}).fetch();
		var items = result.shuffle();
		return items;
	},
	parthImage:function(id){
		var result = singer.findOne({_id:id}).image;
		if(result)
			return "/img/singer/"+result;
	}
});
Array.prototype.shuffle = function() {
    var input = this;
     
    for (var i = input.length-1; i >=0; i--) {
     
        var randomIndex = Math.floor(Math.random()*(i+1)); 
        var itemAtIndex = input[randomIndex]; 
         
        input[randomIndex] = input[i]; 
        input[i] = itemAtIndex;
    }
    return input;
}
    



