/**
 * custom binders
 */
define(['rivets'], function(rivets) {
	/**
	 * sets the of an element to an percentage
	 *
	 * @author Tim Golen 2013-11-26
	 *
	 * @param  {object} el
	 * @param  {number} val from the model
	 *
	 * @return {void}
	 */
	rivets.binders.percentwidth = function(el, val) {
		el.style.width = +val.toString()+'%';
	};

	/**
	 * sets the elements visibility
	 * depending on the value passed in
	 *
	 * @author Tim Golen 2013-12-06
	 *
	 * @param  {object} el
	 * @param  {mixed} val
	 *
	 * @return {void}
	 */
	rivets.binders.hidden = function(el, val) {
		if (val) {
			$(el).show();
		} else {
			$(el).hide();
			// set all input values to none
			$(el).find('input').val(null).trigger('change');
		}
	};

	/**
	 * allows you to log something to the console from the template
	 * good for debugging
	 *
	 * @author Tim Golen 2014-01-14
	 *
	 * @param  {object} el
	 * @param  {mixed} val
	 *
	 * @return {void}
	 */
	rivets.binders.log = function(el, val) {
		__l(val);
	};

	/**
	 * this will fire a model change on key up rather than just on
	 * blur or change
	 */
	rivets.binders.liveinput = {
		publishes: true,
		bind: function(el) {
			rivets._.Util.bindEvent(el, 'change', this.publish);
			rivets._.Util.bindEvent(el, 'keyup', this.publish);
		},
		unbind: function(el) {
			rivets._.Util.unbindEvent(el, 'change', this.publish);
			rivets._.Util.unbindEvent(el, 'keyup', this.publish);
		},
		routine: rivets.binders.value.routine
	};
	return rivets;
});