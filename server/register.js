Meteor.methods({
    RegisterUser:function(email,username,password,rerole){
   		targetUserId = Accounts.createUser({
	    	email: email,
	    	password: password,
	    	profile:{username:username,firstname:"",lastname:"",sex:"",image:""}
	   	});
	   	Roles.setUserRoles(targetUserId, rerole);
	},
	RemoveUser:function(id){
		Meteor.users.remove({_id:id});
	}
});