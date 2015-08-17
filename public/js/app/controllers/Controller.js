define(['App', 'backbone', 'marionette', 'views/WelcomeView', 'views/HeaderView', 'views/SidebarView'],
    function (App, Backbone, Marionette, WelcomeView, HeaderView, SidebarView) {
    return Backbone.Marionette.Controller.extend({
        initialize:function (options) {
            App.rootLayout.headerRegion.show(new HeaderView());
            App.rootLayout.sidebarRegion.show(new SidebarView());
        },
        //gets mapped to in AppRouter's appRoutes
        index:function () {
            App.rootLayout.mainRegion.show(new WelcomeView());
        }
    });
});