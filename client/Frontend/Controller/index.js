Session.set('SINGER-GENDER','');
Template.index.helpers({
  	singerIndex: () => SingerIndex,
  	inputAttributes: function () { return { class: 'form-control', placeholder: 'Search Singer Here...' }; },
  	getSinger: function(){
		var type = Session.get('SINGER-GENDER');
		var result = '';
		if(type === 'men'){
			result = singer.find({'gender':'Male'});
		}else if (type === 'women'){
			result = singer.find({'gender':'Female'});
		}else{
			result = singer.find({});
		}
		return result;
	},
	countSinger: function(){
		var type = Session.get('SINGER-GENDER');
		var result = '';
		if(type === 'men'){
			result = singer.find({'gender':'Male'}).count();
		}else if (type === 'women'){
			result = singer.find({'gender':'Female'}).count();
		}else{
			result = singer.find({}).count();
		}
		return result;
	},
	Countmp3:function(singerId){
		Meteor.call("Countsong",singerId,function(error,respon){
			if(!error){
				Session.set("COUNTMUSIC",respon);
			}
		});
		//return Session.get("COUNTMUSIC");
	},
	Countfavorite:function(id){
		return favorite.find({'singerId':id}).count();
	}
});
Template.index.events({
	'click #all':function(e){
		e.preventDefault();
		Session.set('SINGER-GENDER','all');
		$('#all').addClass('btn-default');
		$('#men').removeClass('btn-default');
		$('#women').removeClass('btn-default');
	},
	'click #men':function(e){
		e.preventDefault();
		Session.set('SINGER-GENDER','men');
		$('#men').addClass('btn-default');
		$('#women').removeClass('btn-default');
		$('#all').removeClass('btn-default');
	},
	'click #women':function(e){
		e.preventDefault();
		Session.set('SINGER-GENDER','women');
		$('#women').addClass('btn-default');
		$('#men').removeClass('btn-default');
		$('#all').removeClass('btn-default');
	}
});