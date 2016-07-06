Template.leftsinger.rendered=function (){
	Meteor.subscribe("CountMusic");
};
Template.leftsinger.helpers({
  	//singerIndex: () => SingerIndex,
  	//singerListIndex: () => SingerListIndex,
  	//inputAttributes: function () { return { class: 'form-control input-block-level', placeholder: 'Search Singer Here...' }; },
  	Isempty:function(){
  		return true;
  	},
  	Issinger:function(){
		var singersidebar = Session.get("searchsingersidebar");
		if(singersidebar == "test") return true;
		else return false;
	},
	allsinger:function(){
		var result = singer.find({},{limit:30,sort:{level:1}});
		var value = Session.get("SEARCHKEY");
		if(!value){
			return result;
		}
	},
	Songnum:function(id){
		return musics.find({'singerid':id}).count();
	}
});
Template.leftsinger.events({
	'keyup #textsearch': function(e){
		var key = $(e.currentTarget).val();
		if( key.length > 0){
			//$("#defaultSinger").hide();
			Session.set("SEARCHKEY","singer");
			var result = singer.find({"singername": { $regex: new RegExp(key, "i") } });
			//alert(data);
			var text = '';
			var notfound = '';
			var count = '';
			if( result.count() > 0){
				result.forEach( function(data, index){
					count = musics.find({'singerid':data._id}).count();
					text += '<li class="list-group-item clearfix">';
						text += '<a href="/playlist/'+data.singername+'" id="reload">';
						  	text += '<div class="pull-left w-40 m-r">';
								text += '<img src="/img/singer/'+data.image+'" alt="..." class="w-full img-rounded">';
						  	text += '</div>';
						  	text += '<div class="clear text-ellipsis">';			
								text += '<div>'+data.singernamekh+'</div>';
								text += '<small class="text-muted-dk">'+data.singername+'<span style="color:#ccc; padding-left:2px;padding-right:15px; float:right">'+count+'<i class="fa fa-music"></i></span></small>';
						  	text += '</div>';
						text += '</a>';
					text += '</li>';
				});
			}
			if( text!= ''){
				$('#dataSinger').html(text);
			}
			else{
				notfound += '<div class="text-center col-sm-12">';
					notfound += '<h1><i class="fa fa-frown-o fa-2x"></i></h1>';
					notfound += '<h3><strong>No result!</strong></h3>';
					notfound += '<p>Sorry! We cound not find any result for <strong>Singer</strong></p>';
				notfound += '</div>';
				$('#dataSinger').html(notfound);
			}
		}else{
			Session.set("SEARCHKEY",undefined);
			//$('#dataSinger').html('');
			$("#defaultSinger").show();
		}
	},
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
				//console.log("Addview problem"+error.reason);
			}else{
				$("html, body").animate({ scrollTop: 0 }, "slow");
				//console.log("Addview successfully");
			}
		});
	},
	'focusout #textsearch':function(e){
		e.preventDefault();
		Session.set("SEARCHKEY",undefined);
		$("#textsearch").val('');
		//$('#dataSinger').html('');
	}
});