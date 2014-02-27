define([
	'marionette',
	'./mix.item',
	'./mix.empty',
], function (
	Marionette,
	ViewItem,
	ViewEmpty
) {
	return Marionette.CollectionView.extend({
		itemView: ViewItem,
		emptyView: ViewEmpty
	});
});