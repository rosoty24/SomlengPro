Template.favoriteInfo.helpers({
	Countmp3:function(){
		var singerId = Session.get("GETSINGER-ID");
		return musics.find({singerid:singerId}).count();
	},
	Countlike:function(){
		var singerId = Session.get("GETSINGER-ID");
		return like.find({'singerId':singerId,status:'like'}).count();
	},
	Countunlike:function(){
		var singerId = Session.get("GETSINGER-ID");
		return like.find({'singerId':singerId,status:'unlike'}).count();
	},
	Getview:function(){
		var id = Session.get("GETSINGER-ID");
		Meteor.call("Countview",id,function(error,result){
			if(error){
				console.log("Countview Problem"+error.reason);
			}else{
				console.log("Countview Successfully");
				Session.set("COUNT-VIEW",result);
			}
		});
		return Session.get("COUNT-VIEW");
	}
});