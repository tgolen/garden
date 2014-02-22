define(['marionette', 'modules/auth/models/session'], function(Marionette, Session) {
	var restrictions = {
		// requires a logged in user
		'user': function(cb) {
			Session.fetch({
				success: function() {
					if (Session.id) {
						return cb();
					}
					// see if a user exists
					// if they exist, then we call our callback
					// if they don't exist, send them to the sign in
					window.location.hash = 'signin';
				}.bind(this),
				error: function() {
					console.log('Session could not be loaded');
				}.bind(this)
			});
		},
		// requires a non logged in user
		'nouser': function(cb) {
			Session.fetch({
				success: function() {
					if (!Session.id) {
						return cb();
					}
					// send them to the home page if they are already logged
					// in and trying to access this controller
					window.location.hash = '';
				}.bind(this),
				error: function() {
					console.log('Session could not be loaded');
				}.bind(this)
			});
		}
	};
	var router = Marionette.AppRouter.extend({
		_addAppRoute: function(controller, route, methodName){
			var method = controller[methodName];

			if (!method) {
				throw new Error("Method '" + methodName + "' was not found on the controller");
			}

			this.route(route, methodName, _.bind(method, controller), controller);
		},
		route: function(route, name, callback, controller) {
			if (!callback) callback = this[name];
			// wrap every method in a function that will perform
			// our async authorization check
			var f = function() {
				var self = this,
					args = arguments;
				this.authorized(controller, function() {
					callback.apply(self, args);
				});
			};
			return Marionette.AppRouter.prototype.route.call(this, route, name, f);
		},
		authorized: function(controller, cb) {
			// look for restrictions and test each one
			// the cb() only gets called if all the restrictions have
			// passed. The restrictions itself should determine what to do
			// if the restriction doesn't pass.
			if (controller && controller.restrictions && controller.restrictions.length) {
				var done = _.after(controller.restrictions.length, function() {
					cb();
				}.bind(this));
				_.each(controller.restrictions, function(restriction) {
					if (restrictions[restriction]) {
						restrictions[restriction](done);
					} else {
						throw new Error('There is no method for restricting: '+restriction);
					}
				}.bind(this));
			} else {
				cb();
			}
		}
	});
	return router;
});