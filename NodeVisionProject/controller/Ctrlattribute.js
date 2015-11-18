var Ctrlattribute = (function () {
    function Ctrlattribute() {
    }
    Ctrlattribute.prototype.updateView = function (uiattribute) {
        this.uiattribute = uiattribute;
        this.uiattribute.setui(this.attribute);
    };
    Ctrlattribute.prototype.updateModel = function (req) {
        switch (req.crud) {
            case Action.create:
                //TODO socket emit -> callback
                return new response(Status.sucess, 'attribute create');
                break;
            case Action.read:
                //TODO socket emit -> callback
                var TEST = new Attribute('', '', '');
                return new response(Status.sucess, 'Attribute', TEST);
                break;
            case Action.update:
                //TODO socket emit -> callback
                /////////////////////////////TEST///////////////////////////////
                this.attribute = new Attribute('', '', '');
                this.uiattribute = new UIAttribute(this.attribute);
                ////////////////////////////////////////////////////////////////
                this.updateView(this.uiattribute);
                return new response(Status.sucess, 'Attribute', TEST, this.uiattribute.getui());
                break;
            case Action.delete:
                //TODO socket emit -> callback
                return new response(Status.sucess, 'Attribute delete', req.data);
                break;
        }
    };
    return Ctrlattribute;
})();
//# sourceMappingURL=Ctrlattribute.js.map