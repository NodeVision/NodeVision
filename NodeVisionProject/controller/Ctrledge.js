var Ctrledge = (function () {
    function Ctrledge() {
    }
    Ctrledge.prototype.updateModel = function (req) {
        switch (req.crud) {
            case Action.create:
                //TODO socket emit -> callback
                break;
            case Action.read:
                //TODO socket emit -> callback
                break;
            case Action.update:
                //TODO socket emit -> callback
                break;
            case Action.delete:
                //TODO socket emit -> callback
                break;
        }
    };
    return Ctrledge;
})();
//# sourceMappingURL=Ctrledge.js.map