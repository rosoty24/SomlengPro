
Template.listsearch.rendered=function(){
	
};
Template.listsearch.helpers({
	getsidebarsinger: function(){
		var result = singer.find();
		return result;
	},
	getproname:function(id){
		return production.findOne({_id:id}).title;
	},
	getalbumname:function(id){
		return production.findOne({_id:id}).title;
	},
	parthImage:function(id){
		var result = singer.findOne({_id:id}).image;
		if(result)
			return "/img/singer/"+result;
	}
});

