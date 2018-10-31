console.log("Welcome!")

function createDptClicked() {
    hideInitialContent(showCreateDepartmentContent);
}
function hideInitialContent(callback) {
    ('.content-initial').fadeOut(callback);
}

function showCreateDepartmentContent(callback) {
    ('.content-create-department').fadeIn(callback);
}
