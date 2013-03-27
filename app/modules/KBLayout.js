define([
  // Application.
  "app",
  "modules/Renderer"
],

function(app,Renderer) {

  var KBLayout = app.module();

  KBLayout.Model = Backbone.Model.extend({
    UNITSCALE: 60,
  
    defaults: function() {
      return {
        x:0,
        y:0,
        width:this.UNITSCALE,
        height:this.UNITSCALE,
        legend:"UNDEF",
        font:"Tahoma",
        legend_size:12,
      };
    },
    parse: function(data){
      data.width = Math.round(data.unitWidth * this.UNITSCALE);
      data.height = Math.round(data.unitHeight * this.UNITSCALE);
      console.log(data.width)
      data.y = (data.row*this.UNITSCALE)+data.row
      return data
    },
    nextX: function(){
      return this.get('x')+this.get('width')
    },
  });

  KBLayout.Collection = Backbone.Collection.extend({
    model: KBLayout.Model,

  // cache: true,

  // url: function() {
  //   return "https://api.github.com/repos/" + this.user + "/" + this.repo +
  //     "/commits?callback=?";
  // },

  //   parse: function(obj) {
  //     // Safety check ensuring only valid data is used.
  //     if (obj.data.message !== "Not Found") {
  //       return obj.data;
  //     }

  //     return this.models;
  //   },

  //   initialize: function(models, options) {
  //     if (options) {
  //       this.user = options.user;
  //       this.repo = options.repo;
  //     }
  //   }
  });

  // Commit.Views.Item = Backbone.View.extend({
  //   template: "commit/item",

  //   tagName: "tr",

  //   serialize: function() {
  //     return {
  //       model: this.model,
  //       repo: this.options.repo,
  //       user: this.options.user
  //     };
  //   }
  // });
  KBLayout.Views.preview = Backbone.View.extend({
    tagName: "canvas",
    className: "preview",

    initialize: function(data) {
      _.bindAll(this,"addKey");
      this.kb = data.kb;
    },

    serialize: function() {
      //stuff to go to template in this case nothing
      return {}
    },
    afterRender: function() {
      //work out what to set this to based on parsed result?
      this.el.setAttribute('width', 1280);
      this.el.setAttribute('height', 500); 
      this.ctx = this.el.getContext("2d");
      this.ctx.scale(1,1)
      this.kb.each(this.addKey);
    },
    addKey: function(keyModel) {
      Renderer.renderKey(this.ctx,keyModel)
    },


    beforeRender: function() {
      
    },

  });

  // Commit.Views.List = Backbone.View.extend({
  //   tagName: "table",

  //   className: "table table-striped",

  //   beforeRender: function() {
  //     this.$el.children().remove();

  //     this.options.commits.each(function(commit) {
  //       this.insertView(new Commit.Views.Item({
  //         model: commit,
  //         repo: this.options.commits.repo,
  //         user: this.options.commits.user
  //       }));
  //     }, this);
  //   },

  //   initialize: function() {
  //     this.listenTo(this.options.commits, {
  //       "reset": this.render,

  //       "fetch": function() {
  //         this.$el.html("<img src='/app/img/spinner.gif'>");
  //       }
  //     });
  //   }
  // });

  // Required, return the module for AMD compliance.
  return KBLayout;

});