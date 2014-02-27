define([
	'tpl!./templates/mix.html',
	'lib/model.validation',
	'lib/view.form',
	'./mix.collection',
	'backbone',
	'marionette'
], function(
	Template,
	ModelValidation,
	ViewForm,
	ViewCollection,
	Backbone,
	Marionette
) {
	var ModelForm = new (ModelValidation.extend({
			defaults: {
				qty: 1
			},
			validation: {
				height: {
					required: true,
					fn: 'floatMin'
				},
				width: {
					required: true,
					fn: 'floatMin'
				},
				length: {
					required: true,
					fn: 'floatMin'
				}
			},
			floatMin: function(val) {
				if (parseFloat(val) < 0) {
					return 'must be greater than 0';
				}
			}
		}))(),
		boxCollection = Backbone.Collection.extend({
			getTotalCuFt: function() {
				var result = 0;
				this.each(function(model) {
					result += +model.get('height') *
						+model.get('length') *
						+model.get('width') *
						+model.get('qty');
				});
				return result;
			}
		});
	return ViewForm.extend({
		template: Template,
		model: ModelForm,
		events: _.extend(ViewForm.prototype.events, {
			'click .btn-primary': '_submit'
		}),
		initialize: function() {
			this.collection = new boxCollection();
			this.listenTo(this.collection, 'add', this.calculateTotals);
			this.listenTo(this.collection, 'reset', this.calculateTotals);
			this.listenTo(this.collection, 'remove', this.calculateTotals);
		},
		_bind: function() {
			this.rivets = window.__r.bind(this.$el, {
				model: this.model,
				collection: this.collection
			});
			Backbone.Validation.bind(this);
		},
		_submit: function(e) {
			if (this.model.isValid(true)) {
				this.$(e.currentTarget).button('loading');
				this._handleSaveSuccess(this.model);
			}
		},
		onRender: function() {
			window.GardenApp.addRegions({
				mixCollection: this.$('#region-mix-collection')
			});
			window.GardenApp.getRegion('mixCollection').show(new ViewCollection({
				collection: this.collection,
				el: this.$('#region-mix-collection')
			}));
			ViewForm.prototype.onRender.apply(this, arguments);
		},
		onSave: function(model) {
			this.collection.add(model.toJSON());
		},
		calculateTotals: function() {
			var totalCuFt = this.collection.getTotalCuFt(),
				oneThird = Math.ceil(totalCuFt / 3);
			this.$('.bind-total-cuft').text(totalCuFt);
			this.$('.bind-peat-cuft, .bind-verm-cuft, .bind-comp-cuft').text(oneThird);
			this.$('.bind-peat-cuft-full').text(Math.ceil(oneThird / 8));
			this.$('.bind-peat-cuft-half').text(Math.ceil(oneThird / 4));
			this.$('.bind-verm-cuft-full').text(Math.ceil(oneThird / 4));
		},
		onClose: function() {
			window.GardenApp.getRegion('mixCollection').close();
			ViewForm.prototype.onRender.apply(this, arguments);
		}
	});
});