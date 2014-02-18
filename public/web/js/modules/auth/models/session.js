define(['backbone'], function(Backbone) {
	return new (Backbone.Model.extend({
		url: '/api/v1/auth/session',
		idAttribute: '_id'
	}));
});