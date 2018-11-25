// Functions for the employee page
function requestFundsClicked() {
    hideInitialContent(showRequestFunds);
}

function setExpectedBudgetClicked() {
    hideInitialContent(showExpectedBudget);
}

function addExpensesClicked() {
    hideInitialContent(showAddExpenses);
}

function showAddExpenses() {
    $('.content-add-expenses').fadeIn();
}

function showExpectedBudget() {
    $('.content-set-expected-budget').fadeIn();
}

function showRequestFunds(callback) {
    $('.content-request-funds').fadeIn(callback);
}