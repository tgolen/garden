require.config({
	paths: {
		'backbone'            : 'bower_components/backbone/backbone',
		'underscore'          : 'bower_components/underscore/underscore-min',
		'bootstrap'           : 'bower_components/bootstrap/dist/js/bootstrap.min',
		'jquery'              : 'bower_components/jquery/dist/jquery.min',
		'marionette'          : 'bower_components/marionette/lib/core/amd/backbone.marionette',
		'backbone.wreqr'      : 'bower_components/backbone.wreqr/lib/backbone.wreqr',
		'backbone.babysitter' : 'bower_components/backbone.babysitter/lib/backbone.babysitter',
		'backbone.validation' : 'bower_components/backbone-validation/dist/backbone-validation-amd-min',
		'tpl'                 : 'bower_components/requirejs-tpl/tpl',
		'rivets'              : 'bower_components/rivets/dist/rivets.min'
	},
	shim : {
		jquery : {
			exports : 'jQuery'
		},
		underscore : {
			exports : '_'
		},
		backbone : {
			deps : ['jquery', 'underscore'],
			exports : 'Backbone'
		},
		'backbone.validation' : {
			deps : ['backbone']
		},
		bootstrap : {
			deps : ['jquery'],
			exports : 'Bootstrap'
		},
		marionette: {
			deps : ['backbone'],
			exports : 'Marionette'
		}
	}
});
require([
	'app',
	'lib/rivets/core',

	// include these so that they get included and setup properly
	'bootstrap',
	'lib/backbone.ajax'
], function(App, rivets) {
	window.GardenApp = App;
	window.__r = rivets;
	App.start();
});