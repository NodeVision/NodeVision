var UINode = (function () {
    function UINode(node, ctrlgraph) {
        this.attrs = new Array();
        //appel du modèle
        this.node = new Ctrlnode().updateModel(new request(Action.read)).data;
        //appel des controllers
        this.ctrlgraph = ctrlgraph;
        this.ctrlnode = new Ctrlnode;
        this.ctrlattribute = new Ctrlattribute;
        this.ctrlpreferencepopup = new Ctrlpreferencepopup();
        //affiche le modal
        jQuery('#' + Modal.node).modal('show');
    }
    UINode.prototype.setui = function (node, nodeModal) {
        var _this = this;
        //MODAL HEAD
        var d_row_h = new Elem('div', 'row');
        var d_col1 = new Elem('div', 'col-md-6');
        var d_col2 = new Elem('div', 'col-md-6');
        var d_col3 = new Elem('div', 'col-md-2');
        var d_col4 = new Elem('div', 'col-md-10');
        var h3 = new Elem('h4').e;
        h3.innerHTML = 'Node: ';
        var h3_name = new Elem('h4').e;
        h3_name.innerHTML = this.node.name;
        d_col3.appendChild(h3);
        d_col4.appendChild(h3_name);
        //Update node name
        h3_name.ondblclick = function () {
            var input = new Elem('input', 'form-control col-md-10', [new Attribute('typename', 'text'), new Attribute('value', _this.node.name)]).e;
            jQuery(h3_name).replaceWith(input);
            input.focus();
            input.onblur = function () {
                _this.node.name = input.value;
                var res = _this.ctrlnode.updateModel(new request(Action.update, _this.node));
                h3_name.innerHTML = res.data.name;
                jQuery(input).replaceWith(h3_name);
                //TODO remplacer le nom au niveau du graph
            };
        };
        //Bouton add child
        var b_child = new Elem('button', 'btn btn-success btn-lg', new Attribute('type', 'button')).e;
        var b_child_img = new Elem('img', '', new Attribute('src', '../lib/img/add_child.png')).e;
        b_child.appendChild(b_child_img);
        b_child.onclick = function (e) {
            var res = _this.ctrlgraph.updateModel(new request(Action.update, _this.node));
            _this.popup(res);
        };
        //bouton delete node and children
        var b_delete_child = new Elem('button', 'btn btn-danger btn-lg', new Attribute('type', 'button')).e;
        var b_delete_child_img = new Elem('img', '', new Attribute('src', '../lib/img/delete_node_and_son.png')).e;
        b_delete_child.appendChild(b_delete_child_img);
        b_delete_child.onclick = function (e) {
            var res = _this.ctrlgraph.updateModel(new request(Action.delete, _this.node));
            _this.popup(res);
        };
        //bouton delete node
        var b_delete_node = new Elem('button', 'btn btn-danger btn-lg', new Attribute('type', 'button')).e;
        var b_delete_node_img = new Elem('img', '', new Attribute('src', '../lib/img/delete_node.png')).e;
        b_delete_node.appendChild(b_delete_node_img);
        b_delete_node.onclick = function (e) {
            //  var res = this.ctrlgraph.updateModel(new request(State.delete, this.node));
            // this.popup(res);
        };
        // bouton add attribute
        var b_attribut = new Elem('button', 'btn btn-info btn-lg', new Attribute('type', 'button')).e;
        var b_attribute_img = new Elem('img', '', new Attribute('src', '../lib/img/add_attribute.png')).e;
        b_attribut.appendChild(b_attribute_img);
        b_attribut.onclick = function (e) {
            var att = _this.ctrlattribute.updateModel(new request(Action.update)).ui;
            nodeModal.getbody().appendChild(att.e);
        };
        var button_group = new Elem('div', 'btn-group  pull-right', new Attribute('role', 'group'));
        //ajout des boutons à l'entête
        nodeModal.gethead().appendChild([
            d_row_h.appendChild([
                d_col1.appendChild([new Elem('div', 'row').appendChild([d_col3.e, d_col4.e]).e, this.accordion_user()]).e,
                d_col2.appendChild(button_group.appendChild([b_attribut, b_child, b_delete_child, b_delete_node]).e).e]).e
        ]);
        //MODAL BODY
        //labels des attributs
        var d_row_b = new Elem('div', 'row');
        var titres = ['name', 'value', 'type'];
        titres.forEach(function (t) {
            var label = new Elem('label', 'col-md-3').e;
            label.innerHTML = t;
            d_row_b.appendChild(label);
        });
        nodeModal.getbody().appendChild(d_row_b.e);
        //attributs
        if (this.node.attributes) {
            this.node.attributes.forEach(function (att) {
                nodeModal.getbody().appendChild(new UIAttribute(att).getui().e); //////TODO ICI request pour rester dans le thème //////
            });
        }
    };
    UINode.prototype.popup = function (res) {
        //popup
        var res_popup = this.ctrlpreferencepopup.updateModel(new request(Action.read));
        document.body.appendChild(new UIpopup(new Popup(res.state, res.message, JSON.stringify(res.data), res_popup.data)).getui().e);
    };
    UINode.prototype.accordion_user = function () {
        var div_user = new Elem('div', 'row');
        var group = new Elem('div', 'btn-group');
        var user = new Elem('div', 'btn-group');
        var btn_group = new Elem('button', 'btn btn-default  dropdown-toggle', [new Attribute('data-toggle', 'dropdown'), new Attribute('aria-haspopup', 'true'), new Attribute('aria-expanded', 'false')]);
        btn_group.e.innerHTML = "Groups";
        var span_group = new Elem('span', 'caret');
        var ul_group = new Elem('ul', 'dropdown-menu');
        var btn_user = new Elem('button', 'btn btn-default  dropdown-toggle', [new Attribute('data-toggle', 'dropdown'), new Attribute('aria-haspopup', 'true'), new Attribute('aria-expanded', 'false')]);
        btn_user.e.innerHTML = "Users";
        var ul_user = new Elem('ul', 'dropdown-menu');
        var span_user = new Elem('span', 'caret');
        group.appendChild([btn_group.appendChild(span_group.e).e, ul_group.e]);
        user.appendChild([btn_user.appendChild(span_user.e).e, ul_user.e]);
        /*
            <li><a href="#" onclick => >Action</a></li>
        */
        var accordion = new Elem('div', 'panel-group', [new Attribute('role', 'tablist'), new Attribute('id', 'accordion'), new Attribute('aria-multiselectable', 'true')]);
        var panel_default = new Elem('div', 'panel panel-default');
        var panel_heading = new Elem('div', 'panel-heading', [new Attribute('role', 'tab'), new Attribute('id', 'headingaccess')]);
        var h4 = new Elem('h4', 'panel-title');
        var a = new Elem('a', '', [new Attribute('role', 'button'), new Attribute('data-toggle', 'collapse'), new Attribute('data-parent', '#accordion'), new Attribute('href', '#access'), new Attribute('aria-expanded', 'true'), new Attribute('aria-controls', 'access')]);
        a.e.innerHTML = 'User access';
        var panel_collapse = new Elem('div', 'panel-collapse collapse', [new Attribute('id', 'access'), new Attribute('role', 'tabpanel'), new Attribute('aria-labelledby', 'headingaccess')]);
        var panel_body = new Elem('div', 'panel-body');
        var table = new Elem('table', 'table table-striped');
        var thead = new Elem('thead');
        var trhead = new Elem('tr').e;
        thead.appendChild(trhead);
        var tbody = new Elem('tbody');
        ['Name (group,user)', 'Write', 'Adminstration', 'supprimer'].forEach(function (th_name) {
            var th = new Elem('th').e;
            th.innerHTML = th_name;
            trhead.appendChild(th);
        });
        //TODO ajouter user et séparer les input pour mettre des events
        //users.forEach(u =>{
        //var td_name = new Elem('td'); td_name.e.innerHTML = //u.name
        //var td_write = new Elem('td'); td_write.appendChild(new Elem('input', '', [new Attribute('', ''), new Attribute('', '')]).e);
        //var td_admin = new Elem('td'); td_write.appendChild(new Elem('input', '', [new Attribute('', ''), new Attribute('', '')]).e);
        //var tr = new Elem('tr').appendChild([]);
        //
        //});
        div_user.appendChild(accordion.appendChild(panel_default.appendChild([
            panel_heading.appendChild(h4.appendChild(a.e).e).e,
            panel_collapse.appendChild(panel_body.appendChild([
                group.e, user.e,
                table.appendChild([
                    thead.e,
                    tbody.e]).e
            ]).e).e]).e).e);
        return div_user.e;
    };
    return UINode;
})();
//# sourceMappingURL=UInode.js.map