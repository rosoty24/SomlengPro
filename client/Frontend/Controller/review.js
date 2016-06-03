Template.review.helpers({
	getcomment:function(){
		var id = Session.get("MUSICID-COMMENT");
		if(id){
			return review.find({musicId:id});
		}
	},
	commentUser:function(user){
		var result = Meteor.users.findOne({_id:user}).profile.username;
		return result;
	}
});