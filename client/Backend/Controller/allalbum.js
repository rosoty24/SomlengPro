Template.allalbums.events({
	"click #remove":function(e){
		e.preventDefault();
		var id = this._id;
		if(confirm("Are you sure want to delete this !!!")){
			Meteor.call("RemoveAlbum",id);
		}
	}
});
