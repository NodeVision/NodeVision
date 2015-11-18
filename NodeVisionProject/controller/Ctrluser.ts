class Ctrluser{

    public updateModel(req: request) {
        switch (req.crud) {
            case Action.create:
                //TODO socket emit -> callback
                break;
            case Action.read:
                //TODO socket emit -> callback
                //////////////////////////////////////////////////

                //////////////////////////////////////////////////
                return new response<User>(Status.sucess, '');
                break;
            case Action.update:
                //TODO socket emit -> callback
                break;
            case Action.delete:
                //TODO socket emit -> callback
                break;
        }
    }
}