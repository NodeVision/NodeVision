class Ctrlnode{

    public updateModel(req: request) {
        switch (req.crud) {
            case Action.create:
                //TODO socket emit -> callback
                //if ok
                return new response<NVNode>(Status.sucess, 'node added');
               // else return new response<NVNode>(State.fail, 'problem to add node');
                break;
            case Action.read:
                //TODO socket emit -> callback
                var branch = new Branch(2); branch.name = 'branch 2'; branch.color = '#123120';
                var node = new NVNode(9999, 'TEST',branch, null, null, [new Attribute('TEST', 'TEST', 'TEST')], <NVNode>req.data, null);
                return new response<NVNode>(Status.sucess, 'node', node);
                break;
            case Action.update:
                //TODO socket emit -> callback  
                
                var n = <NVNode>req.data;

                return new response<NVNode>(Status.sucess, 'update node successful', n);
                break;
            case Action.delete:
                //TODO socket emit -> callback
                break;
        }
    }
    
}