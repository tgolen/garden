define(['underscore', 'backbone'], function(_, Backbone) {
	var originalAJAX = Backbone.ajax;

	Backbone.ajax = wrappedAJAX;

	function wrappedAJAX(options) {
		// Pass cross domain requests on to the original handler.
		if (options.url.indexOf('/') !== 0) {
			return originalAJAX.apply(Backbone, arguments);
		}

		var method = (options.type || 'GET').toLowerCase(),
			url = options.url.split('/api/v1/').pop(),
			data = options.data;

		if (options.dataType === 'json' && data && typeof data === 'string') {
			data = JSON.parse(data);
		}

		return api[method](url, data, undefined, function(evt) {
			var fakeXHR = { setRequestHeader: function() {} }
			if (evt.success) {
				options.success(evt.result, 'success', fakeXHR);
			} else {
				fakeXHR.evt = evt;
				options.error(fakeXHR, evt.description, evt);
			}
		});
	}

	function curryMethod(method) {
		return function(url, data, options, callback) {
			url = '/api/v1/' + url;

			if (_.isFunction(options)) {
				callback = options;
				options = undefined;
			}
			if (!options) {
				options = {};
			}
			if (_.isFunction(data)) {
				callback = data;
				data = undefined;
			}

			if (url.search('responseId=') > -1) {
				// grab our response Id
				var urlArray = url.split('responseId='),
					responseId = urlArray[1];
				subscribeToWindowMessage(responseId, callback);
				return;

			} else {

				var req = {
					type: method,
					url: url,
					data: data,
					headers: {}
				};
				if (!callback) {
					req.headers['use-bare-response'] = true;
				}
				var ajax = $.ajax(req);
				if (callback) {
					ajax.done(function(data) {
						callback(data);
					});
					ajax.fail(function(data) {
						data = data.responseText;
						try {
							data = JSON.parse(data);
						}
						catch (err) {}
						callback(data);
					});
				}
			}
		};
	}

	var api = {
		post: curryMethod('POST'),
		create: curryMethod('POST'),
		get: curryMethod('GET'),
		read: curryMethod('GET'),
		put: curryMethod('PUT'),
		update: curryMethod('PUT'),
		'delete': curryMethod('DELETE'),
		remove: curryMethod('DELETE')
	};
	return api;
});