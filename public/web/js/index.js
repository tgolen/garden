require.config({
	paths: {
		'backbone'            : '../bower/backbone/backbone',
		'underscore'          : '../bower/underscore/underscore-min',
		'bootstrap'           : '../bower/bootstrap/dist/js/bootstrap.min',
		'jquery'              : '../bower/jquery/dist/jquery.min',
		'marionette'          : '../bower/marionette/lib/core/amd/backbone.marionette',
		'backbone.wreqr'      : '../bower/backbone.wreqr/lib/backbone.wreqr',
		'backbone.babysitter' : '../bower/backbone.babysitter/lib/backbone.babysitter',
		'backbone.validation' : '../bower/backbone-validation/dist/backbone-validation-amd-min',
		'tpl'                 : '../bower/requirejs-tpl/tpl',
		'rivets'              : '../bower/rivets/dist/rivets.min'
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