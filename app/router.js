define([
  // Application.
  "app",
   // Modules.
  "modules/KBLayout",
  "modules/Parser",
],

function(app,KBLayout,Parser) {

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
//       this.kb.reset(Parser.parse("Esc::1.5  F1::1  F2::1  F3::1  F4::1  F5::1  F6::1  F7::1  F8::1  F9::1  F10::1  F11::1  F12::1  fn::1  Del::1.5$$"+
// "`~::1  1::1  2::1  3::1  4::1  5::1  6::1  7::1  8::1  9::1  0::1  -_::1  +=::1  Backspace::2    Home::1$$"+
// "Tab::1.5  Q::1  W::1  E::1  R::1  T::1  Y::1  U::1  I::1  O::1  P::1  [{::1  ]}::1  \|::1.5  PgUp::1$$"+
// "Caps Lock::1.75  A::1  S::1  D::1  F::1  G::1  H::1  J::1  K::1  L::1  ;: ::1  '\"::1  Enter::2.25  PgDn::1$$"+
// "Shift::2.25  Z::1  X::1  C::1  V::1  B::1  N::1  M::1  <,::1  >.::1  /?::1  Shift::1.25  ^::1.25  END::1.25$$"+
// "Control::1.25  Meta::1.25  Alt::1.25  Space::6.25  Alt::1.25  Ctrl::1  <::1.25  V::1.25  >::1.25$$
    var code = "Num::1  /::1  *::1  -::1$$  7::1  8::1  9::1  +::1,2$$  4::1  5::1  6::1$$ 1::1  2::1  3::1  ent::1,2$$ 0::2  .::1";
    this.kb.reset(Parser.parse(code));
    }
  });

  return Router;

});
