class Ctrlbranch {

    public updateModel(req: request) {
        switch (req.crud) {
            case Action.create:
                //TODO socket emit -> callback
                //////////////////////////////////////////////////////////
                var branch = new Branch(999);//last number de la database;
                branch.name = 'undefined';
                //////////////////////////////////////////////////////////


                return new response<Branch>(Status.sucess, 'new branch', branch);
                break;
            case Action.read:
                //TODO socket emit -> callback
                break;
            case Action.update:
                //TODO socket emit -> callback
                //////////////////////////////////////////////////////////
                var branch = <Branch>req.data;
                //////////////////////////////////////////////////////////

                return new response<Branch>(Status.sucess, 'branch update', branch);
                break;
            case Action.delete:
                //TODO socket emit -> callback
                break;
        }
    }
}