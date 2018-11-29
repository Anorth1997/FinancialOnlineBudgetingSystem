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

function reviewDepartmentRequestsClicked() {
    $('.graph-button').fadeOut();
    fadeAllFinancial(showReviewDepartmentRequests);
}

function showReviewDepartmentRequests(callback) {
    $('.content-review-department-requests').fadeIn(callback);
    fadeInGraphButton();
}

function distributeTotalRevenueClicked() {
    $('.graph-button').fadeOut();
    fadeAllFinancial(showDistributeTotalRevenue);
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
        url: "http://127.0.0.1:5000/financial/check_total_rev_goal_set",
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

checkIfCeoSetRevenueGoal();

