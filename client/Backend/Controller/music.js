Session.set("AlbumId","");
Template.addmusic.events({
	"change #production" : function(){
		var getChild = $("#production").val();
		//alert(getChild);
		Session.set("AlbumId", getChild);
	},
	"change #singertype":function(){
		var stype = $("#singertype").val();
		//alert(stype);
		Session.set("Typesinger", stype);
	},
	"click #btnAddmusic" : function(e, tpl){
		e.preventDefault();	
		var title =$('#title').val();		
		var production =$('#production').val();
		var albums =$('#albums').val();
		var singerid = $('#singerId').val();
		var srcmusic =$('#srcmusic').val();
		var pro_folder=$('#production option:selected').text();
		var albums_folder=$('#albums option:selected').text();
		var partmusic = "/mp3"+"/"+pro_folder+"/"+albums_folder+"/"+srcmusic;
		alert(partmusic); 
		Meteor.call('addMusic', title, partmusic, production, albums, singerid,function(error){
			if(!error){
				//Router.go('/allsinger');
			}
		});
	},
	// =========== EDIT MUSIC ==================== //
	"change #production-edit" : function(){
		var getChild = $("#production-edit").val();
		//alert(getChild);
		Session.set("AlbumId", getChild);
	},
	"click #btnUpdatemusic" : function(e, tpl){
		e.preventDefault();	
		var id = Session.get("CURRENTMUSIC-ID");
		var title =$('#title-edit').val();		
		var production =$('#production-edit').val();
		var albums =$('#albums-edit').val();
		var singerid = $('#singerId-edit').val();
		var srcmusic =$('#srcmusic-edit').val();
		var pro_folder=$('#production-edit option:selected').text();
		var albums_folder=$('#albums-edit option:selected').text();
		var partmusic = "/mp3"+"/"+pro_folder+"/"+albums_folder+"/"+srcmusic;
		var obj = {
			title:title,
			srcmusic:partmusic,
			production:production,
			albums:albums,
			singerid:singerid
		}
		Meteor.call('UpdateMusic',id, obj,function(error){
			if(!error){
				//Router.go('/allsinger');
			}
		});
	},
	"click .glyphicon-edit":function(e){
		e.preventDefault();
		var id = this._id;
		Session.set("CURRENTMUSIC-ID",id);
	},
	"click #remove":function(e){
		e.preventDefault();
		var id = this._id;
		if(confirm("Are you sure want to delete this!!!")){
			Meteor.call("REMOVEMUSIC",id,function(error){
				if(!error){
					//console.log("REMOVE SUCCESS");
				}
			});
		}
	}
});
Template.addmusic.helpers({
  	musicIndex: () => MusicIndex,
	getAlbumsname: function(){
		var resultAlbum = Session.get("AlbumId");
		//console.log("ALBUM="+resultAlbum);
		return production.find({parent:resultAlbum});
	},
	Getsingername:function(id){
		return singer.findOne({_id:id}).singername;
	},
	getSinger: function(){
		var singerval = Session.get("Typesinger");
		if(singerval){
			if(singerval == "male"){
				return singer.find({gender:singerval});
			}else{
				return singer.find({gender:singerval});
			}
		}
	},
	getSingerid: function(){
		var singerid = Session.get("singer_id");
		var result = singer.findOne({_id:singerid});
		return result;
	},
	Getsrc:function(src){
		//console.log("SRC=="+src);
		var result = src.split('/')[4];
		//console.log("SPLIT=="+result);
		return result;
	},
	getProduction: function(){
		var result = production.find({parent:"0"});
		return result;
	},
	getCurrentUpdate:function(){
		var id = Session.get("CURRENTMUSIC-ID");
		return musics.findOne({_id:id});
	},
	CurrentProduct:function(id){
		return production.findOne({_id:id}).title;
	},
	CurrentProduct:function(id){
		return production.findOne({_id:id}).title;
	},
	CurrentSinger:function(id){
		return singer.findOne({_id:id}).singername;
	},
	Singerimage:function(id){
		var result = singer.findOne({'_id':id}).image;
		if(result){
			return "/img/singer/"+result;
		}else{
			return;
		}
	},
	GetImgsingertype:function(image){
		if(image){
			return "/img/singer/"+image;
		}
	},
	inputAttributes: function () { return { class: 'form-control', placeholder: 'Search singer here...' }; }
});