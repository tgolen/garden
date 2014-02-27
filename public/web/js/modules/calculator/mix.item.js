define([
	'marionette',
	'tpl!./templates/mix.item.html'
], function (
	Marionette,
	Template
) {
	return Marionette.ItemView.extend({
		template: Template,
		tagName: 'tr',
		events: {
			'click .btn-delete': '_removeModel'
		},
		_removeModel: function() {
			this.model.destroy();
		}
	});
});