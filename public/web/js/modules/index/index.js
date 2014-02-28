define([
	'lib/approuter.restricted',
	'./regions/body',
	'./layouts/page',
	'./header',
	'./schedule'
], function(
	AppRouterRestricted,
	RegionBody,
	LayoutPage,
	ViewHeader,
	ViewSchedule
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
					viewHeader = new ViewHeader(),
					viewSchedule = new ViewSchedule();
				RegionBody.show(layoutPage);
				layoutPage.header.show(viewHeader);
				layoutPage.content.show(viewSchedule);
			}
		};

		App.addInitializer(function(){
			new Module.Router({
				controller: API
			});
		});
	};
});