class UIgraph {
    private ctrlgraph: Ctrlgraph;
    private width: number = 960;
    private height: number = 500;
    private nodeModal: UIModal;
    private branchModal: UIModal;
    private force: d3.layout.Force<d3.layout.force.Link<d3.layout.force.Node>, d3.layout.force.Node>;
    private links: d3.Selection<d3.layout.force.Link<d3.layout.force.Node>>;
    private nodes: d3.Selection< d3.layout.force.Node>;
    private svg : d3.Selection<any>;

    constructor() {
        //appel des modaux
        this.nodeModal = new UIModal(Modal.node);
        this.branchModal = new UIModal(Modal.branch);

        //canvas du graph
        this.force = d3.layout.force().charge(-120).linkDistance(70).size([this.width, this.height]);
        this.svg = d3.select("body").append("svg").attr("width", this.width).attr("height", this.height);
        this.svg.on('contextmenu', () => {
            new UIbranch().setui(this.branchModal);
        });                  
    }
    public init(ctrlgraph: Ctrlgraph) {
        //appel du controller
        this.ctrlgraph = ctrlgraph;
        //appel du modèle
        var graph = this.ctrlgraph.updateModel(new request(Action.read)).data;  
    }

    public setui(graph: Graph) {
        //initialisation du graph           
        this.force
            .nodes(graph.nodes)
            .links(graph.edges)
            .on("tick",() => this.tick())
            .start();

        this.links = this.svg.selectAll(".link")
            .data(graph.edges)
            .enter().append("line")
            .attr("class", "link");
        this.nodes = this.svg.selectAll(".node")
            .data(graph.nodes)
            .enter().append("circle")
            .attr("class", "node")
            .attr("r", 10)
            .style('fill', (n: NVNode) => { return n.branch.color })
            .style('stroke', (n: NVNode) => { return n.branch.color })
            .call(this.force.drag)
            .on("dblclick", (n: NVNode) => {
                var uinode = new UINode(n, this.ctrlgraph).setui(n,this.nodeModal);
            })
            .on("contextmenu", (n: NVNode) => { });
            this.nodes.append("title")
                .text((n: NVNode) => { return n.name; });

    }
    public add(node: NVNode) {
        //appel du modèle
        var graph = this.ctrlgraph.updateModel(new request(Action.update, node)).data;
        //redraw
        this.redraw(graph);
    }
    public delete(node: NVNode) {
        //appel du modèle
        var graph = this.ctrlgraph.updateModel(new request(Action.delete, node)).data;
        //redraw
        this.redraw(graph);
    }
    public redraw(graph: Graph) {

        var links = this.links.data(this.force.links());
        links.enter().insert("line", ".node").attr("class", "link");
        links.exit().remove();

        var node = this.nodes.data(this.force.nodes());
        node.enter().append("circle")
            .attr("class", (d) => { return "node" })
            .attr("r", 10)
            .call(this.force.drag)
            //.style('fill', (n: NVNode) => { return n.getbranch().getcolor() })
            //.style('stroke', (n: NVNode) => { return n.getbranch().getcolor() })
            .on("dblclick", (n: NVNode) => {
                var uinode = new UINode(n, this.ctrlgraph).setui(n, this.nodeModal);
            })
            .on("contextmenu", (n: NVNode) => { });
                this.nodes.append("title")
            .text((n: NVNode) => { return n.name; });


        node.exit().remove();
        this.links = this.svg.selectAll(".link");
        this.nodes = this.svg.selectAll(".node");
        this.force.start();
    }
    public tick() {
        
        this.links.attr("x1", (e: NVEdge) => { return e.source.x; })
            .attr("y1", (e: NVEdge) => { return e.source.y; })
            .attr("x2", (e: NVEdge) => { return e.target.x; })
            .attr("y2", (e: NVEdge) => { return e.target.y; })

        this.nodes.attr("cx", (n: NVNode) => { return n.x; })
            .attr("cy", (n: NVNode) => { return n.y; });
      
    }
}