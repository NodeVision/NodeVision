var UIbranch = (function () {
    function UIbranch() {
        this.ctrlgraph = new Ctrlgraph();
        this.ctrlbranch = new Ctrlbranch();
        this.ctrlbar = new Ctrlbar();
        this.ctrluser = new Ctrluser();
    }
    UIbranch.prototype.setui = function (branchModal) {
        this.modal_menu(branchModal);
        var branches = new Array();
        //appel du graph
        this.ctrlgraph.updateModel(new request(Action.read)).data.nodes.forEach(function (n) {
            //si le noeud contient une branche pas répertorié dans le tableau array l'ajoute au tableau
            if (branches.indexOf(n.branch) == -1)
                branches.push(n.branch);
        });
        this.dropdown_branches_menu(branches);
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
        //MODAL BODY
        this.branch.name = 'undefined'; //TODO enlever
        var d_row_h = new Elem('div', 'row');
        var d_col1 = new Elem('div', 'col-md-12');
        var h3 = new Elem('h3');
        h3.e.innerHTML = 'New Branch: ';
        var input_name = new Elem('input').e;
        input_name.placeholder = 'branch name';
        var h3_name = new Elem('h3');
        h3_name.e.innerHTML = this.branch.name;
        //Update branch name
        input_name.onblur = function () {
            _this.branch.name = input_name.value;
            var res = _this.ctrlbranch.updateModel(new request(Action.update, _this.branch));
            _this.branch = res.data;
            h3_name.e.innerHTML = _this.branch.name;
            jQuery(input_name).replaceWith(h3_name.e);
        };
        h3_name.e.ondblclick = function () {
            jQuery(h3_name.e).replaceWith(input_name);
        };
        branchModal.getbody().appendChild(d_row_h.appendChild(d_col1.appendChild(h3.appendChild(h3_name.e).e).e).e);
        //Color
        var input_color = new Elem('input', '', [new Attribute('type', 'text'), new Attribute('id', 'color')]).e;
        branchModal.getbody().appendChild(input_color);
        var colorpicker = jQuery('#color').colorpicker();
        //affiche le modal
        jQuery('#' + Modal.branch).modal('show');
    };
    UIbranch.prototype.dropdown_branches_menu = function (branches) {
        //div du menu des branches
        var dropdown = new Elem('li', 'dropdown');
        var span = new Elem('span', 'caret');
        var a_drop = new Elem('a', 'dropdown-toggle', [
            new Attribute('data-toggle', 'dropdown'),
            new Attribute('role', 'button'),
            new Attribute('aria-haspopup', 'true'),
            new Attribute('aria-expanded', 'false')
        ]);
        a_drop.e.innerHTML = 'Branches';
        var ul_drop_menu = new Elem('ul', 'dropdown-menu');
        //appel des parametres de vision que l utilisateur souhaites
        var res = this.ctrluser.updateModel(new request(Action.read));
        var settings = res.data.branchesvisibility;
        settings = [new Branch(1), new Branch(2), new Branch(3), new Branch(4)]; //TODO enlever
        branches.forEach(function (branch) {
            //divs pour chaque branche auquel à access l utilisateur
            var li = new Elem('li');
            var a = new Elem('a');
            a.e.innerHTML = branch.name;
            var vsblty = false;
            var style = new Attribute('style', 'color:grey');
            //filtre sur les settings de l utilisateur
            if (settings.indexOf(branch) != -1) {
                vsblty = true;
                style.value = 'color:red';
            }
            //affichage des divs de filtrage
            var span_display = new Elem('span', 'glyphicon glyphicon-eye-open', [
                new Attribute('aria-hidden', 'true'),
                new Attribute('display', "" + vsblty), style]);
            span_display.e.onclick = function () {
                //this.ctrlbar.updateBranchSettings....
                //this.ctrlgraph.updatemodel(State.read,  MAYBE les settings en parametre
            };
            var span_edit = new Elem('span', 'glyphicon glyphicon-pencil', new Attribute('aria-hidden', 'true'));
            span_edit.e.onclick = function () {
                //appel du modal de la branche
            };
            var are_u_sure = new Elem('div', 'alert alert-danger alert-dismissible fade in', new Attribute('role', 'alert'));
            are_u_sure.e.innerHTML = '<p>You will delete all nodes and edges of this branch</p><p>Are you sure</p>';
            var yes = new Elem('button', 'btn btn-danger', new Attribute('type', 'button'));
            yes.e.innerHTML = 'yes';
            are_u_sure.e.onclick = function () {
                //this.ctrlbar.updateModel(State.update,branch);
                //this.ctrlgraph.updateModel(State.update,branch);
            };
            are_u_sure.appendChild(yes.e);
            /*var span_remove = new Elem('span', 'glyphicon glyphicon-trash', [
                new Attribute('aria-hidden', 'true'),
                new Attribute('role', 'button'),
                new Attribute('tabindex', '0'),
                new Attribute('data-toggle=', 'popover'),
                new Attribute('data-trigger', 'focus'),
                new Attribute('data-content',)//TODO manque de l attribut class
            ]);
            */
        });
    };
    return UIbranch;
})();
//# sourceMappingURL=UIbranche.js.map