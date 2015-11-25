var Ctrlbranch = (function () {
    function Ctrlbranch() {
    }
    Ctrlbranch.prototype.updateModel = function (req) {
        switch (req.crud) {
            case Action.create:
                //TODO socket emit -> callback
                //////////////////////////////////////////////////////////
                var branch = new Branch(999); //last number de la database;
                branch.name = 'undefined';
                //////////////////////////////////////////////////////////
                return new response(Status.sucess, 'new branch', branch);
                break;
            case Action.read:
                //TODO socket emit -> callback
                break;
            case Action.update:
                //TODO socket emit -> callback
                //////////////////////////////////////////////////////////
                var branch = req.data;
                //////////////////////////////////////////////////////////
                return new response(Status.sucess, 'branch update', branch);
                break;
            case Action.delete:
                //TODO socket emit -> callback
                break;
        }
    };
    return Ctrlbranch;
})();
//# sourceMappingURL=Ctrlbranch.js.map