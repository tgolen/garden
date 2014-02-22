define([
	'lib/approuter.restricted',
	'./regions/body',
	'./layouts/page',
	'./header'
], function(
	AppRouterRestricted,
	RegionBody,
	LayoutPage,
	ViewHeader
) {
	return function(Module, App, Backbone, Marionette, $, _) {
		Module.Router = AppRouterRestricted.extend({
			appRoutes: {
				'*path' : 'index'
			}
		});

		var API = {
			restrictions: [ 'user' ],
			index: function(){
				var layoutPage = new LayoutPage(),
					viewHeader = new ViewHeader();
				RegionBody.show(layoutPage);
				layoutPage.header.show(viewHeader);
			}
		};

		App.addInitializer(function(){
			new Module.Router({
				controller: API
			});
		});
	};
});