Template.mainLayout.helpers({
	Ishome:function(){
		var url = Router.current().route.path();
		//console.log("URL=="+url);
		if(url == '/')
			return true;
		else
			return false;
	}
});