define([
	'tpl!./templates/header.html',
	'lib/view.item.rivets',
	'backbone',
	'../auth/models/session'
], function(
	Template,
	ItemViewRivets,
	Backbone,
	Session
) {
	var navCollection = new Backbone.Collection([
			{
				text: '<i class="fa fa-home"></i> Home',
				url: '#',
				active: false
			},
			{
				text: 'Calculators',
				url: '#calculator',
				active: false
			}
		]);

	return ItemViewRivets.extend({
		template: Template,
		collection: navCollection,
		model: Session,
		onBeforeRender: function() {
			navCollection.each(function(model) {
				model.set('active', false);
			});
			// find our active nav model
			var activeModel = navCollection.find(function(model) {
				if (model.get('url') === window.location.hash
					|| (model.get('url') === '#' && window.location.hash === '')) {
					return true;
				}
				return false;
			});
			if (activeModel) {
				activeModel.set('active', true);
			}
		}
	});
});