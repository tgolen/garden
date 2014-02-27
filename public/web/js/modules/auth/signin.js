define([
	'tpl!./templates/signin.html',
	'lib/model.validation',
	'lib/view.form',
], function(
	Template,
	ModelValidation,
	ViewForm
) {
	var ModelForm = new (ModelValidation.extend({
		validation: {
			username: {
				required: true,
				minLength: 4,
				pattern: 'alphanum'
			},
			password: {
				required: true,
				minLength: 4
			}
		}
	}))();
	return ViewForm.extend({
		template: Template,
		model: ModelForm,
		events: _.extend({}, ViewForm.prototype.events, {
			'click .btn-primary': '_submitSignin',
			'click .btn-secondary': '_submitRegistration'
		}),
		_submitRegistration: function(e) {
			this.model.url = '/api/v1/auth/register';
			this._submit(e);
		},
		_submitSignin: function(e) {
			console.log('test');
			this.model.url = '/api/v1/auth/signin';
			this._submit(e);
		},
		onRender: function () {
			ViewForm.prototype.onRender.bind(this)();
			// this will deal with autocompleted values
			setTimeout(function() {
				if (this.$('[name="username"]').val() != '') {
					this.model.set('username', this.$('[name="username"]').val());
				}
				if (this.$('[name="password"]').val() != '') {
					this.model.set('password', this.$('[name="password"]').val());
				}
			}.bind(this), 250);
		},
		onSave: function() {
			window.location.reload(true);
		}
	});
});