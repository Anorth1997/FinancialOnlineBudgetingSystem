function createDptClicked() {
    hideAllContent();
    $('.content-create-department').show();

}

function createDpt() {
    window.alert("Hello!");
}

function setRevenue() {
    prompt("What do you want?");
    alert("Hello!");
}

function hideInitialContent(callback) {
    $('.content-initial').fadeOut(callback);
}

function hideAllContent(callback) {
    hideInitialContent();
    $('.content-create-department').hide();
    $('.content-set-total-revenue').hide();
    $('.content-review-financial-request').hide();
    $('.content-view-department-history').hide();

}

function showCreateDepartmentContent(callback) {
    $('.content-create-department').fadeIn(callback);
}

function setTotalRevenueClicked() {
    hideAllContent();
    $('.content-set-total-revenue').show();
}

function showSetTotalRevenue(callback) {
    $('.content-set-total-revenue').fadeIn(callback);
}

function reviewFDRequestsClicked() {
    hideAllContent();
    $('.content-review-financial-request').show();
}

function showReviewFDRequest(callback) {
    $('.content-review-financial-request').fadeIn(callback);
}

function ViewAllDepartmentHistoryClicked() {
    hideAllContent();
}

function showViewAllDeptHistory(callback) {
    $('.content-view-department-history').fadeIn(callback);
}

