define([
  // Application.
  "app",
   // Modules.
  "modules/KBLayout",
],

function(app,KBLayout) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
  
    initialize: function() {
      //setup stuff
      var collections = {
        // Set up the users.
        kb: new KBLayout.Collection(),
      };
      
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
      //ok mock parsed output here
      //this will be pre calculated by the parser
      this.kb.reset([
        new KBLayout.Model({x:5,y:5,legend:"q"}),
        new KBLayout.Model({x:65,y:5,legend:"w"}),
        new KBLayout.Model({x:125,y:5,legend:"e"}),
        new KBLayout.Model({x:185,y:5,legend:"r"}),
      ]);
    }
  });

  return Router;

});
