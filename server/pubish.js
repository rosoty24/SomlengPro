Meteor.publish("users", function () {
    return Meteor.users.find();
});
Meteor.publish("announcements", function () {
    return announcements.find();
});
Meteor.publish("singer", function () {
    return singer.find();
});
Meteor.publish("production", function () {
    return production.find();
});
Meteor.publish("musicsList", function (id,limit) {
    return musics.find({'singerid':id},{limit:limit});
});
Meteor.publish("AddmusicsList", function () {
    return musics.find();
});
Meteor.publish("like", function () {
    return like.find();
});
Meteor.publish("favorite", function () {
    return favorite.find();
});
Meteor.publish("userroles", function (){ 
  return roles.find({})
});
Meteor.publish("musicsListfavorite", function(){
	return musics.find({});
});
Meteor.publish("review", function(){
	return review.find({});
});







