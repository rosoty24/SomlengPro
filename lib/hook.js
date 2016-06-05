// var IR_BeforeHooks = {
//     checkLogin:function(pause){
//     	var user = Meteor.userId();
//       	if (Roles.userIsInRole(user, ['admin'])) {
//           	this.next();
//       	}else{
//       		this.redirect('/login');
//           	pause();
//       	}
//     }
// };
// Router.onBeforeAction(IR_BeforeHooks.checkLogin, {
//     only: [
//     	'admin',
//         'dashboard',
//         'user',
//         'alluser',
//         'member',
//         'addnew',
//         'updatenew',
//         'addmusic',
//         'addsinger',
//         'allsinger',
//         'updatesinger',
//         'allproduction',
//         'allalbums',
//         'addproduction'  
//     ]
//   //except: ['admin','categories','login','register','projectlist','search','project','tage'] 
// });