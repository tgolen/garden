define([
	'marionette',
	'./modules/index/index',
	'./modules/auth/index',
	'./modules/calculator/index'
], function(
	Marionette,
	ModuleIndex,
	ModuleAuth,
	ModuleCalculator
) {
	var App = new Marionette.Application();

	// setup our modules
	App.module('index', ModuleIndex);
	App.module('auth', ModuleAuth);
	App.module('calculator', ModuleCalculator);

	// start our routers
	App.on("initialize:after", function(){
		if (Backbone.history){ Backbone.history.start(); }
	});
	return App;
});