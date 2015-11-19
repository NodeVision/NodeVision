// Attributs des noeuds
class UIAttribute{
    private ctrlattribute = new Ctrlattribute();
    private attribute = new Attribute();

    private div_attribute: Elem<HTMLElement>;
    constructor(attribute: Attribute) {
        //appel du modèle
        this.attribute = this.ctrlattribute.updateModel(new request(Action.read)).data;
        console.log(this.attribute);
        //fabrication de la vue
        this.setui(attribute);
    }
    public setui(attribute: Attribute) {
        //div de l'attribut
        this.div_attribute = new Elem('div', 'form-group row');
        this.display_attribute(new Attribute(attribute.name, attribute.value, attribute.type));
              
        var d_col_4 = new Elem('div', 'col-md-1');
        var trash = new Elem('span', 'glyphicon glyphicon-trash', new Attribute('aria-hidden', 'true')).e;
        //delete attribute
        trash.onclick = (e) => {
            var res = this.ctrlattribute.updateModel(new request(Action.delete, this.attribute));
            console.log(this.ctrlattribute);
            console.log(res);
            if (res.state == Status.sucess) this.div_attribute.e.remove();
        }
        this.div_attribute.appendChild(d_col_4.appendChild(trash).e).e;
    }
    public getui() {  return this.div_attribute; }

    public display_attribute(attributes: Attribute) {
        var input_name = <HTMLInputElement>new Elem('input', 'form-control', [new Attribute('value', attributes.name), new Attribute('typeName', 'text')]).e;
        var d_col_1 = new Elem('div', 'col-md-3');
        var input_value = <HTMLInputElement>new Elem('input', 'form-control', [new Attribute('value', attributes.value), new Attribute('typeName', 'text')]).e;
        var d_col_2 = new Elem('div', 'col-md-3');
        var input_type = <HTMLInputElement>new Elem('input', 'form-control', [new Attribute('value', attributes.type), new Attribute('typeName', 'text')]).e;
        var d_col_3 = new Elem('div', 'col-md-3');
         
        //input update
        input_name.onblur = (e) => {
            this.attribute.name = input_name.value;
            var res = this.ctrlattribute.updateModel(new request(Action.update, this.attribute));
            input_name.value = res.data.name;
        }
        input_value.onblur = (e) => {
           this.attribute.value = input_value.value;
           var res = this.ctrlattribute.updateModel(new request(Action.update, this.attribute));
           input_value.value = <string>res.data.value;
       }
        input_type.onblur = (e) => {
            this.attribute.type = input_type.value;
           var res = this.ctrlattribute.updateModel(new request(Action.update, this.attribute));
           input_type.value = res.data.type;
       }   
       d_col_1.appendChild(input_name)
       d_col_2.appendChild(input_value)
       d_col_3.appendChild(input_type)
       this.div_attribute.appendChild([d_col_1.e, d_col_2.e, d_col_3.e]);;
    }
}