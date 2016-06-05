Router.route('/admin', {
	layoutTemplate: 'admin'
});
Router.route('/admin/dashboard', {
	layoutTemplate: 'admin',
	name: 'dashboard'
});
// add user
Router.route('/admin/user', {
	layoutTemplate: 'admin',
	name: 'user'
});
// all user 
Router.route('/admin/alluser', {
	layoutTemplate: 'admin',
	name: 'alluser'
});
//login
Router.route('/login', {
	layoutTemplate: 'login',
	name: 'login'
});
// register
Router.route('/register', {
	layoutTemplate: 'register'
	//name: 'register'
});
// dashboard for member
Router.route('/admin/member', {
	layoutTemplate: 'admin',
	name: 'member'
});
// add new announcement
Router.route('/admin/addnew', {
	layoutTemplate: 'admin',
	name: 'addnew'
});
Router.route('/admin/updatenew/:_id', {
	layoutTemplate: 'admin',
	name: 'updatenew',
	data: function(){
        var currentList = this.params._id;
        var result = announcements.findOne({ _id: currentList });
		return result;
    }
});
Router.route('/admin/addmusic', {
	layoutTemplate: 'admin',
	name: 'addmusic',
	waitOn:function(){
		return [Meteor.subscribe("AddmusicsList")];
	}
});
// add singer
Router.route('/admin/addsinger', {
	layoutTemplate: 'admin',
	name: 'addsinger'
});
// all singer
Router.route('/admin/allsinger', {
	layoutTemplate: 'admin',
	name: 'allsinger'
});
Router.route('/admin/updatesinger/:_id', {
	layoutTemplate: 'admin',
	name: 'updatesinger',
	data: function(){
        var id = this.params._id;
        var result = singer.findOne({_id: id });
		return result;
    }
});


// all production 
Router.route('/admin/allproduction', {
	layoutTemplate: 'admin',
	name: 'allproduction'
});
// all albums 
Router.route('/admin/allalbums/:_id', {
	layoutTemplate: 'admin',
	name: 'allalbums',
	data: function(){
	var id = this.params._id;
	var result = production.find({parent:id});
	return {getAllalbums:result};
	}	
});
// list music 
// all production 
Router.route('/admin/addproduction', {
	layoutTemplate: 'admin',
	name: 'addproduction'
});