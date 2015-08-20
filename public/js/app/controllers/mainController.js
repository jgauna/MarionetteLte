define(['App', 'backbone', 'marionette', 'views/WelcomeView', 'views/HeaderView', 'views/SidebarView',
        'views/FooterView', 'models/metricsModel', 'models/candidatesModel', 'collections/candidatesCollection'
    ],
    function(App, Backbone, Marionette, WelcomeView, HeaderView, SidebarView, FooterView,
        MetricsModel, CandidatesModel, CandidatesCollection) {
        return Backbone.Marionette.Controller.extend({
            initialize: function(options) {
                App.rootLayout.headerRegion.show(new HeaderView());
                App.rootLayout.footerRegion.show(new FooterView());
            },
            //gets mapped to in AppRouter's appRoutes
            index: function() {
                var candidatesList = new CandidatesModel(),
                    self = this,
                    candidatesAll;
                App.rootLayout.mainRegion.show(new WelcomeView());
                candidatesList.fetch().then(function(candidate) {
                    candidatesAll = new CandidatesCollection(candidate);
                    var view = new SidebarView({
                        collection: candidatesAll
                    });

                    App.rootLayout.sidebarRegion.show(view);
                    view.on('sidebar:changeGraphicData', self.changeGraphicData);
                });
            },
            changeGraphicData: function(candidate) {
                var metricsList = new MetricsModel(),
                    metric,
                    series;
                metricsList.urlRoot = App.appConfig.metricsByCandidateURL + '{"candidate":"' + encodeURIComponent(candidate) + '"}&' + App.appConfig.apiKey;
                metricsList.fetch().then(function(metrics) {
                    metric = metrics[0];
                    series = Array.prototype.concat.apply([], [metric.byAge,
                        metric.bySex,
                        metric.byResidence,
                        metric.byEducational_level,
                        metric.byCountry_situtation
                    ]);
                    App.rootLayout.mainRegion.show(new WelcomeView({
                        collection: {
                            candidate: candidate,
                            series: series
                        }
                    }));
                });
            }
        });
    });