Meteor.startup(function() {
    if(Meteor.users.find().count() == 0) {
        var users = [
            {name:"rosoty",email:"rosoty@admin.com",roles:['admin']},
            {name:"pokeot",email:"pokeot@member.com",roles:['admin']}
        ];
        _.each(users, function (user) {
            var id;
            id = Accounts.createUser({
                email: user.email,
                password: "somleng@admin",
                profile: { username: user.name }
            });
            Roles.addUsersToRoles(id, user.roles);
        });
    }
});