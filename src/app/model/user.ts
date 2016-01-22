import {Injectable} from 'angular2/angular2';
import {Branch} from './branch';
import {Attribute} from './attribute';
import {NVNode} from './node';
@Injectable()
export class User{
        private _id:number;
        private _mail: string;
        private _branchesvisibility: Array<Branch>;
        private _node: NVNode;
        private _socketID: string;
        
        constructor(
            mail: string,
            id?:number,
            node?:NVNode,
            socketID?:string,                      
            branchVsblty?:Array<Branch>) {
                this._id = id;
                this._mail = mail;
                this._branchesvisibility = branchVsblty;
                this._node = node;
                this._socketID = socketID;
        }
        get id() { return this._id }
        get socketID() { return this._socketID }
        get mail() { return this._mail }
        get branchesvisibility() { return this._branchesvisibility }
        get node(){ return this._node }
        set node(node:NVNode){ this._node = node }

    }
    

