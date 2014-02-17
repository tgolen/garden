define(['lib/approuter.restricted'], function(AppRouterRestricted) {
	return function(Module, App, Backbone, Marionette, $, _) {
		// Private data and functions
		// -------------------------------
		var routes = {
				'*path': 'index'
			},
			controller = {
				restrictions: [ 'user' ],
				index: function() {
					console.log('index');
				}
			};

		// Public data and functions
		// -------------------------------
		Module.router = new (AppRouterRestricted.extend({
			appRoutes: routes,
			controller: controller
		}))();
	};
});