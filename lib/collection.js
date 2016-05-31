announcements = new Meteor.Collection('announcements');
singer = new Meteor.Collection('singer');
//singer.initEasySearch('singername');// easy search collection singer by title
production = new Meteor.Collection('production');
musics = new Meteor.Collection('musics');
like = new Meteor.Collection('like');
view = new Meteor.Collection('view');
favorite = new Meteor.Collection('favorite');
review = new Meteor.Collection('review');
SingerIndex = new EasySearch.Index({
	collection: singer,
	fields: ['singername'],
	engine: new EasySearch.Minimongo()
});


