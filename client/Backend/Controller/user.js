Template.alluser.helpers({
	getUser:function(){
		return Meteor.users.find();
	},
	checkuser:function(role){
		if(role == "admin"){
			return false;
		}else{
			return true;
		}
	}
});
Template.alluser.events({
	'click #remove':function(e){
		e.preventDefault();
		var id = this._id;
		if(confirm("Are you sure want to delete this?")){
			Meteor.call("RemoveUser",id,function(error){
				if(!error){
					console.log("RemoveUser Success");
				}
			});
		};
	}
})