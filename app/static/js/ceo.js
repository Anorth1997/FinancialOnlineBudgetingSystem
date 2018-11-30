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
    displayRequests();
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


// Code to display Financial Department Requests

function populateBudgetRequests(html) { 
    const budgetProposals = html.budget_proposals;
    if (budgetProposals == null) {
        return;
    }
    for (let i = 0; i < budgetProposals.length; i++) {
        const curr = budgetProposals[i];

        $('.request-list-box-department-name').html("");
        $('.request-list-box-type').html("");
        $('.request-list-box-amount').html("");
        $('.request-list-box-accept').html("");
        $('.request-list-box-reject').html(""); 


        $('.request-list-box-department-name').append('<div class="request-list-entry"> <div class="request-list-entry-text">'
                                                                + curr.department + '</div> </div>');

        $('.request-list-box-type').append('<div class="request-list-entry"> <div class="request-list-entry-text">'
                                                                 + 'Budget Request</div> </div>');
                                                       
        $('.request-list-box-amount').append('<div class="request-list-entry"> <div class="request-list-entry-text">'
                                                                + curr.budget + '</div> </div>');
        $('.request-list-box-accept').append('<div class="request-list-entry">'
                                                            + '<div class="request-list-accept-button" onclick="budgetAcceptClicked('
                                                            + curr.dept_id
                                                            + ')"> Accept </div> </div>');
        $('.request-list-box-reject').append('<div class="request-list-entry">'
                                                            + '<div class="request-list-reject-button" onclick="budgetDeclineClicked('
                                                            + curr.dept_id
                                                            + ')"> Decline </div> </div>');
    }
}

function budgetDeclineClicked(deptId) {
    $.post("http://127.0.0.1:5000/ceo/ceo_budget_decision", {"dept_id": deptId, "decision": "declined"})
    .done(function(data) {reviewFDRequestsClicked()});
}

function budgetAcceptClicked(deptId) {
    $.post("http://127.0.0.1:5000/ceo/ceo_budget_decision", {"dept_id": deptId, "decision": "accepted"})
    .done(function(data) {reviewFDRequestsClicked()});
}

function populateRequests(html) {
    console.log(html);

    const requests = html.requests;
    if (requests == null) {
        return;
    }
    for (let i = 0; i < requests.length; i++) {
        const curr = requests[i];

        $('.request-list-box-department-name').html("");
        $('.request-list-box-type').html("");
        $('.request-list-box-amount').html("");
        $('.request-list-box-accept').html("");
        $('.request-list-box-reject').html(""); 


        $('.request-list-box-department-name').append('<div class="request-list-entry"> <div class="request-list-entry-text">'
                                                                + curr.department + '</div> </div>');

        $('.request-list-box-type').append('<div class="request-list-entry"> <div class="request-list-entry-text">'
                                                                 + curr.reason + '</div> </div>');
                                                       
        $('.request-list-box-amount').append('<div class="request-list-entry"> <div class="request-list-entry-text">'
                                                                + curr.amount + '</div> </div>');
        $('.request-list-box-accept').append('<div class="request-list-entry">'
                                                            + '<div class="request-list-accept-button" onclick="reqAcceptClicked('
                                                            + curr.request_id
                                                            + ')"> Accept </div> </div>');
        $('.request-list-box-reject').append('<div class="request-list-entry">'
                                                            + '<div class="request-list-reject-button" onclick="reqDeclineClicked('
                                                            + curr.request_id
                                                            + ')"> Decline </div> </div>');
    }
}

function reqAcceptClicked(req_id) {
    $.post("http://127.0.0.1:5000/ceo/ceo_request_decision", {"req_id": req_id, "decision": "accepted"})
    .done(function(data) {reviewFDRequestsClicked()});
}

function reqDeclineClicked(req_id) {
    $.post("http://127.0.0.1:5000/ceo/ceo_request_decision", {"req_id": req_id, "decision": "declined"})
    .done(function(data) {reviewFDRequestsClicked()});
}

function displayRequests() {
    // clear
    $('.request-list-box-department-name').html("");
    $('.request-list-box-type').html("");
    $('.request-list-box-amount').html("");
    $('.request-list-box-accept').html("");
    $('.request-list-box-reject').html("");

    // get budget requests
    $.ajax({
        url: "http://127.0.0.1:5000/ceo/get_department_budget_proposals",
        cache: false,
        success: function(html){
            populateBudgetRequests(html)
        }
    });

    // get requests
    $.ajax({
        url: "http://127.0.0.1:5000/ceo/get_department_requests",
        cache: false,
        success: function(html){
            populateRequests(html)
        }
    });
}