$.ajax({
    url: "http://127.0.0.1:5000/expenses/department",
    cache: false,
    success: function(html){
        generateBarGraph(html);
    }
});

function generateBarGraph(html) {
    let barCanvas = $("#bar");

    const barLabels = [html.departmentName];

    let barData = [];
    let items = html.items;

    if (items.length > 0) {
        barData.push({
            label: "Expected expenses",
            type: "bar",
            stack: "Expected",
            backgroundColor: "#22aa99",
            data: [html.budget]
        });
    }



    for (let i = 0; i < items.length; i++) {
        let expenseBarData = {type: "bar", stack: "Actual"};
        expenseBarData.label = items[i].purpose;
        expenseBarData.data = [items[i].amount];

        const randomColour = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        expenseBarData.backgroundColor = randomColour;
        barData.push(expenseBarData);
    } 

    const barDatasets = {
        labels: barLabels,
        datasets: barData
    };

    const barOptions = {
        legend: {
            position: 'bottom', // place legend on the right side of chart,
            labels: {
                fontColor: 'white'
            }
        },
        scales: {
            xAxes: [{
                stacked: true, // this should be set to make the bars stacked
                ticks: {
                    fontColor: "white",
                    beginAtZero: true,
                    maxRotation: 0,
                    minRotation: 0
                }
            }],
            yAxes: [{
                stacked: true,
                ticks: {
                    fontColor: "white",
                }
            }]
        }
    };
    
    
    const stackedBar = new Chart(barCanvas, {
        type: 'bar',
        data: barDatasets,
        options: barOptions
    });

}