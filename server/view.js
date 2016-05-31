Meteor.methods({
	Addview:function(obj){
		view.insert(obj);
	},
	Countview:function(id){
		return view.find({singerid:id}).count();
	},
	Countsong:function(id){
		return musics.find({singerid:id}).count();
	}
})