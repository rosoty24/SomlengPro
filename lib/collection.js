announcements = new Mongo.Collection('announcements');
singer = new Mongo.Collection('singer');
//singer.initEasySearch('singername');// easy search collection singer by title
production = new Mongo.Collection('production');
musics = new Mongo.Collection('musics');
like = new Mongo.Collection('like');
view = new Mongo.Collection('view');
favorite = new Mongo.Collection('favorite');
review = new Mongo.Collection('review');
SingerIndex = new EasySearch.Index({
	collection: singer,
	fields: ['singername'],
	engine: new EasySearch.Minimongo()
});


