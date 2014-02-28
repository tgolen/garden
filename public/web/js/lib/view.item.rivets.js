define(['marionette'], function(Marionette) {
	return Marionette.ItemView.extend({
		onRender: function() {
			// always bind our view to our model
			this.rivets = window.__r.bind(this.$el, {
				model: this.model,
				collection: this.collection
			});
		},
		onClose: function() {
			// always unbind our view
			this.rivets && this.rivets.unbind();
		}
	});
})