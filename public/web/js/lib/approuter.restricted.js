define(['marionette'], function(Marionette) {
	var restrictions = {
		'user': function(cb) {
			// see if a user exists
			// if they exist, then we call our callback
			// if they don't exist, send them to the sign in
			window.location.hash = 'signin';
		}
	};
	return Marionette.AppRouter.extend({
		_addAppRoute: function(controller, route, methodName){
			var method = controller[methodName];

			if (!method) {
				throw new Error("Method '" + methodName + "' was not found on the controller");
			}

			if (controller.restrictions && controller.restrictions.length) {
				var done = _.after(controller.restrictions.length, function() {
					this.route(route, methodName, _.bind(method, controller));
				}.bind(this));
				_.each(controller.restrictions, function(restriction) {
					if (restrictions[restriction]) {
						restrictions[restriction](done);
					}
				});
			} else {
				this.route(route, methodName, _.bind(method, controller));
			}
		}
	});
});