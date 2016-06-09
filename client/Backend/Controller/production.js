Template.allproduction.events({
	'click #btnAddproduction': function(e){
		e.preventDefault();
		
		var title =$('#title').val();
		var image =$('#image').val();
		var parent =$('#parent').val();
		alert(title + image + parent); 
		Meteor.call('addProduction', title, image, parent);
		//console.log("Inserted");
	},
	"click #updateproduction": function(e, tpl){
		e.preventDefault();	
		var id = this._id;
		//alert(id);
		Session.set("updatePro", id);
	}
});
Template.allproduction.helpers({
	getParent: function(){
		var result = production.find({parent:"0"});
		return result;
	},
	numPro: function(pro){
		console.log("PRODUCTION"+pro);
		var result = production.find({parent:"0"}).count();
		console.log("result"+result);
		return result;
	},
	getUpdatePro: function(){
		var idPro = Session.get("updatePro");
		return production.findOne({_id:idPro})
	},
	countalbum: function(id){
		return production.find({parent:id}).count();
	}
	
});