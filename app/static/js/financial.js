//fadeAllFinancial() code based on fadeAllCeo in ceo.js
function fadeAllFinancial(callBack) {
    if ($('.content-initial').css('display').toLowerCase() != 'none') {
        $('.content-initial').fadeOut(callBack);
    } else if ($('.content-review-department-requests').css('display').toLowerCase() != 'none') {
        $('.content-review-department-requests').fadeOut(callBack);
    } else if ($('.content-review-budget-requests').css('display').toLowerCase() != 'none') {
        $('.content-review-budget-requests').fadeOut(callBack);
    } else if ($('.content-distribute-total-revenue').css('display').toLowerCase() != 'none') {
        $('.content-distribute-total-revenue').fadeOut(callBack);
    } else if ($('.content-view-department-history').css('display').toLowerCase() != 'none') {
        $('.content-view-department-history').fadeOut(callBack);
    }
}

function displayAllRequests(html) {

    const requests = html.requests;

    // Clears the list before appending html elements to div's. Prevents the same tuples from being printed more than
    // once when fading out of the Review Department Requests frame, and then fading it back in.
    $('.request-list-box-department-name').html("");
    $('.request-list-box-amount').html("");
    $('.request-list-box-reason').html("");
    $('.request-list-box-notify').html("");


    for (let i = 0; i < requests.length; i++) {
        const currentRequest = requests[i];
        $('.request-list-box-department-name').append('<div class="request-list-entry"> <div class="request-list-entry-text">'
                                                                + currentRequest.department + '</div> </div>');
        $('.request-list-box-amount').append('<div class="request-list-entry"> <div class="request-list-entry-text">'
                                                                + currentRequest.amount + '</div> </div>');
        $('.request-list-box-reason').append('<div class="request-list-entry"> <div class="request-list-entry-text">'
                                                                + currentRequest.reason + '</div></div>');
        $('.request-list-box-notify').append('<div class="request-list-entry">'
                                                            + '<div class="request-list-notify-ceo-button" onclick="notifyCEOClicked('
                                                            + currentRequest.request_id
                                                            + ')"> Notify </div> </div>');
    }

}

function notifyCEOClicked(corresponding_request_id) {
    $.post(appUrl + "/financial/notify_ceo_request", {"req_id": corresponding_request_id})
        .done(function(data) {reviewDepartmentRequestsClicked()});
}

function reviewDepartmentRequestsClicked() {
    $('.graph-button').fadeOut();
    fadeAllFinancial(showReviewDepartmentRequests);
    $.ajax({
        url: appUrl + "/requests/all_requests",
        cache: false,
        success: function(html){
            displayAllRequests(html);
        }
    });
}

function showReviewDepartmentRequests(callback) {
    $('.content-review-department-requests').fadeIn(callback);
    fadeInGraphButton();
}

var num_departments;
var department_list = [];

function displayAllDepartmentsAndRevenueInputs(html) {
    const departments = html.departments;
    num_departments = departments.length;

    $('.distribute-revenue-form').html('');

    for (let i = 0; i < departments.length; i++) {
        const currentDepartment = departments[i];
        department_list[i] = currentDepartment.department;
        $('.distribute-revenue-form').append('<div class="distribute-revenue-entry"><form>'
                                        + currentDepartment.department
                                        + ': <input type="text" id="'
                                        + currentDepartment.department
                                        + '"> </form> </div>')
    }
}

function submitFormClicked() {
    var revenue_inputs = [];
    for (let i = 0; i < num_departments; i++) {
        revenue_inputs[i] = Number(document.getElementById(department_list[i]).value);
    }
    var sum = 0;
    for (let j = 0; j < num_departments; j++) {
        sum = sum + revenue_inputs[j];
        console.log(sum);
    }
    const total_revenue = document.getElementById('.total-revenue').innerHTML;
    console.log(total_revenue);
    if (sum != Number(total_revenue)) {
        var alert_message = ("Yikes! The sum of the inputted revenues does not match the target total revenue!\n"
                                + "Expected Sum of Inputs: " + total_revenue + "\n"
                                + "Actual Sum of Inputs:   " + sum) ;
        window.alert(alert_message);
    } else {
        for (let k = 0; k < num_departments; k++) {
            $.post(appUrl + "/financial/set_department_revenues", {"dept_name": department_list[k],
                                                                                "rev_goal": revenue_inputs[k]});
        }
        window.alert("Form submitted successfully.");
        graphButtonClicked();
    }

}

function displayAllBudgetRequests(html) {

    const budget_requests = html.budget_requests;

    // Clears the list before appending html elements to div's. Prevents the same tuples from being printed more than
    // once when fading out of the Review Department Requests frame, and then fading it back in.
    $('.request-list-box-department-name').html("");
    $('.request-list-box-amount').html("");
    $('.request-list-box-notify').html("");


    for (let i = 0; i < budget_requests.length; i++) {
        const currentRequest = budget_requests[i];
        $('.request-list-box-department-name').append('<div class="request-list-entry"> <div class="request-list-entry-text">'
                                                                + currentRequest.dept_name + '</div> </div>');
        $('.request-list-box-amount').append('<div class="request-list-entry"> <div class="request-list-entry-text">'
                                                                + currentRequest.budget + '</div> </div>');
        if (currentRequest.status == 'ceo_not_notified') {
            $('.request-list-box-notify').append('<div class="request-list-entry">'
                                                            + '<div class="request-list-notify-ceo-button" onclick="budgetNotifyCEOClicked('
                                                            + currentRequest.dept_id
                                                            + ')"> Notify </div> </div>');
        } else {
            $('.request-list-box-notify').append('<div class="request-list-entry"> <div class="request-list-notify-ceo-button" style="background-color:yellow;cursor:auto">Notified</div></div>');
        }
    }

}

function budgetNotifyCEOClicked(department_id) {
    $.post("http://127.0.0.1:5000/financial/notify_ceo_budget", {"dept_id": department_id})
        .done(function(data) {reviewBudgetRequestsClicked()});

}

function reviewBudgetRequestsClicked() {
    $('.graph-button').fadeOut();
    fadeAllFinancial(showReviewBudgetRequests);
    $.ajax({
        url: "http://127.0.0.1:5000/undecided_budget_requests_all",
        cache: false,
        success: function(html){
            displayAllBudgetRequests(html);
        }
    });
}

function showReviewBudgetRequests(callback) {
    $('.content-review-budget-requests').fadeIn();
    fadeInGraphButton();
}

function distributeTotalRevenueClicked() {
    $('.graph-button').fadeOut();
    fadeAllFinancial(showDistributeTotalRevenue);
    $.ajax({
        url: appUrl + "/financial/all_departments",
        cache: false,
        success: function(html){
            displayAllDepartmentsAndRevenueInputs(html);
        }
    });
}

function showDistributeTotalRevenue(callback) {
    $('.content-distribute-total-revenue').fadeIn(callback);
    fadeInGraphButton();
}

function graphButtonClicked() {
    $('.graph-button').fadeOut();
    fadeAllFinancial(showInitialContent);
}

function viewAllDepartmentHistoryClicked() {
    $('.graph-button').fadeIn();
    fadeAllFinancial(showViewAllDeptHistory);

    $.ajax({
        url: "http://127.0.0.1:5000/expenses/full_history",
        cache: false,
        success: function(html){
            displayAllDepartmentHistory(html);
        }
    });
}

function showViewAllDeptHistory(callback) {
    $('.content-view-department-history').fadeIn(callback);
    fadeInGraphButton();
}

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

function checkIfCeoSetRevenueGoal() {
    // If the ceo has set a revenue goal, then
    // display a notification
    // notify financial head when CEO makes a total revenue foal
    $.ajax({
        url: appUrl + "/financial/check_total_rev_goal_set",
        cache: false,
        success: function(html){

            if (html.total_rev_goal == null) {
                // ceo has not set the notification yet
                return;
            }

            // display notification

        }
    });

}
