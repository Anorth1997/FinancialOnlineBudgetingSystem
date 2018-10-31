console.log('Welcome');

function loginBtnClicked() {
    hideInitialContent(showLoginContent);
}

function createCompanyBtnClicked() {
    hideInitialContent(showCreateCompanyContent);
}


/**
 * Hides the Create new company and Login buttons
 */
function hideInitialContent(callback) {
    $('.content-initial').fadeOut(callback);
}

/**
 * Shows the login fields and Login button
 */
function showLoginContent(callback) {
    $('.content-login').fadeIn(callback);
}

/**
 * Shows the create company fields
 */
function showCreateCompanyContent(callback) {
    $('.content-create-company').fadeIn(callback);
}