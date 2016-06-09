Template.topmenu.events({
	"click #currentlike":function(){
		var user = Meteor.userId();
		var singerId = Session.get("GETSINGER-ID");
		//alert(singerId);
		var status = 'like';
		var obj = {	
			singerId:singerId,
			userId:user,
			status:status
		}
		if(!user){
			$("#popup").click();
		}else{
			$("#like").addClass("like");
			$("#unlike").removeClass("like");
			Meteor.call("likesinger",obj,function(error){
				if(error){
					console.log("Insert likesinger problem"+error.reason);
				}else{
					console.log("Insert likesinger successfully!!!");
					$("#like").removeClass("currentlike");
					$("#unlike").addClass("currentunlike");
					Meteor.call("removeUnlike",singerId,user);
				}
			});
		}
	},
	"click #currentunlike":function(){
		//var id = this._id;
		var user = Meteor.userId();
		var singerId = Session.get("GETSINGER-ID");
		//alert(singerId);
		var status = 'unlike';
		var obj = {	
			singerId:singerId,
			userId:user,
			status:status
		}
		if(!user){
			$("#popup").click();
		}else{
			$("#unlike").addClass("like");
			$("#like").removeClass("like");
			Meteor.call("unlikesinger",obj,function(error){
				if(error){
					console.log("Insert unlikesinger problem"+error.reason);
				}else{
					console.log("Insert unlikesinger successfully!!!");
					$("#unlike").removeClass("currentunlike");
					$("#like").addClass("currentlike");
					Meteor.call("removeLike",singerId,user);
				}
			});
		}
	},
	"click #popregister":function(){
		$( "#popup" ).dialog("close");
	},
	'keyup #singerval': function(e){
		var key = $(e.currentTarget).val();
		var id = Session.get("GETSINGER-ID");
		var namesinger = singer.findOne({_id:id}).singername;
		//alert(id);
		if( key.length > 0){
			var data = musics.find({"singerid":id,"title": { $regex: new RegExp(key, "i") } });
			var text = '';
			var link = '';
			if( data.count() > 0){
				data.forEach( function(data, index){
					link = slugname(data.title);
					text += '<li data-id="'+data._id+'" class="listpro"><a href="#" id="listdrop" data-link="'+data.title+'"><span class="fa fa-music"></span> '+data.title+' <span class="" style="font-size: 85%;color:#ccc">by '+ namesinger +'</span></a></li>';
				})	
			}
			if( text!='')
				$('#singerresult').html( '<div style="border:1px solid #ddd;padding:10px">'+text+'</div>' );
			else
				$('#singerresult').html( '<li>No result.</li>' );
		}else{
			$('#singerresult').html( '' );
		}
	},
	"click #listdrop":function(e){
		e.preventDefault();
		//alert('search');
		var key = $(e.currentTarget).attr('data-link');
		//alert(key);
		var slug = slugname(key);
		Session.set('SEARCH_KEY',key);
		//var id = Session.get("GETSINGER-ID");
		$('#singerresult').html('');
		$('#singerval').val('');
		Router.go('/playlist/search/'+slug);
	},
	"click #myfav":function(e){
		e.preventDefault();
		Router.go("/favorite");
	}
});
Template.topmenu.helpers({
	GetMusicFavorite:function(){
		var user = Meteor.userId();
		return favorite.find({userId:user},{limit:5});
	},
	SingerImage:function(singerId){
		var result = singer.findOne({_id:singerId}).image;
		return result;
	},
	Titilename:function(musicId){
		var result = musics.findOne({_id:musicId}).title;
		return result;
	},
	getAlbum:function(musicId){
		var productionId = musics.findOne({_id:musicId}).production;
		var name = production.findOne({_id:productionId}).title;
		return name;
	},
	getVol:function(musicId){
		var albumId = musics.findOne({_id:musicId}).albums;
		var name = production.findOne({_id:albumId}).title;
		return name;
	},
	numfavorite:function(){
		var user = Meteor.userId();
		var result = favorite.find({userId:user}).count();
		if(result > 0){
			return result;
		}else{
			return;
		}
	},
	Islike:function(){
		var singerId = Session.get("GETSINGER-ID");
		var user = Meteor.userId();
		var mylike = like.findOne({singerId:singerId,userId:user,status:'like'});
		if(mylike !== undefined){
			return true;
		}else{
			return false;
		}
	},
	Isunlike:function(){
		var singerId = Session.get("GETSINGER-ID");
		var user = Meteor.userId();
		var mylike = like.findOne({singerId:singerId,userId:user,status:'unlike'});
		if(mylike !== undefined){
			return true;
		}else{
			return false;
		}
	}
});