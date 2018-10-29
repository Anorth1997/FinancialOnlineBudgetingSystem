let ctx = $("#pie");
data = {
    datasets: [{
        data: [10, 20, 30],
        backgroundColor: [
            'rgba(255, 0, 0, 0.5)',
            'rgba(0, 255, 0, 0.5)',
            'rgba(0, 0, 255, 0.5)'
        ]
    }],
 

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'Red',
        'Yellow',
        'Blue'
    ]
};

options = {responsive: false};


// For a pie chart
var myPieChart = new Chart(ctx,{
    type: 'pie',
    data: data,
    options: options
});