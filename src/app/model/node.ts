import {Injectable} from 'angular2/angular2';
import {User} from './user';
import {Attribute} from './attribute';
import {Branch} from './branch';
@Injectable()
export class NVNode implements d3.layout.force.Node{    
        private _id: number;
        private _name: string;
        private _node_attributs: Array<Attribute>;
        private _branch: Branch;

        x: number;y: number;px: number;py: number;fixed: boolean;weight: number;

        constructor(branch: Branch,id?: number, name?: string,node_attributs?: Array<Attribute>) {
            this._id = id;
            this._name = name;
            this._node_attributs = node_attributs;
            this._branch = branch;
        }

        //get & set
        get name() { return this._name }
        set name(name: string) { this._name = name; }
        get id(){ return this._id }
        get attributes(){return this._node_attributs }   
        get branch() { return this._branch }

    }
