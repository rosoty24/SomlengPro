Session.set('SINGER-GENDER','');
Template.index.helpers({
  	//singerIndex: () => SingerIndex,
  	//inputAttributes: function () { return { class: 'form-control', placeholder: 'Search singer here...' }; },
  	getSinger: function(){
		var type = Session.get('SINGER-GENDER');
		var result = '';
		if(type === 'men'){
			result = singer.find({'gender':'Male'},{limit:30,sort:{level:1}});
		}else if (type === 'women'){
			result = singer.find({'gender':'Female'},{limit:30,sort:{level:1}});
		}else{
			result = singer.find({},{limit:30,sort:{level:1}});
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
		// Meteor.call("Countsong",singerId,function(error,respon){
		// 	if(!error){
		// 		Session.set("COUNTMUSICNUM",respon);
		// 	}
		// });
		// return Session.get("COUNTMUSICNUM");
		return musics.find({'singerid':singerId}).count();
	},
	Countlike:function(id){
		return like.find({'singerId':id}).count();
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
	},
	'keyup #textsearch': function(e){
		var key = $(e.currentTarget).val();
		if( key.length > 0){
			$("#defaultSinger").hide();
			var data = singer.find({"singername": { $regex: new RegExp(key, "i") } });
			var text = '';
			var countlike = '';
			var countmusic = '';
			if( data.count() > 0){
				data.forEach( function(data, index){
					countlike = like.find({'singerId':data._id}).count();
					countmusic = musics.find({'singerid':data._id}).count();
					text += '<div class="col-xs-6 col-sm-4 col-md-2 padding-xs">';             
						text += '<div class="thumbnail">';
							text += '<a href="/playlist/'+data.singername+'"><img src="/img/singer/'+data.image+'" alt="" width="225" height="225" class="img-responsive"></a>';
							text += '<div class="text-center">';	
								text += '<h5 class="text-muted">'+data.singernamekh+'</h5>';
								text += '<h5><a href="/playlist/'+data.singername+'">'+data.singername+'</a></h5>';						
								text += '<p class="caption">';
									text += '<a href="#" class="pull-left"><i class="fa fa-music"></i>' +' '+countmusic+'</a>'; 
									text += '<a href="/playlist/'+data.singername+'" class="pull-right"><i class="fa fa-thumbs-o-up"></i>' +' '+countlike+'</a>';
								text += '</p>';					
							text += '</div>';
						text += '</div>';      
				  	text += '</div>';
				})	
			}
			if( text!='')
				$('#dataSinger').html(text);
			else
				$('#dataSinger').html( '<li>No result.</li>' );
		}else{
			$('#dataSinger').html( '' );
			$("#defaultSinger").show();
		}
	}
});