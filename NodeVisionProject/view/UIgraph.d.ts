declare class UIgraph {
    private ctrlgraph;
    private width;
    private height;
    private nodeModal;
    private force;
    private links;
    private nodes;
    private svg;
    private color;
    constructor();
    init(ctrlgraph: Ctrlgraph): void;
    setui(graph: Graph): void;
    add(node: NVNode): void;
    delete(node: NVNode): void;
    redraw(graph: Graph): void;
}
