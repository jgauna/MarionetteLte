define(['App', 'marionette', 'adminlte', 'models/metricsModel', 'text!templates/footer.html'],
	function(App, Marionette, adminlte, Model, template) {
		return Marionette.ItemView.extend({
			template: _.template(template),
			model: new Model({
				mobile: App.mobile
			})
		});
	});