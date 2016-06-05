Template.login.events({
	'click #btn-login': function(event){
        event.preventDefault();
        var email = $('#log-email').val();
        var password = $('#log-pass').val();
        alert(email+password);
        Meteor.loginWithPassword(email, password,function(error){
        	if(error){
        		console.log("LOGIN PROBLEM"+error.reason);
        	}else{
        		console.log("LOGIN SUCCESS!!!");
        		Router.go("/admin");
        	}
        });
    }
});
Template.leftside.events({
	'click #logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
});