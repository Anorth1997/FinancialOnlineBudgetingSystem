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
