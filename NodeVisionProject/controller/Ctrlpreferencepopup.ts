class Ctrlpreferencepopup {
    private uipreferencepopup: UIpreferencepopup;

    public updateModel(req: request) {
        switch (req.crud) {
            case Action.create:
                //TODO socket emit -> callback
                break;
            case Action.read:

                var preferencePopup = new PreferencePopup(true, false, false);
                return new response<PreferencePopup>(Status.sucess,'',preferencePopup);
                break;
            case Action.update:
                //TODO socket emit -> callback
                //mettre a jour la bdd
                var preferencepopup = <PreferencePopup>req.data

                // réponse de la bdd
                var newpref = preferencepopup;
                if (!newpref._activate) {
                    newpref._details = false;
                    newpref._fadeout = false;
                }
                this.uipreferencepopup = new UIpreferencepopup(newpref);
                return new response<PreferencePopup>(Status.sucess, '', newpref, this.uipreferencepopup);
                break;
            case Action.delete:
                //TODO socket emit -> callback
                break;
        }
    }
}