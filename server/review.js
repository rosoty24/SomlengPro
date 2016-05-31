Meteor.methods({
	AddReview:function(obj){
		review.insert(obj);
	},
	RemoveReview:function(musicid,userid){
		review.remove({musicId:musicid,userId:userid});
	}
})