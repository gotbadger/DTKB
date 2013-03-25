define([
  // Application.
  "app",
   // Modules.
  "modules/KBLayout",
],

function(app) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
  
  initialize: function() {
      //setup stuff
      var collections = {
        // Set up the users.
        layout: new KBLayout.Collection(),
      };
      //ok mock parsed output here


      // Ensure the router has references to the collections.
      _.extend(this, collections);

      // Use main layout and set Views.
      app.useLayout("main-layout").setViews({
        ".preview" : new KBLayout.Views.preview(collections)
        // ".users": new User.Views.List(collections),
        // ".repos": new Repo.Views.List(collections),
        // ".commits": new Commit.Views.List(collections)
      }).render();
    },

    routes: {
      "": "index"
    },

    index: function() {
      console.log("hello world")
    }

  });

  return Router;

});
