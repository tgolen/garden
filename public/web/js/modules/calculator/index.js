define([
	'lib/approuter.restricted',
	'../index/regions/body',
	'../index/layouts/page',
	'../index/header'
], function(
	AppRouterRestricted,
	RegionBody,
	LayoutPage,
	ViewHeader
) {
	return function(Module, App, Backbone, Marionette, $, _) {
		Module.Router = AppRouterRestricted.extend({
			appRoutes: {
				'calculator' : 'calculator'
			}
		});

		var API = {
			restrictions: [ 'user' ],
			calculator: function(){
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