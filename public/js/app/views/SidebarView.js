define(['App', 'marionette', 'models/metricsModel', 'text!templates/sidebar.html'],
	function(App, Marionette, Model, template) {
		return Marionette.ItemView.extend({
			candidates: '#candidates',
			activeLi: 'li.active',
			template: _.template(template),
			model: new Model({
				mobile: App.mobile
			}),
			onShow: function() {
				var candidate;
				this.collection.each(function(candidate, index) {
					candidate = candidate.get('candidate');
					if (!index) {
						$(this.candidates).append('<li class="active"><a href="#"><span class="label">' + candidate + '</span></a></li>')
					} else {
						$(this.candidates).append('<li><a href="#"><span class="label">' + candidate + '</span></a></li>')
					}
				}, this);
			},
			events: {
				'click .sidebar-menu li': function(ev) {
					var el = $(ev.currentTarget);
					$(this.activeLi).removeClass('active');
					el.addClass('active');
					this.trigger('sidebar:changeGraphicData', el.text());
				}
			}
		});
	});