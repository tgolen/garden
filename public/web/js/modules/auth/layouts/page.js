define([
	'marionette',
	'tpl!../templates/page.html'
], function(
	Marionette,
	Template
) {
	return Marionette.Layout.extend({
		template: Template,
		regions: {
			content: '#content'
		}
	});
});