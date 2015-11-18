class Popup {
    public _type: Status;
    public _message: string;
    public _details: string;
    public _preference: PreferencePopup;
    constructor(type: Status, message: string, details: string, preference: PreferencePopup) {
        this._type = type;
        this._message = message;
        this._details = details;
        this._preference = preference;
    }
}