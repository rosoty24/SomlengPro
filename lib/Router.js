Router.configure({
    layoutTemplate: 'mainLayout'
});
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

// index page Male
Router.route('/artist/male', {
	name: 'male'
});
// index page Female
Router.route('/artist/female', {
	name: 'female'
});

// all production 
Router.route('/admin/allproduction', {
	layoutTemplate: 'adminpage',
	name: 'allproduction'
});
// all albums 
Router.route('/admin/allalbums/:_id', {
	name: 'allalbums',
	data: function(){
	var id = this.params._id;
	var result = production.find({parent:id});
	return {getAllalbums:result};
	}	
});
// list music 
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
// all production 
Router.route('/admin/addproduction', {
	name: 'addproduction'
});

///////////////////////////////////// front end ////////////////////////////////////////////////
Router.route('/', {
	name: 'index',
	// data: function () {
	// 	var result = singer.find({});
	// 	var showSinger = Session.get("showsinger");
	// 	if(showSinger) return {singer:result};
	// 	else return false;
	// 	//return {singer:result};
 //    }
});
Router.map(function () {
    this.route('playlist', {
        path: '/playlist/:_id',
        waitOn: function() {
        	var id = this.params._id;
        	//console.log("SINGER_ID==="+id);
        	//var lim = Session.get("MORE-MUSIC");
	        return [Meteor.subscribe("musicsList",id,100)];
	       // return [TAPi18n.subscribe("productsHome", -1), Meteor.subscribe('attrhome'),TAPi18n.subscribe("list_product"), Meteor.subscribe("banner"),Meteor.subscribe('locations')];
	    },
        data:function(){
				var id = this.params._id;
				Session.setPersistent("GETSINGER-ID",id);
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
					Session.set("DATA-ID",sid);
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
				    audio[0].volume = .20;
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
				    	if (playing.match('playing')) {
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
					        Session.set("DATA-ID",dataId);
					        //alert(playing);
					    	if (playing.match('playing')) {
					    		link.find("img").addClass("cplay");
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
				    	if (playing.match('playing')) {
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
Router.map(function () {
    this.route('listsearch', {
        path: '/playlist/search/:slug',
        waitOn: function() {
        	var name = this.params.slug;
        		name = name.replace(/-/g, " ");
        		name = unSlugName(name);
        	var id = musics.findOne({'title':name}).singerid;
	        return [Meteor.subscribe("musicsList",id)];
	       // return [TAPi18n.subscribe("productsHome", -1), Meteor.subscribe('attrhome'),TAPi18n.subscribe("list_product"), Meteor.subscribe("banner"),Meteor.subscribe('locations')];
	    },
        data:function(){
        	//if (this.ready()) {
				//var id = this.params._id;
				//var id = Session.get("GETSINGER-ID");
				var key = this.params.slug;
					key = key.replace(/-/g, " ");
					key = unSlugName(key);
					//console.log("SLUG-KEY===="+key);
				//alert(key);
				var singerId = musics.findOne({'title':key}).singerid;
					Session.set("SINGER-ID",singerId);
				//console.log("SEACH-SINGERID=="+singerId);
				if(key !== ''){
					var result = musics.find({ $or: [{"singerid":singerId,"title": { $regex: new RegExp(key, "i") } }]});
					var singer_re = singer.find({});
					var str = key.charAt(0);
					//console.log("SPLIT=="+str);
					var str_result = musics.find({ $or: [{"singerid":singerId,"title": { $regex: new RegExp(str, "i") } }]});
					return {Searchlist:result,Moresong:str_result,singer:singer_re};	
				}				
			//}
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
					Session.set("DATA-ID",sid);
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
				    audio[0].volume = .20;
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
				    	if (playing.match('playing')) {
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
					        Session.set("DATA-ID",dataId);
					    	if (playing.match('playing')) {
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
				    	if (playing.match('playing')) {
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
				 	Session.set("DATA-ID",sid);
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
				    audio[0].volume = .20;
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
				    	if (playing.match('playing')) {
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
					        Session.set("DATA-ID",dataId);
					        //alert(playing);
					    	if (playing.match('playing')) {
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
				    	if (playing.match('playing')) {
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
