var httpServer = require('./http'),
	dbServer = require('./db');

dbServer.init(httpServer.init);