var express = require('express'),
	swagger = require('swagger-node-express'),
	fs = require('fs'),
	path = require('path'),
	pathToResources = path.join(__dirname, 'node_modules', 'routes.api');

module.exports = {
	init: function(app) {
		var API = express();
		app.use('/api/v1', API);
		swagger.setAppHandler(API);

		addResources(swagger);
		swagger.setHeaders = function setHeaders(res) {
			res.header('Content-Type', 'application/json; charset=utf-8');
		};

		swagger.configureSwaggerPaths('', '/api-docs', '');
	}
};

function addResources(swagger) {
	fs.readdirSync(pathToResources).forEach(function (dir) {
		var fullpath = path.join(pathToResources, dir),
			indexFile = path.join(fullpath, '_resources.js');

		if (fs.lstatSync(fullpath).isDirectory() && fs.existsSync(indexFile)) {
			require(indexFile).addResources(swagger);
		}
	});
}