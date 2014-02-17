define([
	'marionette',
	'./modules/index/index',
	'./modules/auth/index'
], function(
	Marionette,
	ModuleIndex,
	ModuleAuth
) {
	var App = new Marionette.Application();

	// setup our modules
	App.module('index', ModuleIndex);
	App.module('auth', ModuleAuth);

	// start our routers
	App.on("initialize:after", function(){
		if (Backbone.history){ Backbone.history.start(); }
	});
	return App;
});