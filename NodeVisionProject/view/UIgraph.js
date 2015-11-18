var UIgraph = (function () {
    function UIgraph() {
        var _this = this;
        this.width = 960;
        this.height = 500;
        //appel des modaux
        this.nodeModal = new UIModal(Modal.node);
        this.branchModal = new UIModal(Modal.branch);
        //canvas du graph
        this.force = d3.layout.force().charge(-120).linkDistance(70).size([this.width, this.height]);
        this.svg = d3.select("body").append("svg").attr("width", this.width).attr("height", this.height);
        this.svg.on('contextmenu', function () {
            new UIbranch().setui(_this.branchModal);
        });
    }
    UIgraph.prototype.init = function (ctrlgraph) {
        //appel du controller
        this.ctrlgraph = ctrlgraph;
        //appel du modèle
        var graph = this.ctrlgraph.updateModel(new request(Action.read)).data;
    };
    UIgraph.prototype.setui = function (graph) {
        var _this = this;
        //initialisation du graph           
        this.force
            .nodes(graph.nodes)
            .links(graph.edges)
            .on("tick", function () { return _this.tick(); })
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
            .style('fill', function (n) { return n.branch.color; })
            .style('stroke', function (n) { return n.branch.color; })
            .call(this.force.drag)
            .on("dblclick", function (n) {
            var uinode = new UINode(n, _this.ctrlgraph).setui(n, _this.nodeModal);
        })
            .on("contextmenu", function (n) { });
        this.nodes.append("title")
            .text(function (n) { return n.name; });
    };
    UIgraph.prototype.add = function (node) {
        //appel du modèle
        var graph = this.ctrlgraph.updateModel(new request(Action.update, node)).data;
        //redraw
        this.redraw(graph);
    };
    UIgraph.prototype.delete = function (node) {
        //appel du modèle
        var graph = this.ctrlgraph.updateModel(new request(Action.delete, node)).data;
        //redraw
        this.redraw(graph);
    };
    UIgraph.prototype.redraw = function (graph) {
        var _this = this;
        var links = this.links.data(this.force.links());
        links.enter().insert("line", ".node").attr("class", "link");
        links.exit().remove();
        var node = this.nodes.data(this.force.nodes());
        node.enter().append("circle")
            .attr("class", function (d) { return "node"; })
            .attr("r", 10)
            .call(this.force.drag)
            .on("dblclick", function (n) {
            var uinode = new UINode(n, _this.ctrlgraph).setui(n, _this.nodeModal);
        })
            .on("contextmenu", function (n) { });
        this.nodes.append("title")
            .text(function (n) { return n.name; });
        node.exit().remove();
        this.links = this.svg.selectAll(".link");
        this.nodes = this.svg.selectAll(".node");
        this.force.start();
    };
    UIgraph.prototype.tick = function () {
        this.links.attr("x1", function (e) { return e.source.x; })
            .attr("y1", function (e) { return e.source.y; })
            .attr("x2", function (e) { return e.target.x; })
            .attr("y2", function (e) { return e.target.y; });
        this.nodes.attr("cx", function (n) { return n.x; })
            .attr("cy", function (n) { return n.y; });
    };
    return UIgraph;
})();
//# sourceMappingURL=UIgraph.js.map