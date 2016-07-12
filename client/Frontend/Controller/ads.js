Template.playmp3.rendered=function(){
	var description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id tortor nisi. Aenean sodales diam ac lacus elementum scelerisque. Suspendisse a dui vitae lacus faucibus venenatis vel id nisl. Proin orci ante, ultricies nec interdum at, iaculis venenatis nulla. ';

            $('#play').ttwMusicPlayer(Getmyplay, {
                autoPlay:true, 
                description:description,
                jPlayer:{
                    swfPath:'/plugin/jquery-jplayer' //You need to override the default swf path any time the directory structure changes
                }
            });
}
Template.registerHelper('Getmyplay', function() {
    //return "http://51.254.205.178:8080"+src;;
    var myPlaylist = [

	    {
	        mp3:'/mix/1.mp3',
	        oga:'/mix/1.ogg',
	        title:'Sample',
	        artist:'Sample',
	        rating:4,
	        buy:'#',
	        price:'0.99',
	        duration:'0:30',
	        cover:'/mix/1.png'
	    },
	    {
	        mp3:'/mix/1.mp3',
	        oga:'/mix/1.ogg',
	        title:'Somleng',
	        artist:'Sample',
	        rating:4,
	        buy:'#',
	        price:'0.99',
	        duration:'0:30',
	        cover:'/mix/1.png'
	    },
	    {
	        mp3:'/mix/1.mp3',
	        oga:'/mix/1.ogg',
	        title:'Music',
	        artist:'Sample',
	        rating:4,
	        buy:'#',
	        price:'0.99',
	        duration:'0:30',
	        cover:'/mix/1.png'
	    }
	];
	return myPlaylist;
});

