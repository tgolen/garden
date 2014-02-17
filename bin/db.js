var MongoClient = require('mongodb').MongoClient,
	db = null;

module.exports = {
	init: function(cb) {
		MongoClient.connect('mongodb://127.0.0.1/garden', function(err, db) {
			if (err) throw err;

			db = db;
			console.log('Connected to database');
			cb && cb();
		});
	}
};