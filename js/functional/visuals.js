// Highcharts.createElement('link', {
//     href: 'https://fonts.googleapis.com/css?family=Unica+One',
//     rel: 'stylesheet',
//     type: 'text/css'
// }, null, document.getElementsByTagName('head')[0]);
Highcharts.theme = {
    colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
        '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'
    ],
    chart: {
        backgroundColor: {
            linearGradient: {
                x1: 0,
                y1: 0,
                x2: 1,
                y2: 1
            },
            stops: [
                [0, '#2a2a2b'],
                [1, '#3e3e40']
            ]
        },
        style: {
            fontFamily: '\'Ubuntu\', sans-serif'
        },
        plotBorderColor: '#606063'
    },
    title: {
        style: {
            color: '#E0E0E3',
            textTransform: 'uppercase',
            fontSize: '20px'
        }
    },
    subtitle: {
        style: {
            color: '#E0E0E3',
            textTransform: 'uppercase'
        }
    },
    xAxis: {
        gridLineColor: '#707073',
        labels: {
            style: {
                color: '#E0E0E3'
            }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        title: {
            style: {
                color: '#A0A0A3'
            }
        }
    },
    yAxis: {
        gridLineColor: '#707073',
        labels: {
            style: {
                color: '#E0E0E3'
            }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        tickWidth: 1,
        title: {
            style: {
                color: '#A0A0A3'
            }
        }
    },
    tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        style: {
            color: '#F0F0F0'
        }
    },
    plotOptions: {
        series: {
            dataLabels: {
                color: '#F0F0F3',
                style: {
                    fontSize: '13px'
                }
            },
            marker: {
                lineColor: '#333'
            }
        },
        boxplot: {
            fillColor: '#505053'
        },
        candlestick: {
            lineColor: 'white'
        },
        errorbar: {
            color: 'white'
        }
    },
    legend: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        itemStyle: {
            color: '#E0E0E3'
        },
        itemHoverStyle: {
            color: '#FFF'
        },
        itemHiddenStyle: {
            color: '#606063'
        },
        title: {
            style: {
                color: '#C0C0C0'
            }
        }
    },
    credits: {
        style: {
            color: '#666'
        }
    },
    labels: {
        style: {
            color: '#707073'
        }
    },
    drilldown: {
        activeAxisLabelStyle: {
            color: '#F0F0F3'
        },
        activeDataLabelStyle: {
            color: '#F0F0F3'
        }
    },
    navigation: {
        buttonOptions: {
            symbolStroke: '#DDDDDD',
            theme: {
                fill: '#505053'
            }
        }
    },
    // scroll charts
    rangeSelector: {
        buttonTheme: {
            fill: '#505053',
            stroke: '#000000',
            style: {
                color: '#CCC'
            },
            states: {
                hover: {
                    fill: '#707073',
                    stroke: '#000000',
                    style: {
                        color: 'white'
                    }
                },
                select: {
                    fill: '#000003',
                    stroke: '#000000',
                    style: {
                        color: 'white'
                    }
                }
            }
        },
        inputBoxBorderColor: '#505053',
        inputStyle: {
            backgroundColor: '#333',
            color: 'silver'
        },
        labelStyle: {
            color: 'silver'
        }
    },
    navigator: {
        handles: {
            backgroundColor: '#666',
            borderColor: '#AAA'
        },
        outlineColor: '#CCC',
        maskFill: 'rgba(255,255,255,0.1)',
        series: {
            color: '#7798BF',
            lineColor: '#A6C7ED'
        },
        xAxis: {
            gridLineColor: '#505053'
        }
    },
    scrollbar: {
        barBackgroundColor: '#808083',
        barBorderColor: '#808083',
        buttonArrowColor: '#CCC',
        buttonBackgroundColor: '#606063',
        buttonBorderColor: '#606063',
        rifleColor: '#FFF',
        trackBackgroundColor: '#404043',
        trackBorderColor: '#404043'
    }
};
// Apply the theme
Highcharts.setOptions(Highcharts.theme);

function renderCharts(chartData, searchKeywords) {

    if (chartData.code == 200){

        if (chartData.viz_type == "bar") {
            var highChartObj = {
                chart: {
                    type: 'bar',
                    backgroundColor: 'rgba(0,0,0,0)'
                },
                title: {
                    text: chartData.title
                },
                xAxis: {
                    categories: chartData.data.categories,
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: chartData.xAxis,
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 80,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
                    shadow: true
                },
                credits: {
                    enabled: false
                },
                series: [{
                    data: chartData.data.data
                }]
            }
        }

        if (chartData.viz_type == "pie") {
            var highChartObj = {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie',
                    backgroundColor: 'rgba(0,0,0,0)'
                },
                title: {
                    text: searchKeywords
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: chartData.dataset_name,
                    colorByPoint: true,
                    data: chartData.data
                }]
            }
        }

        if (chartData.viz_type == "column") {

            var highChartObj = {
                chart: {
                    type: 'column',
                    backgroundColor: 'rgba(0,0,0,0)'
                },
                title: {
                    text: chartData.title
                },
                xAxis: {
                    categories: chartData.data.categories,
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: chartData.yAxis
                    }
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    data: chartData.data.data
                }]
            }
        }

        Highcharts.chart('viz-result', highChartObj);
    }
    // Build the chart
    // Highcharts.chart('viz-result', {
        // chart: {
        //     plotBackgroundColor: null,
        //     plotBorderWidth: null,
        //     plotShadow: false,
        //     type: 'pie',
        //     backgroundColor: 'rgba(0,0,0,0)'
        // },
        // title: {
        //     text: searchKeywords
        // },
        // tooltip: {
        //     pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        // },
        // plotOptions: {
        //     pie: {
        //         allowPointSelect: true,
        //         cursor: 'pointer',
        //         dataLabels: {
        //             enabled: false
        //         },
        //         showInLegend: true
        //     }
        // },
        // series: [{
        //     name: 'Brands',
        //     colorByPoint: true,
        //     data: [{
        //         name: 'Web',
        //         y: 3
        //     }, {
        //         name: 'iOS',
        //         y: 1
        //     }, {
        //         name: 'Android',
        //         y: 3
        //     }]
        // }]

    //     chart: {
    //         // backgroundColor: 'rgba(0,0,0,0)'
    //     },

    //     title: {
    //             text: searchKeywords
    //         },

    //         yAxis: {
    //             title: {
    //                 text: 'Number of Employees'
    //             }
    //         },

    //         xAxis: {
    //             type: 'datetime'
    //         },

    //         legend: {
    //             layout: 'vertical',
    //             align: 'right',
    //             verticalAlign: 'middle'
    //         },

    //         plotOptions: {
    //             series: {
    //                 label: {
    //                     connectorAllowed: false
    //                 },
    //                 pointStart: Date.UTC(2019, 9, 1),
    //                 pointIntervalUnit: 'month'
    //             }
    //         },

    //         series: [{
    //             name: 'Web',
    //             data: [10, 7, 5]
    //         }, {
    //             name: 'iOS',
    //             data: [3, 0, 1]
    //         }, {
    //             name: 'Android',
    //             data: [5, 7, 2]
    //         }],
    // });
}