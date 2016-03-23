import {PreferencePopup} from './preferencepopup';
import {Status} from '../enum';
import {User} from './user';
export class Log {
    public _type: Status;
    public _message: string;
    public _user: User;
    public _details: string;
    public _preference: PreferencePopup;
    constructor(type: Status, message: string, details: string, preference: PreferencePopup) {
        this._type = type;
        this._message = message;
        this._details = details;
        this._preference = preference;
    }
}