Template.topmenu.events({
    'click #login': function(event){
        event.preventDefault();
        var email = $('#log-email').val();
        var password = $('#log-pass').val();
        //alert(email+password);
        Meteor.loginWithPassword(email, password,function(error){
        	if(error){
                $(".close").click();
        		//console.log("LOGIN PROBLEM"+error.reason)
        	}else{
        		//console.log("LOGIN SUCCESS!!!");
        	}
        });
    },
    'click #register': function(event){
        event.preventDefault();
        var email=$("#email").val();
        var username =$('#username').val();
        var password = $('#password').val();
        alert(email+username+password);
        var rerole = 'member';
        var msg = '';
        if( username == '' || email=='' || password ==''){
            if( username == '' )
                msg += 'username is required.';
            if( email == '' )
                msg += 'email is required.';
            if( password == '' )
                msg += 'password is required.';
            
            Session.set("registerError", msg );
        }
        else{
            //alert(firstname+lastname+email+password);
            Meteor.call('RegisterUser',email, username, password, rerole, function(err){
                if(err){
                    console.log(err.reason);
                }else{
                    console.log("RegisterUser successfully");
                }
            });
        }
    },
    'click #logout': function(event){
        event.preventDefault();
        //alert('logout!!!');
        Meteor.logout();
        //Router.go('/login');
    },
    'click #login-form':function(e){
        e.preventDefault();
        $("#popup").click();
    },
    'click #popregister':function(e){
        e.preventDefault();
        $("#popregister").addClass("hidden");
        $("#gologin").removeClass("hidden");
        $(".modal-body-left").addClass("hidden");
        $(".modal-body-register-left").removeClass("hidden");
    },
    'click #gologin':function(e){
        e.preventDefault();
        $("#popregister").removeClass("hidden");
        $("#gologin").addClass("hidden");
        $(".modal-body-left").removeClass("hidden");
        $(".modal-body-register-left").addClass("hidden");
    }
});
