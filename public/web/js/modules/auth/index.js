define([
	'./regions/body',
	'./layouts/page',
	'./signin'
], function(
	RegionBody,
	LayoutPage,
	ViewSignin
) {
	return function(Module, App, Backbone, Marionette, $, _) {
		// Private data and functions
		// -------------------------------
		var routes = {
				'signin' : 'signin',
				'singout': 'signout'
			},
			controller = {
				signin: function() {
					var layoutPage = new LayoutPage(),
						viewSignin = new ViewSignin();
					RegionBody.show(layoutPage);
					layoutPage.content.show(viewSignin);
				},
				signout: function() {
					
				}
			};

		// Public data and functions
		// -------------------------------
		Module.router = new Marionette.AppRouter({
			appRoutes: routes,
			controller: controller
		});;
	};
});