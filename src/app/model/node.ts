import {User} from './user';
import {Attribute} from './attribute';
import {Branch} from './branch';
export class NVNode implements d3.layout.force.Node{    
        private _id: number;
        private _name: string;
        private _node_attributs: Array<Attribute>;
        private _branch: Branch;
        private _users: Array<User>;
        private _node : NVNode;
        private _image_path: string;

        index: number;x: number;y: number;px: number;py: number;fixed: boolean;weight: number;

        constructor(branch: Branch,id?: number, name?: string,node_attributs?: Array<Attribute>,users?:Array<User>,image_path?:string) {
            this._id = id;
            this._name = name;
            this._node_attributs = node_attributs;
            this._branch = branch;
            this._users = users;
            this._image_path = image_path;
        }
        //get & set
        get name() { return this._name }
        set name(name: string) { this._name = name; }
        set id(id:number){ this._id = id }
        get id(){ return this._id }
        get attributes(){return this._node_attributs }   
        get branch() { return this._branch }
        get users() { return this._users }
        get image_path() { return this._image_path }
        set image_path(image_path:string) { this._image_path = image_path }
    }
