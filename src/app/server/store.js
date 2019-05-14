'use strict';

var mapUrl = "";
var Store = {
	get: function(key) {
      return window.localStorage[key];
	},
	set: function(key, value) {
		window.localStorage[key] = value;
	},
	getBool: function(key) {
		return window.localStorage[key] === 'true' ? true : false;
	},
	deleted: function(key) {
		window.localStorage.removeItem(key);
	},
	get_ServiceAddress:function(){
		$.getJSON("./path.json",function(data){
			localStorage.setItem("serviceUrl",data.ServiceAddress);
		});
	},
	get_ServletServiceAddress:function(){
		$.getJSON("./path.json",function(data){
			localStorage.setItem("servletServiceUrl",data.ServletServiceAddress);
		});
	},
	get_tokenVerify:function(){
		$.getJSON("./path.json",function(data){
			localStorage.setItem("tokenUrl",data.TokenVerify);
		});
	},
	get_portletData:function(){
		return "http://localhost:3000/portlets.json";
	},
	get_mapUrl:function(){
		$.getJSON("./path.json",function(data){
			localStorage.setItem("mapUrl",data.mapUrl);
		});
	}
}

module.exports = Store;
