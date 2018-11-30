$.ajax({
    url: appUrl + "/expenses/overview",
    cache: false,
    success: function(html){
        console.log(html);
        generateBarGraph(html);
        generatePieGraph(html);
        totalRevenueGoal = html.total_revenue_goal;
        $('#total-revenue').text('Total Revenue: $' + totalRevenueGoal.toString());
    }
});



function generatePieGraph(html) {

    const departments = html.departments;

    
    // pie chart
    let pieCanvas = $("#pie");

    let pieData = [];
    let pieLabels = [];
    let pieColours = [];
    
    for (let i = 0; i < departments.length; i++) {
        pieData.push(departments[i].revenue_goal);
        pieLabels.push(departments[i].role);

        const randomColour = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        pieColours.push(randomColour);
    }

    const pieDatasets = {
        datasets: [{
            data: pieData,
            backgroundColor: pieColours
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: pieLabels
    };

    const pieOptions = {
        responsive: false,
        legend: {
            position: 'bottom', // place legend on the right side of chart,
            labels: {
                fontColor: 'white'
            }
        },
        elements: {
            arc: {
                borderWidth: 0 // remove white border around pie chart
            }
        }
    };

    let myPieChart = new Chart(pieCanvas,{
        type: 'pie',
        data: pieDatasets,
        options: pieOptions
    });
}

function generateBarGraph(html) {
    // stacked bar chart
    let barCanvas = $("#bar");

    // labels for the x axis
    // const barLabels = ["IT Department (expected)", "IT Department (actual)", "Marketing Department (expected)", "Marketing Department (actual)"];
    let barLabels = [];
    let barData = [];
    let expectedExpenses = [];
    const departments = html.departments;
    
    if (departments.length > 0) {
        
        // gather department names and expected expenses
        for (let i = 0; i < departments.length; i++) {
            barLabels.push(departments[i].role);
            expectedExpenses.push(departments[i].budget);
        }

        barData.push({
            label: "Expected expenses",
            type: "bar",
            stack: "Expected",
            backgroundColor: "#22aa99",
            data: expectedExpenses
        })
    }

    // gather data for the expenses

    // object of name of expense to data array
    // ex. {'Advertising': [100, 0, 0]}
    // This means that the first department spent 100
    // on advertising, while the second and third
    // department spent 0 on advertising

    let expenseToData = {};

    for (let i = 0; i < departments.length; i++) {
        let itemsForCurrDep = departments[i].items;

        for (let j = 0; j < itemsForCurrDep.length; j++) {
            let currItem = itemsForCurrDep[j];
            let purpose = currItem.purpose;
            if (!(purpose in expenseToData)) {
                expenseToData[purpose] = Array(departments.length).fill(0);
            }
            expenseToData[purpose][i] = currItem.amount;
        }
    }

    // Create the rest of the bar data
    const keys = Object.keys(expenseToData)
    for (const key of keys) {
        let expenseBarData = {type: "bar", stack: "Actual"};
        expenseBarData.label = key;
        expenseBarData.data = expenseToData[key]
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