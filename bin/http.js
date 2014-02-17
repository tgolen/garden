var express = require('express'),
	routeIndex = require('routes.http/index'),
	app = express(),
	apiServer = require('./api');

app.use(express.logger('dev'));
app.use(express.compress());
app.use(express.methodOverride());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.cookieParser('shhh dont tell anyone my secret'));
app.use(express.static(__dirname + '../../public/web'));

app.get('/', routeIndex);
app.get('/index.htm', routeIndex);
app.get('/index.html', routeIndex);

// initialize our API server
apiServer.init(app)

module.exports = {
	init: function(cb) {
		app.listen(3000);
		console.log('Listening on port 3000');
		cb && cb();
	}
};