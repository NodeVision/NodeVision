class UIbranch {
    private ctrlbranch = new Ctrlbranch();
    private ctrlbar = new Ctrlbar();
    private ctrluser = new Ctrluser();
    private branch: Branch;
    
    public setui(branchModal: UIModal) {
        this.modal_menu(branchModal);
       // this.dropdown_menu();
    }
        
    public getui() {
        return new Elem('li', 'dropdown');
    }

    public modal_menu(branchModal: UIModal) {
        this.branch = this.ctrlbranch.updateModel(new request(Action.create)).data;
        //BAR
        ////////////////this.ctrlbar.updateBranch(this.branch);
                
        //MODAL HEAD
        var d_row_h = new Elem('div', 'row');
        var d_col1 = new Elem('div', 'col-md-8');
        var d_col2 = new Elem('div', 'col-md-4');
        var h3 = new Elem('h3').e; h3.innerHTML = 'New Branch : ';
        var input_name = <HTMLInputElement>new Elem('input').e; input_name.placeholder = 'branch name';
        var h3_name = new Elem('h3').e;
        //Update branch name
        input_name.onblur = () => {
            this.branch.name = input_name.value;
            var res = this.ctrlbranch.updateModel(new request(Action.update, this.branch));
            this.branch = res.data;
            h3_name.innerHTML = this.branch.name;
            h3_name.ondblclick = () => {
                input_name = <HTMLInputElement>new Elem('input', '', [new Attribute('typename', 'text'), new Attribute('value', this.branch.name)]).e;
                jQuery(h3_name).replaceWith(input_name);
            }
            jQuery(input_name).replaceWith(h3_name);
        }
        branchModal.gethead().appendChild(d_row_h.appendChild(d_col1.appendChild([h3, h3_name]).e).e);    
        //MODAL BODY
        //Color
        var input_color = <HTMLInputElement>new Elem('input', '', [new Attribute('type', 'text'), new Attribute('id', 'color')]).e;
        branchModal.getbody().appendChild(input_color);
        var colorpicker = jQuery('#color').colorpicker();
        //affiche le modal
        jQuery('#' + Modal.branch).modal('show');
    

    }
   /* public dropdown_menu() {
        var dropdown = new Elem('li', 'dropdown');
        var span = new Elem('span', 'caret');
        var a_drop = new Elem('a', 'dropdown-toggle', [
            new Attribute('data-toggle', 'dropdown'),
            new Attribute('role', 'button'),
            new Attribute('aria-haspopup', 'true'),
            new Attribute('aria-expanded', 'false')
        ]); a_drop.e.innerHTML = 'Branches';
        var ul_drop_menu = new Elem('ul', 'dropdown-menu');

        var res = this.ctrluser.updateModel(new request(Action.read));
        var settings = res.data.branchesvisibility; //branch_vsblty:Branch[]

        branches.foreach(branch => {

            var li = new Elem('li');
            var a = new Elem('a'); a.e.innerHTML = branch.getname();
            var vsblty = false; var style = new Attribute('style', 'color:grey');
            if (settings.branch_vsblty.indexof(branch) != -1) vsblty = true; style.value='color:red';
            var span_display = new Elem('span', 'glyphicon glyphicon-eye-open', [
                new Attribute('aria-hidden', 'true'),
                new Attribute('display', "" + vsblty), style]);
            span_display.e.onclick = () => {
                //this.ctrlbar.updateBranchSettings....
                //this.ctrlgraph.updatemodel(State.read,  MAYBE les settings en paramètre
            }
            var span_edit = new Elem('span', 'glyphicon glyphicon-pencil', new Attribute('aria-hidden', 'true'));
            span_edit.e.onclick = () => {
                //appel du modal de la branche
            }
            var are_u_sure = new Elem('div', 'alert alert-danger alert-dismissible fade in', new Attribute('role', 'alert'));
            are_u_sure.e.innerHTML = '<p>You will delete all nodes and edges of this branch</p><p>Are you sure</p>';
            var yes = new Elem('button', 'btn btn-danger', new Attribute('type', 'button')); yes.e.innerHTML = 'yes';
            are_u_sure.e.onclick = () => {
                //this.ctrlbar.updateModel(State.update,branch);
                //this.ctrlgraph.updateModel(State.update,branch);
            }
            are_u_sure.appendChild(yes.e);

            var span_remove = new Elem('span', 'glyphicon glyphicon-trash', [
                new Attribute('aria-hidden', 'true'),
                new Attribute('role', 'button'),
                new Attribute('tabindex', '0'),
                new Attribute('data-toggle=', 'popover'),
                new Attribute('data-trigger', 'focus'),
                new Attribute('data-content', )
            ]);
        });
    }
    */
}