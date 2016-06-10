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
	},
	getsingerImage:function(){
		var img = Session.get("SINGER-IMAGE");
		if(img){
			return img;
		}
	},
	getMusictitle:function(){
		var title = Session.get("MUSIC-TITLE");
		if(title){
			return title;
		}
	}
});