import {NVNode} from './node';
import {NVEdge} from './edge';
<<<<<<< HEAD
=======

>>>>>>> 8af129ed4a093e03a15b64892799e9a2f45df1f7
export class Graph{
        private _id: number;
        private _name: string;
        private _nodes: NVNode[];
        private _edges: NVEdge[];

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
