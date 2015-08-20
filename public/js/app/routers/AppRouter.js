define(['marionette', 'controllers/mainController'], function(Marionette, mainController) {
   return Marionette.AppRouter.extend({
       //"index" must be a method in AppRouter's controller
       appRoutes: {
           "": "index"
       }
   });
});