//Interface de la barre
class UIbar {
    private tbl_users = Array<HTMLElement>();
    private navbar: Elem<HTMLElement>;
    private settings: Elem<HTMLElement>;
    private branches: Elem<HTMLElement>
    constructor(uipreferencepopup: UIpreferencepopup) {
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
        document.body.appendChild(bar.e)
        navbar.appendChild(uipreferencepopup.getui().e);
        this.navbar = navbar
    }
    public getui() { return this.navbar; }
    public setpreferencepopup(ui: UIpreferencepopup) {
        this.navbar.e.innerHTML = '';//ATTENTION écrasement parce qu'il n'y a pas de séparation des div dans la barre
        this.navbar.e.appendChild(ui.getui().e);
        ui.getui().e.className = 'dropdown open';
    }
    public setbranches(ui: UIbranch) {
        this.navbar.e.appendChild(ui.getui().e);
    }

}