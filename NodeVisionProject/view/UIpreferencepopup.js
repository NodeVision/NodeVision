var UIpreferencepopup = (function () {
    function UIpreferencepopup(preferencepopup) {
        this.setui(preferencepopup);
    }
    UIpreferencepopup.prototype.init = function (ctrlpreferencepopup, ctrlbar) {
        this.ctrlpreferencepopup = ctrlpreferencepopup;
        this.ctrlbar = ctrlbar;
    };
    UIpreferencepopup.prototype.setui = function (preferencepopup) {
        var _this = this;
        this.dropdown = new Elem('li', 'dropdown');
        var a_dropdown = new Elem('a', 'dropdown-toggle', [
            new Attribute('data-toggle', 'dropdown'),
            new Attribute('role', 'button'),
            new Attribute('aria-haspopup', 'true'),
            new Attribute('aria-expanded', 'false')]);
        a_dropdown.e.innerHTML = 'Settings';
        var span = new Elem('span', 'caret');
        a_dropdown.appendChild(span.e);
        var ul_menu = new Elem('ul', 'dropdown-menu');
        var li_activate = new Elem('li');
        var a_activate = new Elem('a');
        a_activate.e.innerHTML = 'Pop-up Activation ';
        var input_activate = new Elem('input', '', new Attribute('type', 'checkbox')).e;
        input_activate.checked = preferencepopup._activate;
        input_activate.onchange = function () {
            preferencepopup._activate = input_activate.checked;
            _this.update(preferencepopup);
        };
        ul_menu.appendChild(li_activate.appendChild(a_activate.appendChild(input_activate).e).e);
        if (preferencepopup._activate) {
            var li_fadeout = new Elem('li');
            var a_fadeout = new Elem('a');
            a_fadeout.e.innerHTML = 'Fade Auto ';
            var input_fadeout = new Elem('input', '', new Attribute('type', 'checkbox')).e;
            input_fadeout.checked = preferencepopup._fadeout;
            input_fadeout.onchange = function () {
                preferencepopup._fadeout = input_fadeout.checked;
                _this.update(preferencepopup);
            };
            ul_menu.appendChild(li_fadeout.appendChild(a_fadeout.appendChild(input_fadeout).e).e);
            var li_details = new Elem('li');
            var a_details = new Elem('a');
            a_details.e.innerHTML = 'Details ';
            var input_details = new Elem('input', '', new Attribute('type', 'checkbox')).e;
            input_details.checked = preferencepopup._details;
            input_details.onchange = function () {
                preferencepopup._details = input_details.checked;
                _this.update(preferencepopup);
            };
            ul_menu.appendChild(li_details.appendChild(a_details.appendChild(input_details).e).e);
        }
        this.dropdown.appendChild([a_dropdown.e, ul_menu.e]);
    };
    UIpreferencepopup.prototype.getui = function () { return this.dropdown; };
    UIpreferencepopup.prototype.update = function (preferencepopup) {
        var res_preference = this.ctrlpreferencepopup.updateModel(new request(Action.update, preferencepopup));
        var rui = res_preference.ui;
        this.ctrlbar.updateSettings(rui);
        rui.init(this.ctrlpreferencepopup, this.ctrlbar);
    };
    return UIpreferencepopup;
})();
//# sourceMappingURL=UIpreferencepopup.js.map