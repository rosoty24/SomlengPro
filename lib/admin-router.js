Router.route('/admin', {
	layoutTemplate: 'adminpage'
});
Router.route('/admin/dashboard', {
	layoutTemplate: 'adminpage',
	name: 'dashboard'
});
// add user
Router.route('/admin/user', {
	layoutTemplate: 'adminpage',
	name: 'user'
});
// all user 
Router.route('/admin/alluser', {
	layoutTemplate: 'adminpage',
	name: 'alluser'
});
//login
Router.route('/login', {
	name: 'login'
});
// register
Router.route('/register', {
	name: 'register'
});
// dashboard for member
Router.route('/admin/member', {
	layoutTemplate: 'adminpage',
	name: 'member'
});
// add new announcement
Router.route('/admin/addnew', {
	layoutTemplate: 'adminpage',
	name: 'addnew'
});
Router.route('/admin/updatenew/:_id', {
	layoutTemplate: 'adminpage',
	name: 'updatenew',
	data: function(){
        var currentList = this.params._id;
        var result = announcements.findOne({ _id: currentList });
		return result;
    }
});
Router.route('/admin/addmusic', {
	layoutTemplate: 'adminpage',
	name: 'addmusic',
	waitOn:function(){
		return [Meteor.subscribe("AddmusicsList")];
	}
});
// add singer
Router.route('/admin/addsinger', {
	layoutTemplate: 'adminpage',
	name: 'addsinger'
});
// all singer
Router.route('/admin/allsinger', {
	layoutTemplate: 'adminpage',
	name: 'allsinger'
});
Router.route('/admin/updatesinger/:_id', {
	layoutTemplate: 'adminpage',
	name: 'updatesinger',
	data: function(){
        var id = this.params._id;
        var result = singer.findOne({_id: id });
		return result;
    }
});


// all production 
Router.route('/admin/allproduction', {
	layoutTemplate: 'adminpage',
	name: 'allproduction'
});
// all albums 
Router.route('/admin/allalbums/:_id', {
	layoutTemplate: 'adminpage',
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
	layoutTemplate: 'adminpage',
	name: 'addproduction'
});