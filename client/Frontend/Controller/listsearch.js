
Template.listsearch.rendered=function(){
	
};
Template.listsearch.helpers({
	getsidebarsinger: function(){
		var result = singer.find();
		return result;
	},
	getproname:function(id){
		return production.findOne({_id:id}).title;
	},
	getalbumname:function(id){
		return production.findOne({_id:id}).title;
	},
	parthImage:function(id){
		var result = singer.findOne({_id:id}).image;
		if(result)
			return "/img/singer/"+result;
	},
	Timeplay:function(){
		var audio = new Audio();
		//audio.loop = true;
		audio.src = "/mp3/Sunday/Vol-208/01. Kror kmean komhos - Eva.mp3";
		audio.loop = true;
		console.log("MY_SRC="+audio.duration);
		var durmins = Math.floor(audio.duration / 60);
		var dursecs = Math.floor(audio.duration - durmins * 60);
		console.log("MYDUR="+durmins);
		console.log("MYSEC="+dursecs);
		return durmins+":"+dursecs;
	}
});
Template.listsearch.events({
	"click #currentplay":function(e){
		e.preventDefault();
		var audioElem = document.getElementById('audio');
		//alert(audioElem);
		if (audioElem.paused){
		    audioElem.play();
			$("#currentplay").addClass("fa-pause");
			$("#currentplay").removeClass("fa-play");
		}
		else{
		    audioElem.pause();
			$("#currentplay").removeClass("fa-pause");
			$("#currentplay").addClass("fa-play");
		}		
	}
});

