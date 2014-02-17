var _ = require('underscore'),
	MongoClient = require('mongodb').MongoClient,
	db = null;

function connect(cb) {
	if (db) {
		return cb && cb();
	}
	MongoClient.connect('mongodb://127.0.0.1/garden', function(err, dbInstance) {
		if (err) throw err;
		db = dbInstance;
		console.log('Connected to database');
		cb && cb();
	});
}

module.exports = {
	init: function(cb) {
		connect(cb);
	},
	getDb: function(cb) {
		return connect(function() {
			cb(db);
		});
	}
};