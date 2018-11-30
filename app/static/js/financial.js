//fadeAllFinancial() code based on fadeAllCeo in ceo.js
function fadeAllFinancial(callBack) {
    if ($('.content-initial').css('display').toLowerCase() != 'none') {
        $('.content-initial').fadeOut(callBack);
    } else if ($('.content-review-department-requests').css('display').toLowerCase() != 'none') {
        $('.content-review-department-requests').fadeOut(callBack);
    } else if ($('.content-distribute-total-revenue').css('display').toLowerCase() != 'none') {
        $('.content-distribute-total-revenue').fadeOut(callBack);
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
    const total_revenue = document.getElementById('total-revenue').innerHTML;
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
