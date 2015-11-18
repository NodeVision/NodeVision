declare class NVNode extends Observable implements d3.layout.force.Node {
    private id;
    private name;
    private id_owner;
    private id_viewer;
    private node_attributs;
    private node_relationships;
    private parent_node;
    x: number;
    y: number;
    px: number;
    py: number;
    fixed: boolean;
    weight: number;
    constructor(id: number, name: string, id_owner: Array<User>, id_viewer: Array<User>, node_attributs: Array<Attribute>, parent_node: NVNode, node_relationships: Array<NVNode>);
    getname(): string;
    getid_node(): number;
    getparent_node(): NVNode;
    getattributes(): Attribute[];
    getviewvers(): User[];
    getowners(): User[];
}
