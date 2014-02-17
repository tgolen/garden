define(['backbone', 'backbone.validation'], function(Backbone) {
	Backbone.Validation.configure({
		forceUpdate: true
	});
	_.extend(Backbone.Validation.patterns, {
		alphanum: /^[0-9a-zA-Z]+$/
	});
	_.extend(Backbone.Validation.messages, {
		alphanum: '{0} contains invalid characters'
	});
	_.extend(Backbone.Validation.callbacks, {
		valid: function (view, attr, selector) {
			var $el = view.$('[name=' + attr + ']'), 
			$group = $el.closest('.form-group');

			$group.removeClass('has-error');
			$group.find('.help-block').html('').addClass('hidden');
		},
		invalid: function (view, attr, error, selector) {
			var $el = view.$('[name=' + attr + ']'), 
			$group = $el.closest('.form-group');

			$group.addClass('has-error');
			$group.find('.help-block').html(error).removeClass('hidden');
		}
	});
	return Backbone.Model.extend({

	});
});