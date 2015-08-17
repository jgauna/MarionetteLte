define(['App', 'marionette', 'adminlte', 'models/Model', 'text!templates/footer.html'],
	function(App, Marionette, adminlte, Model, template) {
		//ItemView provides some default rendering logic
		return Marionette.ItemView.extend({
			//Template HTML string
			template: _.template(template),
			model: new Model({
				mobile: App.mobile
			}),

			// View Event Handlers
			events: {

			}
		});
	});