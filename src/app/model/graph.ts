import {Injectable} from 'angular2/angular2';
import {NVNode} from './node';
import {NVEdge} from './edge';
@Injectable()
export class Graph{
        private _id: number;
        private _name: string;
        private _nodes: NVNode[];// = new Array<NVNode>();
        private _edges: NVEdge[];//Array<NVEdge> = new Array<NVEdge>();

        constructor(id: number, name: string) {   
            this._id = id;
            this._name = name;
            this._nodes = [];
            this._edges = [];
        }
        
        get nodes(){ return this._nodes;}
        set nodes(nodes: Array<NVNode>){this._nodes = nodes;}
        get edges(){ return this._edges;}
        set edges(edges: Array<NVEdge>) { this._edges = edges; }
    }
