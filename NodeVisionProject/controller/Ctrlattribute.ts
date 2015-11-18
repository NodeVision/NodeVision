class Ctrlattribute{

    private uiattribute: UIAttribute;
    private attribute: Attribute;


    public updateView(uiattribute: UIAttribute) {
        this.uiattribute = uiattribute;
        this.uiattribute.setui(this.attribute);
    }

    public updateModel(req: request) {
        switch (req.crud) {
            case Action.create:
                //TODO socket emit -> callback
                return new response<Attribute>(Status.sucess, 'attribute create');
                break;
            case Action.read:
                //TODO socket emit -> callback
                var TEST = new Attribute('', '', '');
                return new response<Attribute>(Status.sucess, 'Attribute',TEST);
                break;
            case Action.update:
                //TODO socket emit -> callback

                /////////////////////////////TEST///////////////////////////////
                this.attribute = new Attribute('', '', '');
                this.uiattribute = new UIAttribute(this.attribute);
                ////////////////////////////////////////////////////////////////

                this.updateView(this.uiattribute);
                return new response<Attribute>(Status.sucess, 'Attribute', TEST,this.uiattribute.getui());
                break;
            case Action.delete:
                //TODO socket emit -> callback
                return new response<Attribute>(Status.sucess, 'Attribute delete', <Attribute>req.data);
                break;
        }
    }

}