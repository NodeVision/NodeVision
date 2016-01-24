import {Injectable} from 'angular2/angular2';
import {Branch} from './branch';
import {Attribute} from './attribute';
import {PreferencePopup} from './preferencepopup';
import {NVNode} from './node';
@Injectable()
export class User{
        private _id:number;
        private _mail: string;
        private _preferencepopup: PreferencePopup;
        private _branchesvisibility: Array<Branch>;
        private _node: NVNode;
        
        constructor(
            mail: string,
            id?:number,
            node?:NVNode,                      
            preferencepopup?:PreferencePopup,
            branchVsblty?:Array<Branch>) {
                this._id = id;
                this._mail = mail;
                this._preferencepopup = preferencepopup;
                this._branchesvisibility = branchVsblty;
                this._node = node;
        }
        get id() { return this._id }
        get mail() { return this._mail }
        get preferencepopup() { return this._preferencepopup }
        get branchesvisibility() { return this._branchesvisibility }
        get node(){ return this._node }
        set node(node:NVNode){ this._node = node }

    }
    

