// Attributs des noeuds
var UIAttribute = (function () {
    function UIAttribute(attribute) {
        this.ctrlattribute = new Ctrlattribute();
        this.attribute = new Attribute();
        //appel du modèle
        this.attribute = this.ctrlattribute.updateModel(new request(Action.read)).data;
        console.log(this.attribute);
        //fabrication de la vue
        this.setui(attribute);
    }
    UIAttribute.prototype.setui = function (attribute) {
        var _this = this;
        //div de l'attribut
        this.div_attribute = new Elem('div', 'form-group row');
        this.display_attribute(new Attribute(attribute.name, attribute.value, attribute.type));
        var d_col_4 = new Elem('div', 'col-md-1');
        var trash = new Elem('span', 'glyphicon glyphicon-trash', new Attribute('aria-hidden', 'true')).e;
        //delete attribute
        trash.onclick = function (e) {
            var res = _this.ctrlattribute.updateModel(new request(Action.delete, _this.attribute));
            console.log(_this.ctrlattribute);
            console.log(res);
            if (res.state == Status.sucess)
                _this.div_attribute.e.remove();
        };
        this.div_attribute.appendChild(d_col_4.appendChild(trash).e).e;
    };
    UIAttribute.prototype.getui = function () { return this.div_attribute; };
    UIAttribute.prototype.display_attribute = function (attributes) {
        var _this = this;
        var input_name = new Elem('input', 'form-control', [new Attribute('value', attributes.name), new Attribute('typeName', 'text')]).e;
        var d_col_1 = new Elem('div', 'col-md-3');
        var input_value = new Elem('input', 'form-control', [new Attribute('value', attributes.value), new Attribute('typeName', 'text')]).e;
        var d_col_2 = new Elem('div', 'col-md-3');
        var input_type = new Elem('input', 'form-control', [new Attribute('value', attributes.type), new Attribute('typeName', 'text')]).e;
        var d_col_3 = new Elem('div', 'col-md-3');
        //input update
        input_name.onblur = function (e) {
            _this.attribute.name = input_name.value;
            var res = _this.ctrlattribute.updateModel(new request(Action.update, _this.attribute));
            input_name.value = res.data.name;
        };
        input_value.onblur = function (e) {
            _this.attribute.value = input_value.value;
            var res = _this.ctrlattribute.updateModel(new request(Action.update, _this.attribute));
            input_value.value = res.data.value;
        };
        input_type.onblur = function (e) {
            _this.attribute.type = input_type.value;
            var res = _this.ctrlattribute.updateModel(new request(Action.update, _this.attribute));
            input_type.value = res.data.type;
        };
        d_col_1.appendChild(input_name);
        d_col_2.appendChild(input_value);
        d_col_3.appendChild(input_type);
        this.div_attribute.appendChild([d_col_1.e, d_col_2.e, d_col_3.e]);
        ;
    };
    return UIAttribute;
})();
//# sourceMappingURL=UIattribute.js.map