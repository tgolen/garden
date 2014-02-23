define([
	'tpl!./templates/mix.html',
	'lib/model.validation',
	'lib/view.form',
], function(
	Template,
	ModelValidation,
	ViewForm
) {
	var ModelForm = new (ModelValidation.extend({
		validation: {
			height: {
				required: true,
				min: 0
			},
			width: {
				required: true,
				min: 0
			},
			length: {
				required: true,
				min: 0
			},
			qty: {
				required: true,
				min: 0
			},
		}
	}))();
	return ViewForm.extend({
		template: Template,
		model: ModelForm,
		events: _.extend(ViewForm.prototype.events, {
			'click .btn-primary': '_addBoxes',
		}),
		_addBoxes: function(e) {

		}
	});
});