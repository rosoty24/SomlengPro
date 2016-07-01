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
};
Template.playlist.helpers({
	Myplaylist:function(){
		var id = Session.get("GETSINGER-ID");
		var result = musics.find({singerid:id}).fetch();
		//var tempArray = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
		var items = result.shuffle();
		return items;
		//console.log("items");
		//console.log(items);
		// //var n,r;
  //   	var r, rand, n;
  //   	//numbers = [1,2,3,5,8,13,21,34,55,89];
		// n = result.slice(0); // clone the array
		// r = [];
		// while (n.length){
		//     rand = Math.floor(Math.random()*n.length);
		//     r.push(n.splice(rand,1));
		//     //console.log(r[r.length-1]);
		// }
		// console.log("r==");
		// console.log(r);
		// return r;
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
    



