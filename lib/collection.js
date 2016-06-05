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
	defaultSearchOptions: {
	    limit: 200
	},
	engine: new EasySearch.Minimongo({
		sort : () => ['singername']
	})
});
// SingerIndex.search('Marie', {
//   // search level configuration / options
//   limit: 20,
//   props: {
//     'maxScore': 200
//   }
// });
MusicIndex = new EasySearch.Index({
	collection: musics,
	limit: 70,
	fields: ['title'],
	engine: new EasySearch.Minimongo({
		sort : () => ['title']
	})
});


