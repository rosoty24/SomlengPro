Router.configure({
    layoutTemplate: 'mainLayout',
    loadingTemplate: "loading",
    notFoundTemplate: 'notfound',
    trackPageView: true
});

Router.route('/admin/listmusic/:_id', {
	name: 'listmusic1',
	data: function(){
        var id = this.params._id;
		var result = musics.find({singerid: id }).map(function(document, index){
			document.index = index+1;
			return document;
		});
		return {getmusics:result};
    }
});
Router.route('/playtest', {
	name: 'playtest',
	waitOn:function(){
		return [Meteor.subscribe("musicsListfavorite")];
	}
});
Router.route('/myplay', {
	layoutTemplate: 'myplaylist',
	//name: 'myplaylist',
	waitOn:function(){
		return [Meteor.subscribe("musicsListfavorite")];
	}
});
///////////////////////////////////// front end ////////////////////////////////////////////////
Router.route('/', {
	name: 'index',
	waitOn:function(){
		return [Meteor.subscribe("musicsListfavorite"),Meteor.subscribe("view")];
	}
});
Router.map(function () {
    this.route('playlist', {
        path: '/playlist/:slug',
        fastRender: true,
        waitOn: function() {
        	var name = this.params.slug;
        	var id = singer.findOne({'singername':name})._id;
        	//console.log("SINGER_ID==="+id);
        	//var lim = Session.get("MORE-MUSIC");
	        return [Meteor.subscribe("musicsList",id,100)];
	       // return [TAPi18n.subscribe("productsHome", -1), Meteor.subscribe('attrhome'),TAPi18n.subscribe("list_product"), Meteor.subscribe("banner"),Meteor.subscribe('locations')];
	    },
        data:function(){
        	//var name = slugname(data.title);
        	var name = this.params.slug;
        		//name = name.replace(/-/g, " ");
        		//name = unSlugName(name);
			var id = singer.findOne({'singername':name})._id;
			if(id !== undefined){
				Session.setPersistent("GETSINGER-ID",id);
			}
		},
         onAfterAction: function () {
		    Tracker.afterFlush(function () {
		      	var title;
				var image;
				var time;
				title = $("ul#playlist li a:first").attr("data-title");
				$("#mp3title").html(title);
				image = $("ul#playlist li a:first").attr("data-image");
				$(".mp3image").attr("src",image);
				$(".avatar-current").attr("src",image);
				var myaudio = $("audio")[0];
				var cur_time = myaudio.currentTime;
				var play = $("ul#playlist li a:first").attr("data-src");
				$("#audio").attr("src",play);
				var sid = $("ul#playlist li a:first").attr("data-id");
					Session.setPersistent("DATA-ID",sid);
				var audio;
				var playlist;
				var tracks;
				var current;
				init();
				function init(e){
				    current = 0;
				    audio = $('#audio');
				    audio.controls = false;
				    playlist = $('#playlist');
				    tracks = playlist.find('li a');
				    len = tracks.length - 1;
				    audio[0].volume = .50;
				    audio[0].play();
				    var pBar = document.getElementById('p');
				    //currentPlaying();
				    $("#iconplay img:first").addClass("cplay");
				    audio[0].addEventListener("timeupdate",function(){
			       		updateProgress();
			       		seektimeupdate();
			       }, false);
				    //var pl = $(this).attr('class');
				   	playlist.find('.play').click(function(e){
				    	e.preventDefault();
				    	//alert('hello');
				    	// CURET PLAY
				    	var playing = $(e.currentTarget).find("img").attr("class");
				    	if (playing.match('curplaying')) {
				    		$(e.currentTarget).find("img").addClass("cplay");
				            //$(e.currentTarget).addClass('yellow-star');
				            $(e.currentTarget).parent().nextAll("li").find("img").removeClass("cplay");
				            $(e.currentTarget).parent().prevAll("li").find("img").removeClass("cplay");
				        }
				        //END CURRENT
				        link = $(this);
				        current = link.parent().index();
				        run(link, audio[0]);
				        // PROGRESS BAR
				       getduration(link, audio[0]);
				       //audio[0].addEventListener("timeupdate",Timeprogress, false);
				       audio[0].addEventListener("timeupdate",function(){
				       		updateProgress();
				       		seektimeupdate();
				       }, false);
				    });
				    audio[0].addEventListener('ended',function(e){
				        current++;
				        if(current == len){
				            current = 0;
				            link = playlist.find('a')[0];
				        }else{
				            link = playlist.find('a')[current];    
				        }
				        run($(link),audio[0]);
				    });
					function run(link, player){
							//alert("run");
					        player.src = link.attr('data-src');
					        var mptitle = link.attr("data-title");
					        $("#mp3title").html(mptitle);
					        $("#singercomment").html(mptitle);
					        var playing = link.find("img").attr("class");
					        var dataId = link.attr('data-id');
					        Session.setPersistent("DATA-ID",dataId);
					        //alert(playing);
					    	if (playing.match('curplaying')) {
					    		link.find("img").addClass("cplay");
					            link.parent().nextAll("li").find("img").removeClass("cplay");
					            link.parent().prevAll("li").find("img").removeClass("cplay");
					        }
					        audio[0].load();
					        audio[0].play();
					        // SEO.set({
					        //     title: mptitle + " | Somleng Cambodia",
					        //     meta: {
					        //         'description': mptitle
					        //     },
					        //     og: {
					        //         'title': mptitle + " | Somleng Cambodia",
					        //         'description': mptitle
					        //     }
					        // });
					}
					function getTimeupdate(){
						var rem = parseInt(audio[0].duration - audio[0].currentTime, 10);
						alert(rem);
  						var pos = (audio[0].currentTime / audio[0].duration) * 100;
  						alert(pos);
  						var mins = Math.floor(rem/60,10);
  						alert(mins);
  						var secs = rem - mins*60;
  						alert(secs);    
  						alert(pos+":"+mins+":"+secs);
  						$("#durtime").html(mins+":"+secs);
					}
					function updateProgress() {
						var percent = Math.floor((100 / audio[0].duration) * audio[0].currentTime);
							pBar.style.width = percent + "%";
					}
					function seektimeupdate(){
						var curmins = Math.floor(audio[0].currentTime / 60);
					    var cursecs = Math.floor(audio[0].currentTime - curmins * 60);
					    var durmins = Math.floor(audio[0].duration / 60);
					    var dursecs = Math.floor(audio[0].duration - durmins * 60);
					 	document.getElementById("curtimetext").innerHTML = curmins+":"+cursecs;
					 	document.getElementById("durtimetext").innerHTML = durmins+":"+dursecs;
					}
					function currentPlaying(e){
						var playing = $(e.currentTarget).find("img").attr("class");
				    	if (playing.match('curplaying')) {
				    		$(e.currentTarget).find("img").addClass("cplay");
				            //$(e.currentTarget).addClass('yellow-star');
				            $(e.currentTarget).parent().nextAll("li").find("img").removeClass("cplay");
				            $(e.currentTarget).parent().prevAll("li").find("img").removeClass("cplay");
				        }
					}
				}
				// var mid = Session.get("DATA-ID");
				// if(mid){
				// 	var result = musics.findOne({'_id':mid});
				// 	SEO.set({
			 //            title: result.title + " | Somleng Cambodia",
			 //            meta: {
			 //                'description': result.title
			 //            },
			 //            og: {
			 //                'title': result.title + " | Somleng Cambodia",
			 //                'description': result.title
			 //            }
			 //        });
				// }
		    });
		}
    });
});
Router.map(function () {
    this.route('listsearch', {
        path: '/playlist/search/:slug',
        fastRender: true,
        waitOn: function() {
        	var name = this.params.slug;
        		name = name.replace(/-/g, " ");
        		name = unSlugName(name);
        	var id = musics.findOne({'title':name}).singerid;
	        return [Meteor.subscribe("musicsList",id)];
	       // return [TAPi18n.subscribe("productsHome", -1), Meteor.subscribe('attrhome'),TAPi18n.subscribe("list_product"), Meteor.subscribe("banner"),Meteor.subscribe('locations')];
	    },
        data:function(){
        	if (this.ready()) {
				var key = this.params.slug;
					key = key.replace(/-/g, " ");
					key = unSlugName(key);
				var singerId = musics.findOne({'title':key}).singerid;
					Session.setPersistent("SINGER-ID",singerId);
				if(key !== ''){
					var result = musics.find({ $or: [{"singerid":singerId,"title": { $regex: new RegExp(key, "i") } }]},{limit:25});
					var singer_re = singer.find({});
					var str = key.charAt(0);
					var str_result = musics.find({ $or: [{"singerid":singerId,"title": { $regex: new RegExp(str, "i") } }]},{limit:25});
					return {Searchlist:result,Moresong:str_result,singer:singer_re};	
				}				
			}
		},
         onAfterAction: function () {
		    Tracker.afterFlush(function () {
		      	var title;
				var image;
				var time;
				title = $("ul#playlist li a:first").attr("data-title");
				$("#mp3title").html(title);
				image = $("ul#playlist li a:first").attr("data-image");
				$(".mp3image").attr("src",image);
				$(".avatar-current").attr("src",image);
				var myaudio = $("audio")[0];
				var cur_time = myaudio.currentTime;
				var sid = $("ul#playlist li a:first").attr("data-id");
					Session.setPersistent("DATA-ID",sid);
				var play = $("ul#playlist li a:first").attr("data-src");
				$("#audio").attr("src",play);
				var audio;
				var playlist;
				var tracks;
				var current;
				init();
				function init(){
				    current = 0;
				    audio = $('#audio');
				    audio.controls = false;
				    playlist = $('#playlist');
				    tracks = playlist.find('li a');
				    len = tracks.length - 1;
				    audio[0].volume = .50;
				    audio[0].play();
				    var pBar = document.getElementById('p');
				    //currentPlaying();
				    $("#iconplay img:first").addClass("cplay");
				    audio[0].addEventListener("timeupdate",function(){
			       		updateProgress();
			       		seektimeupdate();
			       }, false);
				    playlist.find('.play').click(function(e){
				    	e.preventDefault();
				    	// CURET PLAY
				    	var playing = $(e.currentTarget).find("img").attr("class");
				    	if (playing.match('curplaying')) {
				    		$(e.currentTarget).find("img").addClass("cplay");
				            //$(e.currentTarget).addClass('yellow-star');
				            $(e.currentTarget).parent().nextAll("li").find("img").removeClass("cplay");
				            $(e.currentTarget).parent().prevAll("li").find("img").removeClass("cplay");
				        }
				        //END CURRENT
				        link = $(this);
				        current = link.parent().index();
				        run(link, audio[0]);
				        // PROGRESS BAR
				       getduration(link, audio[0]);
				       //audio[0].addEventListener("timeupdate",Timeprogress, false);
				       audio[0].addEventListener("timeupdate",function(){
				       		updateProgress();
				       		seektimeupdate();
				       }, false);
				    });
				    audio[0].addEventListener('ended',function(e){
				        current++;
				        if(current == len){
				            current = 0;
				            link = playlist.find('a')[0];
				        }else{
				            link = playlist.find('a')[current];    
				        }
				        run($(link),audio[0]);
				        
				        //currentPlaying();
				    });
					function run(link, player){
							//alert("run");
					        player.src = link.attr('data-src');
					        var mptitle = link.attr("data-title");
					        $("#mp3title").html(mptitle);
					        var playing = link.find("img").attr("class");
					        var dataId = link.attr('data-id');
					        Session.setPersistent("DATA-ID",dataId);
					    	if (playing.match('curplaying')) {
					    		link.find("img").addClass("cplay");
					            //$(e.currentTarget).addClass('yellow-star');
					            link.parent().nextAll("li").find("img").removeClass("cplay");
					            link.parent().prevAll("li").find("img").removeClass("cplay");
					        }
					        audio[0].load();
					        audio[0].play();
					}
					function getTimeupdate(){
						var rem = parseInt(audio[0].duration - audio[0].currentTime, 10);
						alert(rem);
  						var pos = (audio[0].currentTime / audio[0].duration) * 100;
  						alert(pos);
  						var mins = Math.floor(rem/60,10);
  						alert(mins);
  						var secs = rem - mins*60;
  						alert(secs);    
  						alert(pos+":"+mins+":"+secs);
  						$("#durtime").html(mins+":"+secs);
					}
					function updateProgress() {
						var percent = Math.floor((100 / audio[0].duration) * audio[0].currentTime);
							pBar.style.width = percent + "%";
					}
					function seektimeupdate(){
						var curmins = Math.floor(audio[0].currentTime / 60);
					    var cursecs = Math.floor(audio[0].currentTime - curmins * 60);
					    var durmins = Math.floor(audio[0].duration / 60);
					    var dursecs = Math.floor(audio[0].duration - durmins * 60);
					 	document.getElementById("curtimetext").innerHTML = curmins+":"+cursecs;
					 	document.getElementById("durtimetext").innerHTML = durmins+":"+dursecs;
					}
					function currentPlaying(e){
						var playing = $(e.currentTarget).find("img").attr("class");
				    	if (playing.match('curplaying')) {
				    		$(e.currentTarget).find("img").addClass("cplay");
				            //$(e.currentTarget).addClass('yellow-star');
				            $(e.currentTarget).parent().nextAll("li").find("img").removeClass("cplay");
				            $(e.currentTarget).parent().prevAll("li").find("img").removeClass("cplay");
				        }
					}
				}
		    });
		  }
    });
});
Router.route('/testlist', {
	name: 'testlist'
});
Router.route('/listmusic/search/:_id', {
	name: 'musicsearch'
});
Router.map(function () {
    this.route('listfavorite', {
        path: '/favorite',
        fastRender: true,
        waitOn: function() {
	        return [Meteor.subscribe("musicsListfavorite")];
	    },
        data:function(){
				//var id = this.params._id;
				//Session.set("GETSINGER-ID",id);
		},
         onAfterAction: function () {
		    Tracker.afterFlush(function () {
		      	var title;
				var image;
				var time;
				title = $("ul#playlist li a:first").attr("data-title");
				$("#mp3title").html(title);
				image = $("ul#playlist li a:first").attr("data-image");
				$(".mp3image").attr("src",image);
				$(".avatar-current").attr("src",image);
				var myaudio = $("audio")[0];
				var cur_time = myaudio.currentTime;
				var play = $("ul#playlist li a:first").attr("data-src");
				$("#audio").attr("src",play);
				var sid = $("ul#playlist li a:first").attr("data-id");
				 	Session.setPersistent("DATA-ID",sid);
				var audio;
				var playlist;
				var tracks;
				var current;
				init();
				function init(e){
				    current = 0;
				    audio = $('#audio');
				    audio.controls = false;
				    playlist = $('#playlist');
				    tracks = playlist.find('li a');
				    len = tracks.length - 1;
				    audio[0].volume = .50;
				    audio[0].play();
				    var pBar = document.getElementById('p');
				    //currentPlaying();
				    $("#iconplay img:first").addClass("cplay");
				    audio[0].addEventListener("timeupdate",function(){
			       		updateProgress();
			       		seektimeupdate();
			       }, false);
				    //var pl = $(this).attr('class');
				   	playlist.find('.play').click(function(e){
				    	e.preventDefault();
				    	//alert('hello');
				    	// CURET PLAY
				    	var playing = $(e.currentTarget).find("img").attr("class");
				    	if (playing.match('curplaying')) {
				    		$(e.currentTarget).find("img").addClass("cplay");
				            //$(e.currentTarget).addClass('yellow-star');
				            $(e.currentTarget).parent().nextAll("li").find("img").removeClass("cplay");
				            $(e.currentTarget).parent().prevAll("li").find("img").removeClass("cplay");
				        }
				        //END CURRENT
				        link = $(this);
				        current = link.parent().index();
				        run(link, audio[0]);
				        // PROGRESS BAR
				       getduration(link, audio[0]);
				       //audio[0].addEventListener("timeupdate",Timeprogress, false);
				       audio[0].addEventListener("timeupdate",function(){
				       		updateProgress();
				       		seektimeupdate();
				       }, false);
				    });
				    audio[0].addEventListener('ended',function(e){
				        current++;
				        if(current == len){
				            current = 0;
				            link = playlist.find('a')[0];
				        }else{
				            link = playlist.find('a')[current];    
				        }
				        run($(link),audio[0]);
				        
				        //currentPlaying();
				    });
					function run(link, player){
							//alert("run");
					        player.src = link.attr('data-src');
					        var mptitle = link.attr("data-title");
					        $("#mp3title").html(mptitle);
					        var playing = link.find("img").attr("class");
					        var curimage = link.attr("data-image");
					        $(".mp3image").attr("src",curimage);
					        var dataId = link.attr('data-id');
					        Session.setPersistent("DATA-ID",dataId);
					        //alert(playing);
					    	if (playing.match('curplaying')) {
					    		link.find("img").addClass("cplay");
					            //$(e.currentTarget).addClass('yellow-star');
					            link.parent().nextAll("li").find("img").removeClass("cplay");
					            link.parent().prevAll("li").find("img").removeClass("cplay");
					        }
					        //par = link.parent();
					        //$(link.target).addClass("selected").siblings().removeClass("selected");
					        //par.addClass('active1').siblings().removeClass('active1');
					        audio[0].load();
					        audio[0].play();
					}
					function getTimeupdate(){
						var rem = parseInt(audio[0].duration - audio[0].currentTime, 10);
						alert(rem);
  						var pos = (audio[0].currentTime / audio[0].duration) * 100;
  						alert(pos);
  						var mins = Math.floor(rem/60,10);
  						alert(mins);
  						var secs = rem - mins*60;
  						alert(secs);    
  						alert(pos+":"+mins+":"+secs);
  						$("#durtime").html(mins+":"+secs);
					}
					function updateProgress() {
						var percent = Math.floor((100 / audio[0].duration) * audio[0].currentTime);
							pBar.style.width = percent + "%";
					}
					function seektimeupdate(){
						var curmins = Math.floor(audio[0].currentTime / 60);
					    var cursecs = Math.floor(audio[0].currentTime - curmins * 60);
					    var durmins = Math.floor(audio[0].duration / 60);
					    var dursecs = Math.floor(audio[0].duration - durmins * 60);
					 	document.getElementById("curtimetext").innerHTML = curmins+":"+cursecs;
					 	document.getElementById("durtimetext").innerHTML = durmins+":"+dursecs;
					}
					function currentPlaying(e){
						var playing = $(e.currentTarget).find("img").attr("class");
				    	if (playing.match('curplaying')) {
				    		$(e.currentTarget).find("img").addClass("cplay");
				            //$(e.currentTarget).addClass('yellow-star');
				            $(e.currentTarget).parent().nextAll("li").find("img").removeClass("cplay");
				            $(e.currentTarget).parent().prevAll("li").find("img").removeClass("cplay");
				        }
					}
				}
		    });
		  }
    });
});
Router.route('/playmp3', {
	layoutTemplate: 'playmp3'
});
