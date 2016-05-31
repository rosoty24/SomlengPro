Template.user.events({
   // Add more user  
    'click #btnAdduser': function(e, tpl){
		e.preventDefault();
		var firstname =$('#firstname').val();
		var lastname =$('#lastname').val();
		var email = $('#email').val();
		var password =$('#password').val();
		var roleid = $('#roleid').val();
		//console.log('adding...');
		Meteor.call('addUserRole',firstname, lastname, email, password, roleid);
		Router.go('/');
    }
});
// get data from roles 
Template.user.helpers({
	getRoles: function(){
		return Meteor.roles.find({});
	}
});
// get data from user to display all user 
Template.alluser.helpers({
	getUser: function(){
		var test= Meteor.users.find({});
		console.log(test);
		return test;
	},
	position: function(posit){
		console.log(posit.noolab[0]);
		return posit.noolab[0];
	}
});

// login
Template.login.events({
    'submit form': function(event){
        event.preventDefault();
		//alert("login");
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
		Meteor.loginWithPassword(email, password, function(error){
			if(error){
				console.log(error.reason);
			} else {
				 var loggedInUser = Meteor.user();
				 var group = 'noolab';
				 if (Roles.userIsInRole(loggedInUser, ['admin'], group)) {
					Router.go('/admin');
				 }
				 else if (Roles.userIsInRole(loggedInUser, ['manager'], group)) {
					Router.go('/manager');
				 }
				 else{
					 Router.go('/member');
				 }
			}
		});
    }
});
// register 
Template.register.events({
    'click #btnRegister': function(e, tpl){
		e.preventDefault();
		//alert("register"); 
		var firstname =$('#firstname').val();
		var lastname =$('#lastname').val();
		var email = $('#email').val();
		var password =$('#password').val();
		Accounts.createUser({
            email: email,
            password: password,
            profile: {firstname: firstname, lastname: lastname}
		});
			alert("Success Register!");
            Router.go('login');  
    }		
});
//member add new
Template.addnew.events({
	'click #btnAdd': function(e){
		e.preventDefault();
		//alert("post"); 
		var title =$('#title').val();
		var description =$('#description').val();
		var price = $('#price').val();
		var date =$('#date').val();
		var location =$('#location').val();
		var image =$('#image').val();
		var status = 0;
		Meteor.call('addPost', title, description, price, date, location, image, status);
		Router.go('member');
		console.log("Inserted");
	}
});
//display data member add new
Template.member.helpers({
	datamempost: function(){
		var userlogin = Meteor.userId();
		var result = announcements.find({userid:userlogin});
		return result;
	}
});
// update data that member has post






