/**
 * all of our adapters
 */
define(['rivets'], function(rivets) {
	/**
	 * this is an adapater for backbone models
	 */
	rivets.adapters[':'] = {
		subscribe: function(obj, keypath, callback) {
			obj.on('change:' + keypath, callback)
		},
		unsubscribe: function(obj, keypath, callback) {
			obj.off('change:' + keypath, callback)
		},
		read: function(obj, keypath) {
			return obj.get(keypath)
		},
		publish: function(obj, keypath, value) {
			obj.set(keypath, value)
		}
	};

	/**
	 * this is an adapter for backbone collections
	 * example usage:
	 * rv-each-row="rows>models"
	 */
	rivets.adapters['>'] = {
		subscribe: function(obj, keypath, callback) {
			obj.on('add remove reset sync', callback)
		},
		unsubscribe: function(obj, keypath, callback) {
			obj.off('add remove reset sync', callback)
		},
		read: function(obj, keypath) {
			return obj[keypath];
		},
		publish: function(obj, keypath, value) {
			obj[keypath] = value;
		}
	};
	return rivets;
});