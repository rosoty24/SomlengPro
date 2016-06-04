Template.listfavorite.helpers({
	Myplaylist:function(musicId){
		var result = musics.findOne({'_id':musicId});
		return result;
	},
	Getlistfavorite:function(){
		var user = Meteor.userId();
		return favorite.find({'userId':user});
	},
	parthImage:function(id){
		console.log("FASID=="+id);
		var result = singer.findOne({_id:id}).image;
		if(result){
			return "/img/singer/"+result;
		}
	},
	Firstfavorite:function(){
		var musicId = Session.get('SINGERFAV-ID');
		console.log("FAVID=="+musicId);
		if(musicId !== ''){
			return musics.findOne({_id:musicId});
		}else{
			return ;
		}
	},
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
	}
});