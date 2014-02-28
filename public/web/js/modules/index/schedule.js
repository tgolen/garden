define([
	'lib/view.item.rivets',
	'tpl!./templates/schedule.html',
	'backbone'
], function(
	Base,
	Template,
	Backbone
) {
	var scheduleModel = new (Backbone.Model.extend({})),
		plantCollection = new (Backbone.Collection.extend({})),
		weekCollection = new (Backbone.Collection.extend({}));
	return Base.extend({
		template: Template,
		model: scheduleModel,
		collection: weekCollection,
		initialize: function() {
			this.options.collection = this.collection;
			this.options.model = this.model;
		},
		onRender: function() {
			Base.prototype.onRender.apply(this, arguments);
			_.defer(function() {
				this._populateCollectionWithWeeks()._populateCollectionWithPlants();
			}.bind(this));

		},
		_populateCollectionWithWeeks: function() {
			var weeks = [],
				date = __m().startOf('year');
			this.lastFrostDate = __m('04/30/2014', 'MM/DD/YYYY').subtract('w', 1);
			this.firstFrostDate = __m('10/04/2014', 'MM/DD/YYYY').add('w', 1)

			// make an array of all the weeks in this year
			for (var i = 0; i < 52; i++) {
				var weekDate = __m(date).add('w', i).weekday(6);
				weeks.push({
					date: weekDate,
					dateFormatted: weekDate.format('M<br />D'),
					week: weekDate.format('w'),
					growingSeason: (weekDate.isBefore(this.firstFrostDate) && weekDate.isAfter(this.lastFrostDate)),
					current: (weekDate.format('w') === __m().format('w')),
					beforeCurrent: weekDate.isBefore(__m())
				});
			};

			this.collection.reset(weeks);
			return this;
		},
		_populateCollectionWithPlants: function() {
			this.plants = [];

			this._addPlant('Lettuce (Romain)', 8, 4, 2, -3, 7, 2);
			this._addPlant('Spinach', 8, 4, 2, -3, 7, 2);
			this._addPlant('Swiss Chard', 4, 2, 4, -3, 7, 2);
			this._addPlant('Carrots', 16, 4, 2, -5, 10, 2);
			this._addPlant('Raddish', 16, 4, 2, -2, 3, 2, 2);
			this._addPlant('Onion', 16, 4, 2, -3, 8, 2);
			this._addPlant('Broccoli', 2, 2, 2, -3, 11, 2);
			this._addPlant('Cauliflower', 2, 2, 2, -3, 10, 2);
			this._addPlant('Sugar Peas', 16, 2, 4, -3, 11, 4);

			this.model.set('plants', new Backbone.Collection(this.plants));
		},
		_addPlant: function(name, numOfPlants, numOfPlantings, weeksBetweenPlantings, plantWeeksFromLastFrost, growLength, harvestLength, repeat, repeatAfter) {
			if (!name || !numOfPlantings || !plantWeeksFromLastFrost || !growLength || !harvestLength) {
				return this;
			}
			if (repeat === undefined) {
				repeat = 1;
			}
			if (repeatAfter === undefined) {
				repeatAfter = growLength + harvestLength;
			}
			for (var i = 0; i < numOfPlantings; i++) {
				var weeks = new Backbone.Collection(this.collection.toJSON());

				for (var j = 0; j < repeat; j++) {
					// find the week that we will be planting
					var startWeek = __m(this.lastFrostDate).add('w', i * ( (i !== 0)?weeksBetweenPlantings:1 ) + (j * repeatAfter)),
						plantingWeek = __m(startWeek).add('w', plantWeeksFromLastFrost),
						lastGrowthWeek = __m(plantingWeek).add('w', growLength),
						lastHarvestWeek = __m(lastGrowthWeek).add('w', harvestLength);
					weeks.each(function(week) {
						if (+week.get('week') === +plantingWeek.format('w')) {
							week.set('planting', true);
							week.set('numOfPlants', Math.ceil(numOfPlants / numOfPlantings))
						}
						if (+week.get('week') > +plantingWeek.format('w') && +week.get('week') < +lastGrowthWeek.format('w')) {
							week.set('growing', true);
						}
						if (+week.get('week') >= +lastGrowthWeek.format('w') && +week.get('week') < +lastHarvestWeek.format('w')) {
							week.set('harvesting', true);
						}
					});
				};

				this.plants.push({
					name: name,
					weeks: weeks
				});
			};
		}
	});
});