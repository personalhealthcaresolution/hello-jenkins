var DeleteDialog = function() {
    var self = this,
        parentElement = element(by.css('div.modal div.modal-dialog div.modal-content'));
       
    self.clickCancel = clickCancel;
    self.clickDelete = clickDelete;

    function clickCancel() {
        parentElement.element(by.cssContainingText('button.btn.btn-default', 'Cancel')).click();
    }

    function clickDelete() {
        parentElement.element(by.cssContainingText('button.btn.btn-primary', 'Delete')).click();
    }

};

module.exports = DeleteDialog;