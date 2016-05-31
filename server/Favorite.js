Meteor.methods({
	AddFavorite:function(obj){
		favorite.insert(obj);
	},
	Unfavorite:function(musicid,userid){
		favorite.remove({musicId:musicid,userId:userid});
	},
	CountComment:function(mId){
		return review.find({'musicId':mId}).count();
	}
})