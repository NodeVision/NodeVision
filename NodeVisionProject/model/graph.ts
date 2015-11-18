class Graph{
        private _id: number;
        private _name: string;
        private _nodes: Array<NVNode> = new Array<NVNode>();
        private _edges: Array<NVEdge> = new Array<NVEdge>();

        constructor(id: number, name: string) {   
            this._id = id;
            this._name = name;
        }
        
        get nodes(){ return this._nodes;}
        set nodes(nodes: Array<NVNode>){this._nodes = nodes;}
        get edges(){ return this._edges;}
        set edges(edges: Array<NVEdge>) { this._edges = edges; }

    }
