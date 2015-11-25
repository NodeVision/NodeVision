//Interface de la barre
var UIbar = (function () {
    function UIbar(uipreferencepopup) {
        this.tbl_users = Array();
        //div de construction de la barre
        var bar = new Elem('nav', 'navbar navbar-inverse');
        var dContainer = new Elem('div', 'container-fluid');
        var nav_head = new Elem('div', 'navbar-header');
        var navbar = new Elem('ul', 'nav navbar-nav');
        // container pour les composants de la barre
        this.settings = new Elem('div');
        this.branches = new Elem('div');
        //encapsulation des divs
        bar.appendChild(dContainer.appendChild(nav_head.appendChild(navbar.e).e).e).e;
        document.body.appendChild(bar.e);
        navbar.appendChild(uipreferencepopup.getui().e);
        this.navbar = navbar;
    }
    UIbar.prototype.getui = function () { return this.navbar; };
    UIbar.prototype.setpreferencepopup = function (ui) {
        this.navbar.e.innerHTML = ''; //ATTENTION écrasement parce qu'il n'y a pas de séparation des div dans la barre
        this.navbar.e.appendChild(ui.getui().e);
        ui.getui().e.className = 'dropdown open';
    };
    UIbar.prototype.setbranches = function (ui) {
        this.navbar.e.appendChild(ui.getui().e);
    };
    return UIbar;
})();
//# sourceMappingURL=UIbare.js.map