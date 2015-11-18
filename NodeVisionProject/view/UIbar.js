var UIbar = (function () {
    function UIbar(uipreferencepopup) {
        this.tbl_users = Array();
        var bar = new Elem('nav', 'navbar navbar-inverse');
        var dContainer = new Elem('div', 'container-fluid');
        var nav_head = new Elem('div', 'navbar-header');
        var navbar = new Elem('ul', 'nav navbar-nav');
        var btn_branch = new Elem('button', 'btn btn-success navbar-btn').e;
        btn_branch.innerHTML = 'New Child';
        var btn_node = new Elem('button', 'btn btn-info navbar-btn').e;
        btn_node.innerHTML = 'New Attribute';
        bar.appendChild(dContainer.appendChild(nav_head.appendChild(navbar.e).e).e).e;
        document.body.appendChild(bar.e);
        navbar.appendChild(uipreferencepopup.getui().e);
        this.navbar = navbar;
    }
    UIbar.prototype.getui = function () { return this.navbar; };
    UIbar.prototype.setpreferencepopup = function (ui) {
        this.navbar.e.innerHTML = ''; //ATTENTION
        this.navbar.e.appendChild(ui.getui().e);
        ui.getui().e.className = 'dropdown open';
    };
    UIbar.prototype.setbranches = function (ui) {
        this.navbar.e.appendChild(ui.getui().e);
    };
    return UIbar;
})();
//# sourceMappingURL=UIbar.js.map