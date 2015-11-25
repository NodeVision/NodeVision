var Ctrluser = (function () {
    function Ctrluser() {
    }
    Ctrluser.prototype.updateModel = function (req) {
        switch (req.crud) {
            case Action.create:
                //TODO socket emit -> callback
                break;
            case Action.read:
                //TODO socket emit -> callback
                //////////////////////////////////////////////////
                var branches;
                branches.push(new Branch(1), new Branch(2), new Branch(3), new Branch(4));
                var user = new User('007', 'troquereau', 'benjamin', new PreferencePopup(false, false, false), branches);
                //////////////////////////////////////////////////
                return new response(Status.sucess, 'user', user);
                break;
            case Action.update:
                //TODO socket emit -> callback
                break;
            case Action.delete:
                //TODO socket emit -> callback
                break;
        }
    };
    return Ctrluser;
})();
//# sourceMappingURL=Ctrluser.js.map