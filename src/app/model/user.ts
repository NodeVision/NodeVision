import {Injectable} from 'angular2/angular2';
import {Branch} from './branch';
import {PreferencePopup} from './preferencepopup';
@Injectable()
export class User{
        private _matricule: string;
        private _name: string;
        private _firstname: string;
        private _preferencepopup: PreferencePopup;
        private _branchesvisibility: Array<Branch>;
        
        constructor(matricule: string,name: string,firsname: string,preferencepopup:PreferencePopup,branchVsblty? : Array<Branch>) {
            this._matricule = matricule;
            this._name = name;
            this._firstname = firsname;
            this._preferencepopup = preferencepopup;
        }
        get matricule() { return this._matricule }
        get name() { return this._name }
        get firstname() { return this._firstname }
        get preferencepopup() { return this._preferencepopup }
        get branchesvisibility() { return this._branchesvisibility }

    }
    

