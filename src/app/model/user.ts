import {Branch} from './branch';
import {Attribute} from './attribute';
import {PreferencePopup} from './preferencepopup';
import {NVNode} from './node';
export class User{
        private _id:number;
        private _mail: string;
        private _preferedView : number;
        private _preferencepopup: PreferencePopup;
        private _branchesvisibility: Array<Branch>;
        private _node: NVNode;
        private _socket:string;
        
        constructor(
            mail: string,
            preferedView:number,
            id?:number,
            node?:NVNode,                      
            preferencepopup?:PreferencePopup,
            branchVsblty?:Array<Branch>) {
                this._id = id;
                this._mail = mail;
                this._preferencepopup = preferencepopup;
                this._branchesvisibility = branchVsblty;
                this._preferedView = preferedView;
                this._node = node;
        }
        get id() { return this._id }
        get mail() { return this._mail }
        get preferedView() { return this._preferedView}
        get preferencepopup() { return this._preferencepopup }
        get branchesvisibility() { return this._branchesvisibility }
        get node(){ return this._node }
        set node(node:NVNode){ this._node = node }
        get socket(){return this._socket}
        set socket(socket:string){this._socket = socket}
        set preferedView(view:number) {this._preferedView = view}

    }
   