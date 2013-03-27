// Renderer module
define([
  "modules/KBLayout",
],

// Map dependencies from above array.
function(KBLayout) {
  var Parser = {};

  //@source give me keyboard layout 'code'
  //@return array of key objects
  Parser.parse = function(source){
    console.log(source);

    //parse then flatten and remove any errors
    flat = _filterFailed(_.flatten(_parseRow(source)))

    _.each(flat,function(elm,index,all){
      //work out how to space things out in here
      if(index != 0){
        var prev = all[index-1];
        //if they aint on the same row dont do this...
        if(elm.get('row') ==prev.get('row')){
          elm.set('x',prev.nextX());
        }
      }
    })
    console.log(flat);

   

    return flat

    // return [
    //     new KBLayout.Model({x:5,y:5,legend:"q"}),
    //     new KBLayout.Model({x:60,y:5,legend:"w"}),
    //     new KBLayout.Model({x:115,y:5,height:105,legend:"e"}),
    //     new KBLayout.Model({x:170,y:5,legend:"r"}),
    //     new KBLayout.Model({x:5,y:60,legend:"a"}),
    //     new KBLayout.Model({x:60,y:60,legend:"s"}),
    //   ]
  }
  var _filterFailed = function(arr){  
    return _.filter(arr,function(m){
        //flatten remove any keys that didnt have a legend set or parsed badly
        if(m==undefined){
          return false
        }
        return m.get('legend') != "UNDEF"
    });
  }

  var _parseRow = function(source){
    return _.map(source.split("$$"), function(s,row){
              return _parseKeys(s,row);
            });
  }
  var _parseKeys = function(source,row){
    return _.map(source.split("  "),function(s){
              return _parseKey(s,row);
            });
  }
  var _parseKey = function(source,row){
    var data = source.split("::");
    //simply drop invalid entries
    if(data.length == 2){
      var create = {}
      create.legend = data[0];
      var hasHeight = data[1].split(",");
      if(hasHeight.length == 2){
        create.unitWidth = hasHeight[0]
        create.unitHeight = hasHeight[1]
      }else{
        create.unitWidth = data[1]
        create.unitHeight = 1
      }
      create.row = row
      return new KBLayout.Model(create,{parse:true})
    }
  }
  return Parser;
});