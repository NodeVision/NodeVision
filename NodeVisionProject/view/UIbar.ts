class UIbar{
    private tbl_users = Array<HTMLElement>();
    private navbar: Elem<HTMLElement>;
	constructor(uipreferencepopup:UIpreferencepopup){
		var bar =  new Elem('nav','navbar navbar-inverse');
		var dContainer = new Elem('div','container-fluid');
        var nav_head = new Elem('div', 'navbar-header');
        var navbar = new Elem('ul', 'nav navbar-nav');
		
		var btn_branch = new Elem('button','btn btn-success navbar-btn').e; btn_branch.innerHTML = 'New Child';
        var btn_node = new Elem('button','btn btn-info navbar-btn').e; btn_node.innerHTML = 'New Attribute';
		

        bar.appendChild(dContainer.appendChild(nav_head.appendChild(navbar.e).e).e).e;    
        document.body.appendChild(bar.e)
        navbar.appendChild(uipreferencepopup.getui().e);
        this.navbar = navbar
    }
    public getui() { return this.navbar; }
    public setpreferencepopup(ui: UIpreferencepopup) {
        this.navbar.e.innerHTML = '';//ATTENTION
        this.navbar.e.appendChild(ui.getui().e);
        ui.getui().e.className = 'dropdown open';
    }
    public setbranches(ui: UIbranch) {
        this.navbar.e.appendChild(ui.getui().e);
    }
	
}