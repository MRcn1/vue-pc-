import Vue from 'vue'


//复制对象
Vue.prototype.copyObj = function(odlObj) {
  var newobj = {};
  for (var attr in odlObj) {
    newobj[attr] = odlObj[attr];
  }
  return newobj;
};

//复制数组
Vue.prototype.copyArray = function(odlArray) {
  var newArray = [];
  for (var i = 0; i < odlArray.length; i++) {
    var obj = odlArray[i];
    newArray.push(obj);
  }
  return newArray;
};