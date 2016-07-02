
Meteor.methods({
	//member add new post
	addPost: function(title, description, price, date, location, image, status) {
	//var userid = Meteor.user(this._id);
	var userid = Meteor.userId();
  	var attributes={
  		title:title,
		description:description,
		price:price,
		date:date,
		location:location,
		image:image,
		status:status,
		userid:userid
  	};
  	announcements.insert(attributes);
  	console.log("Inserted");
	},
	updatePost: function(id,attr) {
		announcements.update({_id:id},{$set: attr});
	},
	
	
});

// add roles
Meteor.methods({
	addUserRole: function( firstname, lastname, email, password, roleid ){
		id = Accounts.createUser({
			email:email,
			password: password,
			profile: { firstname: firstname, lastname: lastname}
		});
		console.log(id);
		Roles.setUserRoles(id, roleid,'noolab')
		//Roles.addUsersToRoles(id, roleid.toLowerCase(), 'default-group');
	}
});

// singer 
Meteor.methods({
	addSinger: function(singername, singernamekh, image, status, gender,level) {
	//var userid = Meteor.user(this._id);
	var userid = Meteor.userId();
  	var attributes={
  		singername:singername,
		singernamekh:singernamekh,
		image:image,
		gender:gender,
		status:status,
		level:level,
		userid:userid
  	};
  	singer.insert(attributes);
  	console.log("Inserted");
	},
	updateSinger: function(id,attributes){
		singer.update({_id:id},{$set: attributes});
	},
	deleteSinger : function(id) {
		singer.remove(id);
	}
});

// Production
Meteor.methods({
	addProduction: function(title, image, parent) {
  	var attributes={
  		title:title,
		image:image,
		parent:parent
  	};
  	production.insert(attributes);
  	console.log("Inserted");
	}
});

// Music
Meteor.methods({
	addMusic: function(title, srcmusic, production, albums, singerid) {
	var nowdate = Date.now();
  	var attributes={
		title:title,
  		srcmusic:srcmusic,
		production:production,
		albums:albums,
		singerid:singerid,
		datecreate:nowdate
  	};
  	musics.insert(attributes);
	},
	UpdateMusic: function(id,obj){
		musics.update({_id:id},{$set: obj});
	},
	REMOVEMUSIC:function(id){
		return musics.remove({'_id':id});
	}
});