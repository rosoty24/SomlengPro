// ServiceConfiguration.configurations.remove({
// 	service: 'twitter'
// });
// ServiceConfiguration.configurations.insert({
// 	service: "twitter",
// 	consumerKey: "6G1u7JE3ycr18pqYOMrr5kp28",
// 	secret: "KfKJvKF3wNuWTRv1FLPMv8mj4QSdt1oMBetlIOL5sjG0mXM5km"
// });
//  // for facebook login
// ServiceConfiguration.configurations.remove({
//     service: 'facebook'
// });
 
// ServiceConfiguration.configurations.insert({
//     service: 'facebook',
//     appId:'1030938573643717',
//     secret:'6b5b600f2f3ffe61626b806e88767eee'
//     /*appId: '1712707052305819',
//     secret: '6d74d05916331bc38c29ad57aa33db1f'*/
// });
// // for google
// ServiceConfiguration.configurations.remove({
//   service: "google"
// });
// ServiceConfiguration.configurations.insert({
//   service: "google",
//   clientId: "246221426698-ru7hfu200taqfanah0m5bbtsksjdfm62.apps.googleusercontent.com",
//   secret: "r7S8BcOBE2meUEws6EFpMlGo"
// });

// Meteor.startup(function () {
//     // code to run on server at startup
//     Accounts.loginServiceConfiguration.remove({
//       service: 'instagram'
//     });

//     Accounts.loginServiceConfiguration.insert({
//       service: 'instagram',
//       clientId: 'ef3d917d69fe47a88b321bc96674203e',
//       secret: 'b387ae32c1994c1cbe54a005dcdeb72f'
//       /*clientId: '2e2d27e4ca71492394ab93db6f9a3c0d',
//       secret: 'e123ac9419ee48b8bc2ffd584badc372'*/
      
//     });
//   });
// Meteor.methods({
//     getMatchUser:function(instaUser){
//         var allUsers = Meteor.users.findOne({ "username": { $regex: new RegExp(instaUser, "i") } })._id;
//         if(allUsers == null) return null;
//         else  return allUsers;

//     },
//     updateRoleWithSocail:function(id,obj){
//         Meteor.users.update({_id:id},{$set:obj});
//     }
// });

// Meteor.methods({
//     fetchFromService: function(userName) {
//       var url = "https://api.instagram.com/v1/users/self/?access_token=2057964709.1677ed0.4e8c3110068541ab924c7adf29711a64";
//       var result = Meteor.http.get(url, {timeout:30000});
//       if(result.statusCode==200) {
//         var respJson = JSON.parse(result.content);
//         return respJson;
//       } else {
//         var errorJson = JSON.parse(result.content);
//         throw new Meteor.Error(result.statusCode, errorJson.error);
//       }
//     }
// });

