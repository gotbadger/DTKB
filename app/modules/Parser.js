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
    var flat = _filterFailed(_.flatten(_parseRow(source)))
    
    _.each(flat,function(elm,index,all){
      //work out how to space things out in here
      //terible algorithm...
      if(index != 0){
        for (var i=0;i<index;i++){
          elm.shuffle(_.toArray(all)[i]);
        }
      }
    })
    return flat
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
    return _.map(source.split("\n\n"), function(s,row){
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
    console.log(data)
    //simply drop invalid entries
    if(data.length >= 2){
      var create = {}
      //1.25::Meta
      create.sublegend = data[3];
      create.legend = data[1];
      var hasHeight = data[0].split(",");
      if(hasHeight.length == 2){
        create.unitWidth = hasHeight[0]
        create.unitHeight = hasHeight[1]
      }else if(hasHeight.length == 3){
        create.unitWidth = hasHeight[0]
        create.isoStep = hasHeight[1]
        create.unitHeight = hasHeight[2]
      }else{
        create.unitWidth = data[0]
        create.unitHeight = 1
      }
      create.row = row
      return new KBLayout.Model(create,{parse:true})
    }
  }
  return Parser;
});