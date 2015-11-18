class UIpreferencepopup {
    private dropdown: Elem<HTMLElement>;
    private ctrlpreferencepopup: Ctrlpreferencepopup;
    private ctrlbar: Ctrlbar;
    constructor(preferencepopup : PreferencePopup){
        this.setui(preferencepopup);
    }
    public init(ctrlpreferencepopup: Ctrlpreferencepopup, ctrlbar: Ctrlbar) {
        this.ctrlpreferencepopup = ctrlpreferencepopup;
        this.ctrlbar = ctrlbar;
    }
    public setui(preferencepopup: PreferencePopup) {
        
        this.dropdown = new Elem('li', 'dropdown');
        var a_dropdown = new Elem('a', 'dropdown-toggle', [
            new Attribute('data-toggle','dropdown'),
            new Attribute('role','button'),
            new Attribute('aria-haspopup', 'true'),
            new Attribute('aria-expanded', 'false')]);
        a_dropdown.e.innerHTML = 'Settings';
        var span = new Elem('span', 'caret');
        a_dropdown.appendChild(span.e);

        var ul_menu = new Elem('ul', 'dropdown-menu');
        var li_activate = new Elem('li');
        var a_activate = new Elem('a'); a_activate.e.innerHTML = 'Pop-up Activation ';
        var input_activate = <HTMLInputElement>new Elem('input', '', new Attribute('type', 'checkbox')).e;
        input_activate.checked = preferencepopup._activate;
        input_activate.onchange = () => {
            preferencepopup._activate = input_activate.checked;
            this.update(preferencepopup);
        }
        ul_menu.appendChild(li_activate.appendChild(a_activate.appendChild(input_activate).e).e);

        if (preferencepopup._activate) {
            var li_fadeout = new Elem('li');
            var a_fadeout = new Elem('a'); a_fadeout.e.innerHTML = 'Fade Auto ';
            var input_fadeout = <HTMLInputElement>new Elem('input', '', new Attribute('type', 'checkbox')).e;
            input_fadeout.checked = preferencepopup._fadeout;
            input_fadeout.onchange = () => {
                preferencepopup._fadeout = input_fadeout.checked;
                this.update(preferencepopup);
            }
            ul_menu.appendChild(li_fadeout.appendChild(a_fadeout.appendChild(input_fadeout).e).e);

            var li_details = new Elem('li');
            var a_details = new Elem('a'); a_details.e.innerHTML = 'Details ';
            var input_details = <HTMLInputElement>new Elem('input', '', new Attribute('type', 'checkbox')).e;
            input_details.checked = preferencepopup._details;
            input_details.onchange = () => {
                preferencepopup._details = input_details.checked;
                this.update(preferencepopup);
            }
            ul_menu.appendChild(li_details.appendChild(a_details.appendChild(input_details).e).e);

        }
        this.dropdown.appendChild([a_dropdown.e, ul_menu.e]);
    }
    public getui() { return this.dropdown; }
    public update(preferencepopup : PreferencePopup) {
        var res_preference = this.ctrlpreferencepopup.updateModel(new request(Action.update, preferencepopup));
        var rui = <UIpreferencepopup>res_preference.ui;
        this.ctrlbar.updateSettings(rui);
        rui.init(this.ctrlpreferencepopup, this.ctrlbar);
    }
}