Template.addsinger.events({
	'click #btnAddsinger': function(e){
		e.preventDefault();
		
		var singername =$('#singername').val();
		var singernamekh =$('#singernamekh').val();
		var image =$('#image').val();
		var gender =$('#gender').val();
		var status = 0;
		//alert(singername + singernamekh + image + gender); 
		Meteor.call('addSinger', singername, singernamekh, image, status, gender);
		Router.go('/admin/allsinger');
		//console.log("Inserted");
	}
});
Template.updatesinger.events({
	'click #btnupdatesinger': function(e){
		e.preventDefault();
		var id = $("#idRecord").val();
		var singername =$('#singername').val();
		var singernamekh =$('#singernamekh').val();
		var image =$('#image').val();
		var gender =$('#gender').val();
		var status = 0;
		//alert(singername + singernamekh + image + gender); 
		var attributes = {
			singername:singername,
			singernamekh:singernamekh,
			image:image,	
			status:status,
			gender:gender
		}
		Meteor.call('updateSinger',id, attributes );
		Router.go('/admin/allsinger');
		//console.log("Inserted");
	}
});
Template.updatesinger.helpers({
	Isgender:function(gender){
		if(gender == "Male")
			return true;
		else
			return false;
	}
});
Template.allsinger.events({
	"click #remove": function(e, tpl) {
		//alert("hellllll");
		var id=this._id;
		Meteor.call('deleteSinger', id);
	},
	"click #addmusic": function(e, tpl){
		Session.set("singer_id",this._id);
	}
});
Template.allsinger.helpers({
	getSinger: function(){
		var result = singer.find({}).map(function(document, index){
			document.index = index+1;
			return document;
		});
		console.log(result);
		return result;
	},
	getSingerid: function(){
		var singerid = Session.get("singer_id");
		var result = singer.findOne({_id:singerid});
		return result;
	},
	getProduction: function(){
		var result = production.find({parent:"0"});
		return result;
	},
	getAlbums: function(){
		var resultAlbum = Session.get("AlbumId");
		return production.find({parent:resultAlbum});
	},
	nummusic: function(singer){
		console.log("SINGER"+singer);
		var result = musics.find({singerid:singer}).count();
		console.log("result"+result);
		return result;
	}
});
Template.allsinger.events({
	"change #production" : function(){
		var getChild = $("#production").val();
		Session.set("AlbumId", getChild);
	},
	"click #btnAddMusic" : function(e, tpl){
		e.preventDefault();	
		var title =$('#title').val();		
		var production =$('#production').val();
		var albums =$('#albums').val();
		var singerid = Session.get("singer_id");
		var srcmusic =$('#srcmusic').val();
		var pro_folder=$('#production option:selected').text();
		var albums_folder=$('#albums option:selected').text();
		var partmusic = "/mp3"+"/"+pro_folder+"/"+albums_folder+"/"+srcmusic;
		alert(partmusic); 
		Meteor.call('addMusic', title, partmusic, production, albums, singerid);
		Router.go('/admin/allsinger');
		//console.log("Inserted");
	}
});
