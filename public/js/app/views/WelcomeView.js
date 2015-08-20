define(['App', 'marionette', 'models/metricsModel', 'text!templates/welcome.html'],
    function(App, Marionette, metricsModel, template) {
        return Marionette.ItemView.extend({
            container: '#container',
            template: _.template(template),
            model: new metricsModel(),
            onShow: function(eventName) {
                var self = this;
                if (this.collection) {
                    $(this.container).highcharts({
                        chart: {
                            renderTo: "container",
                            type: "column",
                            borderWidth: 5,
                            borderColor: '#e8eaeb',
                            borderRadius: 0,
                            backgroundColor: '#f7f7f7'
                        },
                        title: {
                            text: 'Tendencias Políticas Según Contexto'
                        },
                        xAxis: {
                            categories: [{
                                name: "Segín La Edad",
                                categories: ["18-29", "30-49", ">50"]
                            }, {
                                name: "Según El Sexo",
                                categories: ["Masculino", "Femenino"]
                            }, {
                                name: "Segun Zona De Residencia",
                                categories: ["Capital", "GBA", "Interior"]
                            }, {
                                name: "Según Nivel Educativo",
                                categories: ["Primario", "Secundario", "Universitario"]
                            }, {
                                name: "Según La Situación Del País",
                                categories: ["Positivo", "Regular", "Negativo"]
                            }]
                        },
                        yAxis: {
                            min: 0,
                            max: 100,
                            title: {
                                text: 'Porcentaje'
                            },
                            stackLabels: {
                                enabled: false,
                                style: {
                                    fontWeight: 'bold',
                                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                                }
                            }
                        },
                        legend: {
                            align: 'right',
                            x: -30,
                            verticalAlign: 'top',
                            y: 25,
                            floating: true,
                            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                            borderColor: '#CCC',
                            borderWidth: 1,
                            shadow: false
                        },
                        tooltip: {
                            formatter: function() {
                                return '<b>' + this.x + '</b><br/>' + self.collection.candidate + '<br/>' + 'Total: ' + this.point.stackTotal;
                            }
                        },
                        plotOptions: {
                            column: {
                                stacking: 'normal',
                                dataLabels: {
                                    enabled: true,
                                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                                    style: {
                                        textShadow: '0 0 3px black'
                                    }
                                }
                            }
                        },
                        series: [{
                            name: self.collection.candidate,
                            data: self.collection.series
                        }]
                    });
                }
                return this;
            }
        });
    });