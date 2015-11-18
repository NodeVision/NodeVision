class NVNode implements d3.layout.force.Node{    
        private _id: number;
        private _name: string;
        private _id_owner: Array<User> = new Array<User>();
        private _id_viewer: Array<User> = new Array<User>();
        private _node_attributs: Array<Attribute>;
        private _node_relationships: Array<NVNode> = new Array<NVNode>();
        private _branch: Branch;
        private _parent_node: NVNode;

        x: number;y: number;px: number;py: number;fixed: boolean;weight: number;

        constructor(id: number, name: string, branch: Branch, id_owner: Array<User>, id_viewer: Array<User>, node_attributs: Array<Attribute>, parent_node: NVNode, node_relationships: Array<NVNode>) {
            this._id = id;
            this._name = name;
            this._id_owner = id_owner;
            this._id_viewer = id_viewer;
            this._node_attributs = node_attributs;
            this._parent_node = parent_node;
            this._branch = branch;
            this._node_relationships = node_relationships;
        }

        //get & set
        get name() { return this._name }
        set name(name: string) { this._name = name; }
        get id_node(){ return this._id }
        get parent_node(){ return this._parent_node }
        get attributes(){return this._node_attributs }   
        get viewvers(){return this._id_owner }
        get owners() { return this._id_owner }
        get branch() { return this._branch }

    }
