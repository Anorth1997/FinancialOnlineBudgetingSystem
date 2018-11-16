function createDptClicked() {
    hideInitialContent(showCreateDepartmentContent);
}
function hideInitialContent(callback) {
    $('.content-initial').fadeOut(callback);
}
function showCreateDepartmentContent(callback) {
    $('.content-create-department').fadeIn(callback);
}

function setTotalRevenueClicked() {
    hideInitialContent(showSetTotalRevenue);
}

function showSetTotalRevenue(callback) {
    $('.content-set-total-revenue').fadeIn(callback);
}

function ReviewFDRequestClicked() {
    hideInitialContent(showReviewFDRequest);
}

function showReviewFDRequestCClicked(callback) {
    %('.content-review-financial-request').fadeIn(callback);
}

function ViewAllDepartmentHistoryClicked() {
    hideInitialContent(showViewAllDeptHistory);
}

function showViewAllDeptHistory(callback) {
    %('.content-view-department-history').fadeIn(callback);
}
