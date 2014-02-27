define([
	'marionette',
	'tpl!./templates/mix.empty.html'
], function (
	Marionette,
	Template
) {
	return Marionette.ItemView.extend({
		template: Template,
		tagName: 'tr'
	});
});