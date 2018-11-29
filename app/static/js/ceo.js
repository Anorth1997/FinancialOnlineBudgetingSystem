function displayAllDepartmentHistory(html) {
    const initTable = '<table align="left"><tr>' +
      '<th>Department</th>' +
      '<th>Purpose</th>' +
      '<th>Date</th>' +
      '<th>Amount</th>' +
      '</tr>'+
      '</table>';

    let table = $(initTable);
    const expenses = html.expenses;

    // Keep track of total so that we can display it on the last row
    let total = 0;

    // For each expense, create a new row in the table
    for (let i = 0; i < expenses.length; i++) {
        const currExpense = expenses[i];
        let row = $('<tr></tr>');
        $(row).append('<td>' + currExpense.department + '</td>');
        $(row).append('<td>' + currExpense.purpose + '</td>');
        $(row).append('<td>' + currExpense.date.slice(0, -4) + '</td>');
        $(row).append('<td>$' + currExpense.amount + '</td>');
        $(table).append(row);
        total += currExpense.amount;
    }

    // Create the last row that displays the total
    $(table).append('<tr><td>Total</td><td></td><td></td><td>$' + total.toString() + '</td></tr>');

    $('.department-history-table').append(table);
}

function getRequests() {
    var requests = data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        $('.content-review-financial-request').append(data[i].Department, data[i].Amount, data[i].Comment);
    }
}

function fadeAllCeo(callBack) {
    if ($('.content-initial').css('display').toLowerCase() != 'none') {
        $('.content-initial').fadeOut(callBack);
    } else if ($('.content-create-department').css('display').toLowerCase() != 'none') {
        $('.content-create-department').fadeOut(callBack);
    } else if ($('.content-set-total-revenue').css('display').toLowerCase() != 'none') {
        $('.content-set-total-revenue').fadeOut(callBack);
    } else if ($('.content-review-financial-request').css('display').toLowerCase() != 'none') {
        $('.content-review-financial-request').fadeOut(callBack);
    } else if ($('.content-view-department-history').css('display').toLowerCase() != 'none') {
        $('.content-view-department-history').fadeOut(callBack);
    }
}

function graphButtonClicked() {
    $('.graph-button').fadeIn();
    fadeAllCeo(showInitialContent);
}

function createDptClicked() {
    $('.graph-button').fadeIn();
    fadeAllCeo(showCreateDepartmentContent);
}

function setTotalRevenueClicked() {
    $('.graph-button').fadeIn();
    fadeAllCeo(showSetTotalRevenue);
}

function reviewFDRequestsClicked() {
    $('.graph-button').fadeIn();
    fadeAllCeo(showReviewFDRequest);
    getRequests();
}

function viewAllDepartmentHistoryClicked() {
    $('.graph-button').fadeIn();
    fadeAllCeo(showViewAllDeptHistory);

    $.ajax({
        url: "http://127.0.0.1:5000/expenses/full_history",
        cache: false,
        success: function(html){
            displayAllDepartmentHistory(html);
        }
    });
}

function showCreateDepartmentContent(callback) {
    $('.content-create-department').fadeIn(callback);
    fadeInGraphButton();
}

function showSetTotalRevenue(callback) {
    $('.content-set-total-revenue').fadeIn(callback);
    fadeInGraphButton();
}

function showReviewFDRequest(callback) {
    $('.content-review-financial-request').fadeIn(callback);
    fadeInGraphButton();
}

function showViewAllDeptHistory(callback) {
    $('.content-view-department-history').fadeIn(callback);
    fadeInGraphButton();


}

var enforeMutualExcludedCheckBox = function(group){
    return function() {
      var isChecked= $(this).prop("checked");
      $(group).prop("checked", false);
      $(this).prop("checked", isChecked);
    }
};

$(".exclusive").click(enforeMutualExcludedCheckBox(".exclusive"));
