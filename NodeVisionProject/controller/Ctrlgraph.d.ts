declare class Ctrlgraph implements Observer {
    private uigraph;
    private graph;
    updateView(uigraph: UIgraph): void;
    updateModel(req: request): response<Graph>;
}
