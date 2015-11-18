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
                //////////////////////////////////////////////////
                return new response(Status.sucess, '');
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