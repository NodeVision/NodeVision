import {Injectable} from 'angular2/angular2';
import {User} from './user';
import {Attribute} from './attribute';
import {Branch} from './branch';
@Injectable()
export class NVNode implements d3.layout.force.Node{    
        private _id: number;
        private _name: string;
        private _node_attributs: Array<Attribute>;
        //private _node_relationships: Array<NVNode> = new Array<NVNode>();
        private _branch: Branch;
        //private _parent_node: NVNode;

        index:number;x: number;y: number;px: number;py: number;fixed: boolean;weight: number;

        constructor(id: number, name: string, branch: Branch, node_attributs: Array<Attribute>/*, parent_node: NVNode, node_relationships: Array<NVNode>*/) {
            this._id = this.index = id;
            this._name = name;
            this._node_attributs = node_attributs;
            //this._parent_node = parent_node;
            this._branch = branch;
            //this._node_relationships = node_relationships;
        }

        //get & set
        get name() { return this._name }
        set name(name: string) { this._name = name; }
        get id(){ return this._id }
        //get parent_node(){ return this._parent_node }
        get attributes(){return this._node_attributs }   
        get branch() { return this._branch }
        //get node_relationships() { return this._node_relationships }

    }
