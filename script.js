    google.charts.load('current', {'packages':['gantt']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var queryString = encodeURIComponent('SELECT A, B, C, D, E, F, G, H');
      var query = new google.visualization.Query(SpreadsheetURL + queryString);
      query.send(handleQueryResponse);
    }

    function handleQueryResponse(response) {
      if (response.isError()) {
        alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }
      
    var otherData = response.getDataTable();

    var ganttData = new google.visualization.DataTable({cols: [
      {type: 'string', label: 'Task Id'},
      {type: 'string', label: 'Task Name'},
      {type: 'string', label: 'Class (Resource)'},
      {type: 'date', label: 'Start'},
      {type: 'date', label: 'End'},
      {type: 'number', label: 'Duration'},
      {type: 'number', label: '% Complete'},
      {type: 'string', label: 'Dependencies'}
    ]});

    for (var i = 0; i < otherData.getNumberOfRows(); i++) {
      ganttData.addRow([
        otherData.getValue(i, 0),
        otherData.getValue(i, 1),
        otherData.getValue(i, 2),
        otherData.getValue(i, 3),
        otherData.getValue(i, 4),
        otherData.getValue(i, 5),
        parseFloat(otherData.getValue(i, 6)),
        otherData.getValue(i, 7)
      ]);
    }

    var options = {
      height: 1500,
      gantt: {
        trackHeight: 30,
        criticalPathEnabled: false,
        innerGridHorizLine: {
          stroke: '#fff',
          strokeWidth: 2
        },
        innerGridTrack: {fill: '#fdfdfe'},
        innerGridDarkTrack: {fill: '#f0f7fa'},
      }
    };

    var chart = new google.visualization.Gantt(document.getElementById('chart_div'));

    chart.draw(ganttData, options);
    }