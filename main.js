$(function () {
  var Highcharts = window.Highcharts
  var Firebase = window.firebase
  var Particle = window.Particle
  var particle = new Particle();

  var config = {
    apiKey: "AIzaSyAFkVI4Agc6zDsbqRL8XNCuHfQCDWJfWdo",
    authDomain: "ntnuplant.firebaseapp.com",
    databaseURL: "https://ntnuplant.firebaseio.com",
    storageBucket: "ntnuplant.appspot.com",
    messagingSenderId: "1023106899913"
  };
  var firebaseApp = Firebase.initializeApp(config);

  firebaseApp.database().ref("/watervalue").on('value', function(snapshot) {
    var chart = $('#content2').highcharts();
    if(chart) {
        point = chart.series[0].points[0];
        point.update(parseInt(snapshot.val()));
      }
  });

  particle.login({username: 'snorre.edwin@gmail.com', password: 'testNTNU'}).then(
    function(authData){
      token = authData.body.access_token
      var chart = $('#content').highcharts();
      if(chart) {
          particle.getEventStream({ deviceId: "53ff72065075535120251687", name:"plantdataDirect", auth: token}).then(function(stream) {
            stream.on('event', function(eventData) {
              var value = eventData.data
              point = chart.series[0].points[0];
              point.update(parseInt(value));
            });
          });
        }
    },
    function(err) {
      console.log('API call completed on promise fail: ', err);
    }
  );

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
