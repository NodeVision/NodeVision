var Ctrlpreferencepopup = (function () {
    function Ctrlpreferencepopup() {
    }
    Ctrlpreferencepopup.prototype.updateModel = function (req) {
        switch (req.crud) {
            case Action.create:
                //TODO socket emit -> callback
                break;
            case Action.read:
                var preferencePopup = new PreferencePopup(true, false, false);
                return new response(Status.sucess, '', preferencePopup);
                break;
            case Action.update:
                //TODO socket emit -> callback
                //mettre a jour la bdd
                var preferencepopup = req.data;
                // réponse de la bdd
                var newpref = preferencepopup;
                if (!newpref._activate) {
                    newpref._details = false;
                    newpref._fadeout = false;
                }
                this.uipreferencepopup = new UIpreferencepopup(newpref);
                return new response(Status.sucess, '', newpref, this.uipreferencepopup);
                break;
            case Action.delete:
                //TODO socket emit -> callback
                break;
        }
    };
    return Ctrlpreferencepopup;
})();
//# sourceMappingURL=Ctrlpreferencepopup.js.map