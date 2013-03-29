// Renderer module
define([
],

// Map dependencies from above array.
function() {
  var CURVYNESS = 5;
  var INNER_OFFSET = 5
  //setup export
  var Renderer = {};

  //setup helpers that will be used when rendering
  var CTXHelpers = {};

  CTXHelpers.roundRect = function(x, y, w, h, r) {
      if (!x && !y && w < 0 || h < 0 || r < 0) {
          return;
      }
      if (w < 2 * r) r = w / 2;
      if (h < 2 * r) r = h / 2;
      this.beginPath();
      this.moveTo(x+r, y);
      this.arcTo(x+w, y,   x+w, y+h, r);
      this.arcTo(x+w, y+h, x,   y+h, r);
      this.arcTo(x,   y+h, x,   y,   r);
      this.arcTo(x,   y,   x+w, y,   r);
      this.closePath();
  };
  CTXHelpers.roundLshape = function(x, y, w, bw, h, r, io) {
      if (!x && !y && w < 0 || h < 0 || r < 0) {
          return;
      }
      //lshape diffrence
      var ld = w-bw
      //inner offset for drawing lshapes
      if(io == undefined){
        io = 0
      }else{
        //if bottom is bigger than top add otherwise subtract
        if(bw<w){
          io = 0-io
        }
      }

      //half height
      var hh = h/2;
      if (w < 2 * r) r = w / 2;
      if (h < 2 * r) r = h / 2;
      this.beginPath();
      this.moveTo(x+r, y);
      this.arcTo(x+w,  y,   x+w, y+hh, r);
      this.arcTo(x+w,  y+h, x,   y+h, r);
      this.arcTo(x+ld, y+h, x+ld,   y,   r);
      
      this.arcTo(x+ld,  y+hh+io, x,   y+hh, r);

      this.arcTo(x,   y+hh+io, x,   y,   r);

      this.arcTo(x,   y,    x+w, y,   r); //last conter
      this.closePath();
  };
  CTXHelpers.fillRoundLshape = function(x, y, w, bw, h, r) {
      this.roundLshape(x, y, w,bw, h, r, INNER_OFFSET);
      this.fill();
  };

  CTXHelpers.strokeRoundLshape = function(x, y, w, bw, h, r) {
      this.roundLshape(x, y, w,bw, h, r);
      this.stroke();
  };  

  CTXHelpers.fillRoundRect = function(x, y, w, h, r) {
      this.roundRect(x, y, w, h, r);
      this.fill();
  };

  CTXHelpers.strokeRoundRect = function(x, y, w, h, r) {
      this.roundRect(x, y, w, h, r);
      this.stroke();
  };

  CTXHelpers.getTextWidth = function (text, font, fontSize) {
      var width;
      if (font && fontSize) {
          var origFont = this.font;
          this.setFont(font, fontSize);
          width = this.measureText(text).width;
          this.font = origFont;
      } else {    
          width = this.measureText(text).width;
      }
      return width;
  };

  CTXHelpers.setFont = function(font, fontSize) {
      this.font = fontSize + 'pt ' + font;
  };

  CTXHelpers.fillTextLine = function(text, x, y, w, h, font, fontSize) {
      // find fitting font size
      while (this.getTextWidth(text, font, fontSize) > w && fontSize > 7) {
          fontSize--;
      }

      var chars = text.length;
      var shortText = text;
      while (this.getTextWidth(shortText, font, fontSize) > w && chars > 0 ) {
          shortText = text.shorten(--chars);
      }

      this.setFont(font, fontSize);
      this.fillText(shortText, x, y, w);
  };

  CTXHelpers.fillTextRect = function (text, x, y, w, h, font, fontSize) {
      var words = text.split(' ');

      // check if text fits into one line
      if (words.length == 1 || this.getTextWidth(text, font, fontSize) <= w) {
          this.fillTextLine(text, x, y, w, h, font, fontSize);
          return;
      }
  };
  //
  Renderer.renderLshapeKey = function(context,keyModel){
    console.log("h");
  }
  Renderer.renderKey = function(context,keyModel){
    if(keyModel.get('legend') == ""){
      return;
    }
    var isLshape = keyModel.get('widthBottom') != undefined;
    //decorate context with helpers
    ctx = _.extend(context,CTXHelpers)
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.fillStyle = 'rgb(200, 200, 200)';
    if(isLshape){
      ctx.roundLshape(keyModel.get('x'), keyModel.get('y'), keyModel.get('width'), keyModel.get('widthBottom'), keyModel.get('height'), CURVYNESS);
    }else{
       ctx.roundRect(keyModel.get('x'), keyModel.get('y'), keyModel.get('width'), keyModel.get('height'), CURVYNESS);
    }
   
    ctx.fill();

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgb(0, 0, 0)';
    if(isLshape){
       ctx.roundLshape(keyModel.get('x'), keyModel.get('y'), keyModel.get('width'), keyModel.get('widthBottom'), keyModel.get('height'), CURVYNESS);
    }else{
      ctx.roundRect(keyModel.get('x'), keyModel.get('y'), keyModel.get('width'), keyModel.get('height'), CURVYNESS);
    }
    ctx.fill();
    ctx.stroke();

    ctx.lineWidth = 0.5;
    ctx.fillStyle = 'rgb(240, 240, 240)';
    if(isLshape){
      ctx.fillRoundLshape(
                  keyModel.get('x') + INNER_OFFSET,
                  keyModel.get('y') + INNER_OFFSET,
                  keyModel.get('width') - INNER_OFFSET * 2,
                  keyModel.get('widthBottom') - INNER_OFFSET *2 ,
                  keyModel.get('height') - INNER_OFFSET * 2,
                  CURVYNESS); 
    }else{
      ctx.fillRoundRect(keyModel.get('x') + INNER_OFFSET,
                  keyModel.get('y') + INNER_OFFSET,
                  keyModel.get('width') - INNER_OFFSET * 2,
                  keyModel.get('height') - INNER_OFFSET * 2,
                  CURVYNESS); 
    }
    ctx.closePath();
    ctx.fillStyle = 'black';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.fillTextRect(
      keyModel.get('legend'),
      keyModel.get('x')+ (INNER_OFFSET*2),
      keyModel.get('y')+ INNER_OFFSET,
      keyModel.get('width'), 
      keyModel.get('height'), 
      keyModel.get('font'), 
      keyModel.get('legend_size')
      );
    ctx.fillStyle = 'blue';
    ctx.fillTextRect(
      keyModel.get('sublegend'),
      keyModel.get('x')+ (INNER_OFFSET*2),
      keyModel.get('y')+ (INNER_OFFSET*5),
      keyModel.get('width'), 
      keyModel.get('height'), 
      keyModel.get('font'), 
      keyModel.get('legend_size')
      );
    

  }


  // Return the module for AMD compliance.
  return Renderer;

});
