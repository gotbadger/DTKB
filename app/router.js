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


    var ansi = "1::Esc  1::  1::F1  1::F2  1::F3   1::F4  .5::  1::F5  1::F6  1::F7  1::F8  .5::  1::F9  1::F10  1::F11  1::F12  .5::  1::Prt Sc:: ::Sys Rq  1::Scroll Lock::  1::Pause:: ::Break\n\n  23::\n\n  1::`:: ::~  1::1  1::2  1::3  1::4  1::5  1::6  1::7  1::8  1::9  1::0  1::-:: ::_  1::=:: ::+  2::Backspace  .5::  1::Insert  1::Home  1::PgUp  .5::  1::Num Lock  1::/  1::x  1::-\n\n  1.5::Tab  1::Q  1::W  1::E  1::R  1::T  1::Y  1::U  1::I  1::O  1::P  1::[:: ::{  1::]:: ::}  1.5::\\:: ::|  .5::  1::Delete  1::End  1::PgDn  .5::  1::7:: ::Home  1::8:: ::^  1::9:: ::Pg Up  1,2::+\n\n  1.75::Caps Lock  1::A  1::S  1::D  1::F  1::G  1::H  1::J  1::K  1::L  1::;:: :::  1::':: ::\"  2.25::Enter  4::  1::4:: ::<  1::5  1::6:: ::>  \n\n  2.25::Shift  1::Z  1::X  1::C  1::V  1::B  1::N  1::M  1::,:: ::<  1::.:: ::>  1::/:: ::?  2.75::Shift  1.5::  1::^  1.5::  1::1:: ::End  1::2:: ::v  1::3:: ::Pg Dn  1,2::Enter\n\n  1.25::Ctrl  1.25::Meta  1.25::Alt  6.25::Space  1.25::Alt  1.25::Menu  1.25::Meta  1.25::Ctrl  .5::  1::<  1::v  1::>  .5::  2::0:: ::Ins  1::,:: ::Del";
      var bigL = "1::Esc  1::  1::F1  1::F2  1::F3   1::F4  .5::  1::F5  1::F6  1::F7  1::F8  .5::  1::F9  1::F10  1::F11  1::F12  .5::  1::Prt Sc:: ::Sys Rq  1::Scroll Lock::  1::Pause:: ::Break\n\n  23::\n\n  1::`:: ::~  1::1  1::2  1::3  1::4  1::5  1::6  1::7  1::8  1::9  1::0  1::-:: ::_  1::=:: ::+  2::Backspace  .5::  1::Insert  1::Home  1::PgUp  .5::  1::Num Lock  1::/  1::x  1::-\n\n  1.5::Tab  1::Q  1::W  1::E  1::R  1::T  1::Y  1::U  1::I  1::O  1::P  1::[:: ::{  1::]:: ::}  1.5,2.25,2::Enter  .5::  1::Delete  1::End  1::PgDn  .5::  1::7:: ::Home  1::8:: ::^  1::9:: ::Pg Up  1,2::+\n\n  1.75::Caps Lock  1::A  1::S  1::D  1::F  1::G  1::H  1::J  1::K  1::L  1::;:: :::  1::':: ::\"  4::  1::4:: ::<  1::5  1::6:: ::>  \n\n  1.25::Shift  1::\\:: ::|  1::Z  1::X  1::C  1::V  1::B  1::N  1::M  1::,:: ::<  1::.:: ::>  1::/:: ::?  2.75::Shift  1.5::  1::^  1.5::  1::1:: ::End  1::2:: ::v  1::3:: ::Pg Dn  1,2::Enter\n\n  1.25::Ctrl  1.25::Meta  1.25::Alt  6.25::Space  1.25::Alt  1.25::Menu  1.25::Meta  1.25::Ctrl  .5::  1::<  1::v  1::>  .5::  2::0:: ::Ins  1::,:: ::Del";
      var iso = "1::Esc  1::  1::F1  1::F2  1::F3   1::F4  .5::  1::F5  1::F6  1::F7  1::F8  .5::  1::F9  1::F10  1::F11  1::F12  .5::  1::Prt Sc:: ::Sys Rq  1::Scroll Lock::  1::Pause:: ::Break\n\n  23::\n\n  1::`:: ::~  1::1  1::2  1::3  1::4  1::5  1::6  1::7  1::8  1::9  1::0  1::-:: ::_  1::=:: ::+  2::Backspace  .5::  1::Insert  1::Home  1::PgUp  .5::  1::Num Lock  1::/  1::x  1::-\n\n  1.5::Tab  1::Q  1::W  1::E  1::R  1::T  1::Y  1::U  1::I  1::O  1::P  1::[:: ::{  1::]:: ::}  1.5,1.25,2::Enter  .5::  1::Delete  1::End  1::PgDn  .5::  1::7:: ::Home  1::8:: ::^  1::9:: ::Pg Up  1,2::+\n\n  1.75::Caps Lock  1::A  1::S  1::D  1::F  1::G  1::H  1::J  1::K  1::L  1::;:: :::  1::':: ::\"  1::#:: ::@  4::  1::4:: ::<  1::5  1::6:: ::>  \n\n  1.25::Shift  1::\\:: ::|  1::Z  1::X  1::C  1::V  1::B  1::N  1::M  1::,:: ::<  1::.:: ::>  1::/:: ::?  2.75::Shift  1.5::  1::^  1.5::  1::1:: ::End  1::2:: ::v  1::3:: ::Pg Dn  1,2::Enter\n\n  1.25::Ctrl  1.25::Meta  1.25::Alt  6.25::Space  1.25::Alt  1.25::Menu  1.25::Meta  1.25::Ctrl  .5::  1::<  1::v  1::>  .5::  2::0:: ::Ins  1::,:: ::Del";
    var iso_step_test = "1::]  1.5,1.25,2::Enter\n\n1.25::Shift  1.25,2,2::Enter"
    var simple_test = "1::a  1::b  1,2::c  1::d\n\n1::e  1::f  1::g"
    var key_pad = "1::Num  1::/  1::*  1::-\n\n  1::7  1::8  1::9  1,2::+\n\n 1::4  1::5  1::6\n\n1::1  1::2  1::3  1,2::ent\n\n2::1  1::."
    this.kb.reset(Parser.parse(iso));
    }
  });

  return Router;

});
