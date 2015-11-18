var UIbranch = (function () {
    function UIbranch() {
        this.ctrlbranch = new Ctrlbranch();
        this.ctrlbar = new Ctrlbar();
        this.ctrluser = new Ctrluser();
    }
    UIbranch.prototype.setui = function (branchModal) {
        this.modal_menu(branchModal);
        // this.dropdown_menu();
    };
    UIbranch.prototype.getui = function () {
        return new Elem('li', 'dropdown');
    };
    UIbranch.prototype.modal_menu = function (branchModal) {
        var _this = this;
        this.branch = this.ctrlbranch.updateModel(new request(Action.create)).data;
        //BAR
        ////////////////this.ctrlbar.updateBranch(this.branch);
        //MODAL HEAD
        var d_row_h = new Elem('div', 'row');
        var d_col1 = new Elem('div', 'col-md-8');
        var d_col2 = new Elem('div', 'col-md-4');
        var h3 = new Elem('h3').e;
        h3.innerHTML = 'New Branch : ';
        var input_name = new Elem('input').e;
        input_name.placeholder = 'branch name';
        var h3_name = new Elem('h3').e;
        //Update branch name
        input_name.onblur = function () {
            _this.branch.name = input_name.value;
            var res = _this.ctrlbranch.updateModel(new request(Action.update, _this.branch));
            _this.branch = res.data;
            h3_name.innerHTML = _this.branch.name;
            h3_name.ondblclick = function () {
                input_name = new Elem('input', '', [new Attribute('typename', 'text'), new Attribute('value', _this.branch.name)]).e;
                jQuery(h3_name).replaceWith(input_name);
            };
            jQuery(input_name).replaceWith(h3_name);
        };
        branchModal.gethead().appendChild(d_row_h.appendChild(d_col1.appendChild([h3, h3_name]).e).e);
        //MODAL BODY
        //Color
        var input_color = new Elem('input', '', [new Attribute('type', 'text'), new Attribute('id', 'color')]).e;
        branchModal.getbody().appendChild(input_color);
        var colorpicker = jQuery('#color').colorpicker();
        //affiche le modal
        jQuery('#' + Modal.branch).modal('show');
    };
    return UIbranch;
})();
//# sourceMappingURL=UIbranch.js.map