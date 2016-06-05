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
// Template.playlist.rendered=function(){
// 	Session.set("searchsingersidebar", undefined);
// };
Template.playlist.helpers({
	Myplaylist:function(){
		var id = Session.get("GETSINGER-ID");
		var result = musics.find({singerid:id});
		return result;
	},
	// ,
	// getsidebarsinger: function(){
	// 	var result = singer.find();
	// 	return result;
	// },
	// getproname:function(id){
	// 	return production.findOne({_id:id}).title;
	// },
	// getalbumname:function(id){
	// 	return production.findOne({_id:id}).title;
	// },
	parthImage:function(id){
		var result = singer.findOne({_id:id}).image;
		if(result)
			return "/img/singer/"+result;
	}
});


