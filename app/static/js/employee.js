function displayAllDepartmentHistory(html) {
    const initTable = '<table class="history-table" align="left"><tr class="history-tr">' +
      '<th>Department</th>' +
      '<th>Purpose</th>' +
      '<th>Date</th>' +
      '<th>Amount</th>' +
      '</tr>'+
      '</table>';

    let table = $(initTable);
    const expenses = html.items;
    const departmentName = html.departmentName;
    // Keep track of total so that we can display it on the last row
    let total = 0;

    // For each expense, create a new row in the table
    for (let i = 0; i < expenses.length; i++) {
        const currExpense = expenses[i];
        let row = $('<tr class="history-tr"></tr>');
        $(row).append('<td class="history-td">' + departmentName + '</td>');
        $(row).append('<td class="history-td">' + currExpense.purpose + '</td>');
        $(row).append('<td class="history-td">' + currExpense.date.slice(0, -4) + '</td>');
        $(row).append('<td class="history-td">$' + currExpense.amount + '</td>');
        $(table).append(row);
        total += currExpense.amount;
    }

    // Create the last row that displays the total
    $(table).append('<tr class="history-tr"><td class="history-td">Total</td><td class="history-td"></td><td class="history-td"></td><td class="history-td">$' + total.toString() + '</td></tr>');

    $('.department-history-table').append(table);
}

// Functions for the employee page
function fadeAllEmployee(callBack) {
    if ($('.content-initial').css('display').toLowerCase() != 'none') {
        $('.content-initial').fadeOut(callBack);
    } else if ($('.content-add-expenses').css('display').toLowerCase() != 'none') {
        $('.content-add-expenses').fadeOut(callBack);
    } else if ($('.content-request-funds').css('display').toLowerCase() != 'none') {
        $('.content-request-funds').fadeOut(callBack);
    } else if ($('.content-set-expected-budget').css('display').toLowerCase() != 'none') {
        $('.content-set-expected-budget').fadeOut(callBack);
    } else if ($('.content-view-department-history').css('display').toLowerCase() != 'none') {
        $('.content-view-department-history').fadeOut(callBack);
    }
}

function graphButtonClicked() {
    $('.graph-button').fadeOut();
    fadeAllEmployee(showInitialContent);
}

function requestFundsClicked() {
    $('.graph-button').fadeIn();
    fadeAllEmployee(showRequestFunds);
}

function setExpectedBudgetClicked() {
    $('.graph-button').fadeIn();
    fadeAllEmployee(showExpectedBudget);
}

function viewDepartmentHistoryClicked() {
    $('.graph-button').fadeIn();
    fadeAllEmployee(showViewAllDeptHistory);

    $.ajax({
        url: appUrl + "/expenses/department",
        cache: false,
        success: function(html){
            console.log(html);
            displayAllDepartmentHistory(html);
        }
    });
    
}

function addExpensesClicked() {
    fadeAllEmployee(showAddExpenses);
}

function showViewAllDeptHistory() {
    $('.content-view-department-history').fadeIn();
    fadeInGraphButton()
}

function showAddExpenses(callback) {
    $('.content-add-expenses').fadeIn();
    fadeInGraphButton()
}

function showExpectedBudget(callback) {
    $('.content-set-expected-budget').fadeIn();
    fadeInGraphButton()
}

function showRequestFunds(callback) {
    $('.content-request-funds').fadeIn();
    fadeInGraphButton()
}

// functions for the request notifications
function getStatusString(status) {
    if (status == 'accepted') {
        return 'Accepted';
    } else if (status == 'declined') {
        return 'Declined';
    } else {
        return 'Pending';
    } 
}

function displayRequestNotifToTable(html) {
    const requests = html.requests;

    for (let i = 0; i < requests.length; i++) {
        const currReq = requests[i];
        const status = getStatusString(currReq.status);

        let row = $('<tr></tr>');
        $(row).append('<td>' + currReq.reason + '</td>');
        $(row).append('<td>' + currReq.amount + '</td>');
        $(row).append('<td>' + status + '</td>');
        $('.notification-table').append(row);
    }
}

function displayBudgetRequestNotifToTable(html) {
    const requests = html.budget_requests;
    for (let i = 0; i < requests.length; i++) {
        const currReq = requests[i];
        
        if (currReq.budget == null) {
            continue;
        }

        const status = getStatusString(currReq.status);

        let row = $('<tr></tr>');
        $(row).append('<td>Budget Request</td>');
        $(row).append('<td>' + currReq.budget + '</td>');
        $(row).append('<td>' + status + '</td>');
        $('.notification-table').append(row);
    }
}

function displayRequestNotifications() {

    $.ajax({
        url: appUrl + "/undecided_requests",
        cache: false,
        success: function(html){
            displayRequestNotifToTable(html);
        }
    });

    $.ajax({
        url: appUrl + "/decided_requests",
        cache: false,
        success: function(html){
            displayRequestNotifToTable(html);
        }
    });

    $.ajax({
        url: appUrl + "/decided_budget_requests",
        cache: false,
        success: function(html){
            displayBudgetRequestNotifToTable(html);
        }
    });

    $.ajax({
        url: appUrl + "/undecided_budget_requests",
        cache: false,
        success: function(html){
            displayBudgetRequestNotifToTable(html);
        }
    });
}
displayRequestNotifications();