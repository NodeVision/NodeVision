declare enum EDGE_TYPE {
    hierarchy = 0,
    custom = 1,
}
declare class NVEdge extends Observable implements d3.layout.force.Link<d3.layout.force.Node> {
    private id;
    private name;
    source: NVNode;
    target: NVNode;
    constructor(id: number, name: string, source: NVNode, target: NVNode);
}
