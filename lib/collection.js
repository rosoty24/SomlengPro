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
		sort: function () {
		      return { singername: 1 };
		}
	})
});
SingerListIndex = new EasySearch.Index({
	collection: singer,
	fields: ['singername'],
	defaultSearchOptions: {
	    limit: 25
	},
	engine: new EasySearch.Minimongo({
		sort: function () {
		      return { singername: 1 };
		}
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
	defaultSearchOptions: {
	    limit: 100
	},
	fields: ['title'],
	engine: new EasySearch.Minimongo({
		//sort : () => ['datecreate']
		sort: () => { datecreate: 1 }
	})
});


