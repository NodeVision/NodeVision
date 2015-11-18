var Ctrlnode = (function () {
    function Ctrlnode() {
    }
    Ctrlnode.prototype.updateModel = function (req) {
        switch (req.crud) {
            case Action.create:
                //TODO socket emit -> callback
                //if ok
                return new response(Status.sucess, 'node added');
                // else return new response<NVNode>(State.fail, 'problem to add node');
                break;
            case Action.read:
                //TODO socket emit -> callback
                var branch = new Branch(2);
                branch.name = 'branch 2';
                branch.color = '#123120';
                var node = new NVNode(9999, 'TEST', branch, null, null, [new Attribute('TEST', 'TEST', 'TEST')], req.data, null);
                return new response(Status.sucess, 'node', node);
                break;
            case Action.update:
                //TODO socket emit -> callback  
                var n = req.data;
                return new response(Status.sucess, 'update node successful', n);
                break;
            case Action.delete:
                //TODO socket emit -> callback
                break;
        }
    };
    return Ctrlnode;
})();
//# sourceMappingURL=Ctrlnode.js.map