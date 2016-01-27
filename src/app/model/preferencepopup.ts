
export class PreferencePopup {
    public _activate: boolean;
    public _fadeout: boolean;
    public _details: boolean;
    constructor(activate: boolean, fadeout: boolean, details: boolean) {
        this._activate = activate;
        this._fadeout = fadeout;
        this._details = details;
    }
}