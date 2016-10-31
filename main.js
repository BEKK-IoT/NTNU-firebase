$(function () {
  var Highcharts = window.Highcharts
  var Firebase = window.firebase
  var Particle = window.Particle
  var particle = new Particle();

  //ENTER CODE FROM GIST: https://goo.gl/HwtJud UNDER HERE!!


  // ALL THE CODE UNDER HERE IS JUST SETUP FOR highcharts: http://www.highcharts.com/
  // REMOVE IF YOU DONT WANT TO USE IT!

  var gaugeOptions = {

      chart: {
          type: 'solidgauge'
      },

      title: null,

      pane: {
          center: ['50%', '85%'],
          size: '140%',
          startAngle: -90,
          endAngle: 90,
          background: {
              backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
              innerRadius: '60%',
              outerRadius: '100%',
              shape: 'arc'
          }
      },

      tooltip: {
          enabled: false
      },

      // the value axis
      yAxis: {
          stops: [
              [0.1, '#55BF3B'], // green
              [0.5, '#DDDF0D'], // yellow
              [0.9, '#DF5353'] // red
          ],
          lineWidth: 0,
          minorTickInterval: null,
          tickAmount: 2,
          title: {
              y: -70
          },
          labels: {
              y: 16
          }
      },

      plotOptions: {
          solidgauge: {
              dataLabels: {
                  y: 5,
                  borderWidth: 0,
                  useHTML: true
              }
          }
      }
  };
  $('#content').highcharts(Highcharts.merge(gaugeOptions, {
      yAxis: {
          min: 0,
          max: 1500,
          title: {
              text: 'Watervalue from Particle'
          }
      },

      credits: {
          enabled: false
      },

      series: [{
          name: 'Watervalue',
          data: [80],
          dataLabels: {
              format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                  ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                     '<span style="font-size:12px;color:silver">Particle</span></div>'
          },
          tooltip: {
              valueSuffix: 'Particle cloud'
          }
      }]

  }));
  $('#content2').highcharts(Highcharts.merge(gaugeOptions, {
      yAxis: {
          min: 0,
          max: 1500,
          title: {
              text: 'Watervalue from Firebase'
          }
      },

      credits: {
          enabled: false
      },

      series: [{
          name: 'Watervalue',
          data: [80],
          dataLabels: {
              format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                  ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                     '<span style="font-size:12px;color:silver">Firebase</span></div>'
          },
          tooltip: {
              valueSuffix: 'Firebase'
          }
      }]

  }));
})
