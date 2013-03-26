define([
  // Application.
  "app"
],

function(app) {

  var KBLayout = app.module();

  KBLayout.Model = Backbone.Model.extend({
    defaults: function() {
      return {
        x:0,
        y:0,
        width:50,
        height:50,
        legend:"?",
      };
    }
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

    initialize: function(data) {
      _.bindAll(this,"addKey");
      this.kb = data.kb;
    },

    serialize: function() {
      //stuff to go to template in this case nothing
      return {}
    },
    afterRender: function() {
      //we have
      console.log("h1");
      this.ctx = this.el.getContext("2d");
      this.kb.each(this.addKey);
    },
    addKey: function(keyModel) {
      console.log(keyModel)
      console.log(this.el)
      console.log(this.ctx)
      //renderKey(key, x, y, w, h, round) {
      this.ctx.beginPath();
      this.ctx.lineWidth = 1;
      this.ctx.fillStyle = 'rgb(200, 200, 200)';
      this.ctx.roundRect(keyModel.get('x'), keyModel.get('y'), keyModel.get('width'), keyModel.get('height'), 5);
      this.ctx.fill();

      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = 'rgb(0, 0, 0)';
      this.ctx.roundRect(keyModel.get('x'), keyModel.get('y'), keyModel.get('width'), keyModel.get('height'), 5);
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
      //     _ctx.lineWidth = 0.5;
      //     _ctx.fillStyle = 'rgb(240, 240, 240)';
      //     _ctx.fillRoundRect(x + _3d_offset, y + _3d_offset, w - _3d_offset * 2, h - _3d_offset * 2, round);

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