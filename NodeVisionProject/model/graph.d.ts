declare class Graph extends Observable {
    private id;
    private name;
    private nodes;
    private edges;
    constructor(id: number, name: string);
    getNodes(): NVNode[];
    setNodes(nodes: Array<NVNode>): void;
    getEdges(): NVEdge[];
    setEdges(edges: Array<NVEdge>): void;
}
