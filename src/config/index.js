const _ = require("lodash");
const path = require("path");
const glob = require("glob");



let getGlobedPaths = function (globPatterns, excludes){
 
  let urRegex = new RegExp("^(?:[a-z]+:)?//", "i");

  let output = [];

  if(_.isArray(globPatterns)){
    globPatterns.forEach(function (globPattern){
      output = _.union(output,getGlobedPaths(globPattern,excludes));
    });

  } else if(_.isString(globPatterns)){
    if(urlRegex.text(globPatterns)){
      output.push(globPatterns);
    } else {
      let files = glo.sync(globPatterns);
      if(excludes){
        flies = files.map(function (file){
          if(_.isArray(excludes)){
            for (let i in excludes) {
              if(excludes.hasOwnProperty(i)){
                file = file.replace(excludes[i] , "");
              }
              
            }
          } else {
            file = file.replace(excludes, "");
          }
          return file;
        });

      }
      output = _.union(output , files);
    }
  }
   return output;
 };

function initEnvironmentVariables() {
  require('dotenv').config();

}

exports.initEnvironmentVariables = initEnvironmentVariables;