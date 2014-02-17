define(['marionette', 'backbone'], function(Marionette, Backbone) {
	return Marionette.ItemView.extend({
		events: {
			'click .btn-primary': '_submit',
			// don't let the form get submitted
			'submit form': function() { return false; }
		},
		_submit: function() {
			if (this.model.isValid(true)) {
				this.$('.btn-primary').button('loading');
				this.model.save([], {
					success: this._handleSaveSuccess.bind(this),
					error: this._handleSaveError.bind(this)
				});
			}
		},
		_handleSaveSuccess: function(model, xhr) {
			this.$('.alert-error-holder').empty();
			setTimeout(function() {
				this.$('.btn-primary').button('reset');
			}.bind(this), 2000);
		},
		_handleSaveError: function(model, xhr) {
			setTimeout(function() {
				this.$('.btn-primary').button('reset');
			}.bind(this), 2000);
			this.$('.alert-error-holder').html('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Error!</strong> '+(xhr.evt.description || 'There was a server error.')+'</div>');
		},
		onRender: function() {
			// always bind our view to our model
			this.rivets = window.__r.bind(this.$el, { model: this.model });
			Backbone.Validation.bind(this);

			// validate our model on change
			this.listenTo(this.model, 'change', function(){
				this.model.validate();
			}.bind(this));

			// enable our submit button when our model is valid
			this.listenTo(this.model, 'validated:valid', function() {
				this.$('.btn-primary').removeAttr('disabled');
			}.bind(this));

			// disabled our submit button when our model is invalid
			this.listenTo(this.model, 'validated:invalid', function() {
				var btn = this.$('.btn-primary');
				if (btn.attr('data-prevent-disable') !== 'true') {
					btn.attr('disabled', 'disabled');
				}
			}.bind(this));

			this.$('.btn').button();
		},
		onClose: function() {
			// always unbind our view
			this.rivets && this.rivets.unbind();
			Backbone.Validation.unbind(this);
		}
	});
})