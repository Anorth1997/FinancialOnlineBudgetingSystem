// pie chart
let pieCanvas = $("#pie");
const pieDatasets = {
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


// stacked bar chart
let barCanvas = $("#bar");

// labels for the x axis
// const barLabels = ["IT Department (expected)", "IT Department (actual)", "Marketing Department (expected)", "Marketing Department (actual)"];
const barLabels = ['IT Department', 'Marketing Department'];

// data:[1000, 0, 0, 0] means a bar of height 1000 for the first label, 
// and bars of height 0 for the other labels
const barData = [{
        label: "Expected expenses",
        type: "bar",
        stack: "Expected",
        backgroundColor: "#22aa99",
        data: [1000, 1250],
    }, {
        label: "Repairs and improvements",
        type: "bar",
        stack: "Actual",
        backgroundColor: "#dd4477",
        data: [200, 0],
    }, {
        label: 'Software',
        data: [450, 0],
        stack: "Actual",
        backgroundColor: '#0099c6'
    }, {
        label: 'Advertisements',
        data: [0, 600],
        stack: "Actual",
        backgroundColor: '#dd4477'
    }, {
        label: 'Market Research',
        data: [0, 750],
        stack: "Actual",
        backgroundColor: '#0099c6'
    }, {
        label: 'Events',
        data: [0, 200],
        stack: "Actual",
        backgroundColor: '#0099c6'
    }
];

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