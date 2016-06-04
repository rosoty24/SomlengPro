Template.leftsinger.helpers({
  singerIndex: () => SingerIndex,
  inputAttributes: function () { return { class: 'form-control', placeholder: 'Search Singer Here...' }; },
  Issinger:function(){
		var singersidebar = Session.get("searchsingersidebar");
		if(singersidebar) return true;
		else return false;
	},
	allsinger:function(){
		var result = singer.find();
		return result;
	},
	Songnum:function(id){
		return musics.find({'singerid':id}).count();
	}
});
Template.leftsinger.events({
	'click #reload':function(){
		Session.set("MORE-MUSIC",100);
		var singerid = this._id;
		Session.set("IDSINGER",singerid);
		var time = Date.now();
		var user = Meteor.userId();
		var status = 1;
		var obj = {
			singerid:singerid,
			timestart:time,
			userId:user,
			status:status
		}
		Meteor.call("Addview",obj,function(error){
			if(error){
				console.log("Addview problem"+error.reason);
			}else{
				console.log("Addview successfully");
			}
		});
	},
	'keyup .search': function(e){
		e.preventDefault();
		var key = $('.search input').val();
		
		//alert(key);
		if( key.length > 0 )
			Session.set("searchsingersidebar","test");
		else
			Session.set("searchsingersidebar", undefined);
	},
	'focusout .search':function(e){
		e.preventDefault();
		$('.search input').val('');
	}
});