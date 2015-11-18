class Ctrlgraph{

    private uigraph: UIgraph;
    private graph: Graph;


    public updateView(uigraph: UIgraph) {
        this.uigraph = uigraph;
        this.uigraph.setui(this.graph);
    }
    public updateModel(req: request) {
        switch (req.crud) {
            case Action.create:
                //TODO socket emit -> callback
                break;
            case Action.read:
                //TODO socket emit -> callback
                this.graph = new Graph(1, 'first');
                var b1 = new Branch(1); b1.name = 'branch 1'; b1.color ='#234587';
                var b2 = new Branch(2); b2.name = 'branch 2'; b2.color = '#123120';

                ///////////////////////TEST///////////////////////
                var nodes = new Array<NVNode>();
                var edges = new Array<NVEdge>();

                var n1 = new NVNode(1, 'un',b1, null, null, [new Attribute('one string', 'a string', 'string')], null, null);
                var n2 = new NVNode(2, 'deux', b1, null, null, [new Attribute('one number', '12', 'number')], n1, null);
                var n3 = new NVNode(3, 'trois', b1, null, null, [new Attribute('one boolean', 'true', 'boolean')], n1, null);
                var n4 = new NVNode(4, 'un', b2, null, null, [new Attribute('one string', 'a string', 'string')], null, null);
                var n5 = new NVNode(5, 'deux', b2, null, null, [new Attribute('one number', '12', 'number')], n4, null);
                var n6 = new NVNode(6, 'trois', b2, null, null, [new Attribute('one boolean', 'true', 'boolean')], n4, null);
                var e1 = new NVEdge(1, 'link1', n1, n2);
                var e2 = new NVEdge(2, 'link2', n1, n3);
                var e3 = new NVEdge(1, 'link1', n4, n5);
                var e4 = new NVEdge(2, 'link2', n4, n6);

                nodes.push(n1, n2, n3, n4, n5, n6);
                edges.push(e1, e2, e3, e4);
                this.graph.nodes = nodes;
                this.graph.edges = edges;
                ///////////////////////////////////////////////////


                return new response<Graph>(Status.sucess, 'TEST', this.graph);
                break;
            case Action.update:
                //TODO socket emit -> callback

                ///////////////////////TEST///////////////////////
                var n6 = this.graph.nodes[5];
                var n7 = new NVNode(7, 'quatre', b2, null, null, [new Attribute('one boolean', 'true', 'boolean')], n6, null);
                var e5 = new NVEdge(3, 'link3', n6, n7);

                this.graph.nodes.push(n7);
                this.graph.edges.push(e5);
                //////////////////////////////////////////////////
                                                
                                                
                this.uigraph.redraw(this.graph);                                
                return new response<Graph>(Status.sucess, 'TEST', this.graph, this.uigraph);
                break;
            case Action.delete:
                //TODO socket emit -> callback
                ///////////////////////TEST///////////////////////
                this.graph.nodes.pop();
                this.graph.edges.pop();
                //////////////////////////////////////////////////

                this.uigraph.redraw(this.graph);
                return new response<Graph>(Status.sucess, 'TEST', this.graph, this.uigraph);
                break;
        }
    }
 

}