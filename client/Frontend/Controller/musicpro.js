Template.musicpro.helpers({
	getalbum:function(){
		var musicid = Session.get('DATA-ID');
		var re = musics.findOne({'_id':musicid});
		var pro = re.production;
		var al = re.albums;
		var pro = production.findOne({'_id':re.production}).title;
		var album = production.findOne({'_id':re.albums}).title;
		var obj = {
			mypro:pro,
			myalbum:album
		}
		return obj;
	},
	getcomment:function(){
		var id = Session.get("MUSICID-COMMENT");
		if(id){
			return review.find({musicId:id},{sort:{timestart:-1}});
		}
	},
	commentUser:function(user){
		var result = Meteor.users.findOne({_id:user}).profile.username;
		return result;
	},
	numcomment:function(){
		var mId = Session.get('DATA-ID');
		Meteor.call("CountComment",mId,function(error,result){
			if(!error){
				Session.set("MNUM_COMMENT",result);
			}
		});
		return Session.get("MNUM_COMMENT");
	},
	Isfavorite:function(){
		var userid = Meteor.userId();
	    var mId = Session.get('DATA-ID');
	    if(mId){
		    var fav = favorite.find({ musicId: mId, userId: userid }).count();
		    if(fav > 0){
		    	return true;
		    }else{
		    	return false;
		    }
		}else{
			return;
		}
	}
});