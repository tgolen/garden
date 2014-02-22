define([
	'lib/approuter.restricted',
	'./regions/body',
	'./layouts/page',
	'./signin'
], function(
	AppRouterRestricted,
	RegionBody,
	LayoutPage,
	ViewSignin
) {
	return function(Module, App, Backbone, Marionette, $, _) {
		Module.RouterNoUser = AppRouterRestricted.extend({
			appRoutes: {
				'signin' : 'signin'
			}
		});
		Module.Router = AppRouterRestricted.extend({
			appRoutes: {
				'signout': 'signout'
			}
		});

		var APINoUser = {
				restrictions: [ 'nouser' ],
				signin: function(){
					var layoutPage = new LayoutPage(),
						viewSignin = new ViewSignin();
					RegionBody.show(layoutPage);
					layoutPage.content.show(viewSignin);
				}
			},
			API = {
				restrictions: [ 'user' ],
				signout: function() {
					$.getJSON('api/v1/auth/signout', function(data) {
						if (data.success) {
							window.location.reload(true);
						} else {
							throw new Error('Could not sign out');
							console.log(data);
						}
					});
				}
			};

		App.addInitializer(function(){
			new Module.RouterNoUser({
				controller: APINoUser
			});
		});
		App.addInitializer(function(){
			new Module.Router({
				controller: API
			});
		});
	};
});