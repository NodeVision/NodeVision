declare class UINode {
    private node;
    private ctrlgraph;
    private ctrlnode;
    private ctrlattribute;
    private attrs;
    constructor(node: NVNode, ctrlgraph: Ctrlgraph);
    setui(node: NVNode, nodeModal: UIModal): void;
}
