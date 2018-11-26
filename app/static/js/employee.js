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
    }
}

function graphButtonClicked() {
    $('.graph-button').fadeOut();
    fadeAllEmployee(showInitialContent);
}

function requestFundsClicked() {
    fadeAllEmployee(showRequestFunds);
}

function setExpectedBudgetClicked() {
    fadeAllEmployee(showExpectedBudget);
}

function addExpensesClicked() {
    fadeAllEmployee(showAddExpenses);
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