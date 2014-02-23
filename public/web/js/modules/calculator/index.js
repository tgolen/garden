define([
	'lib/approuter.restricted',
	'../index/regions/body',
	'../index/layouts/page',
	'../index/header',
	'./mix'
], function(
	AppRouterRestricted,
	RegionBody,
	LayoutPage,
	ViewHeader,
	ViewMix
) {
	return function(Module, App, Backbone, Marionette, $, _) {
		Module.Router = AppRouterRestricted.extend({
			appRoutes: {
				'calculator' : 'calculator'
			}
		});

		var API = {
			calculator: function(){
				var layoutPage = new LayoutPage(),
					viewHeader = new ViewHeader(),
					viewMix = new ViewMix();
				RegionBody.show(layoutPage);
				layoutPage.header.show(viewHeader);
				layoutPage.content.show(viewMix);
			}
		};

		App.addInitializer(function(){
			new Module.Router({
				controller: API
			});
		});
	};
});