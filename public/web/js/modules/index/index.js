define([
	'lib/approuter.restricted',
	'./regions/body',
	'./layouts/page'
], function(
	AppRouterRestricted,
	RegionBody,
	LayoutPage
) {
	return function(Module, App, Backbone, Marionette, $, _) {
		// Private data and functions
		// -------------------------------
		var routes = {
				'*path': 'index'
			},
			controller = {
				restrictions: [ 'user' ],
				index: function() {
					var layoutPage = new LayoutPage();
					RegionBody.show(layoutPage);
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