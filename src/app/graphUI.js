var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var user_1 = require('./model/user');
var branch_1 = require('./model/branch');
var node_1 = require('./model/node');
var edge_1 = require('./model/edge');
var graph_1 = require('./model/graph');
var attribute_1 = require('./model/attribute');
var preferencepopup_1 = require('./model/preferencepopup');
var enum_1 = require('./enum');
var GraphUI = (function () {
    function GraphUI() {
        var _this = this;
        //Container
        this.width = 960;
        this.height = 500;
        //node Modal
        this.nodemodalstate = false;
        this.nodemodal = enum_1.Modal.node;
        //attribut
        this.title_state = false;
        //branch Modal
        this.branchmodalstate = false;
        this.branchmodal = enum_1.Modal.branch;
        this.branch = new branch_1.Branch();
        //navbar
        this.branches = new Array();
        this.test(); //TODO remove appel de la base de données  
        //navbar branches
        this.graph.nodes.forEach(function (n) {
            if (_this.branches.indexOf(n.branch) == -1) {
                _this.branches.push(n.branch);
            }
        });
        //canvas du graph
        this.force = d3.layout.force().charge(-120).linkDistance(70).size([this.width, this.height]);
        this.svg = d3.select("body").append("svg").attr("width", this.width).attr("height", this.height);
        this.svg
            .on("mouseup", function () { _this.mouseup(); })
            .on('contextmenu', function () { _this.branchmodalstate = true; });
        this.init_graph();
    }
    GraphUI.prototype.init_graph = function () {
        var _this = this;
        //initialisation du graph           
        this.force
            .nodes(this.graph.nodes)
            .links(this.graph.edges)
            .on("tick", function () { return _this.tick(); })
            .start();
        this.links = this.svg.selectAll(".link")
            .data(this.graph.edges)
            .enter().append("line")
            .attr("class", "link")
            .on("click", function (e) { _this.edge = e; });
        this.nodes = this.svg.selectAll(".node")
            .data(this.graph.nodes)
            .enter().append("circle")
            .attr("class", "node")
            .attr("r", 10)
            .style('fill', function (n) { return n.branch.color; })
            .style('stroke', function (n) { return n.branch.color; })
            .on("mousedown", function (n) { _this.mousedown(n); })
            .on("mouseover", function (n) { _this.mouseover(n); })
            .on("click", function (n) { _this.node = n; })
            .on("dblclick", function (n) { _this.nodemodalstate = true; });
        this.nodes.append("title").text(function (n) { return n.name; });
    };
    GraphUI.prototype.mouseover = function (n) {
        if (this.new_link) {
            this.add_edge(this.node, n);
        }
    };
    GraphUI.prototype.mousedown = function (n) {
        var _this = this;
        if (d3.event.ctrlKey) {
            this.new_link = true;
            this.line = this.svg.append("line")
                .attr("class", "link")
                .attr("x1", n.x)
                .attr("y1", n.y)
                .attr("x2", n.x)
                .attr("y2", n.y);
            this.svg.on("mousemove", function () { _this.mousemove(); });
        }
    };
    GraphUI.prototype.mousemove = function () {
        this.m = d3.mouse(d3.event.currentTarget);
        this.line.attr("x2", this.m[0])
            .attr("y2", this.m[1]);
    };
    GraphUI.prototype.mouseup = function () {
        if (d3.event.ctrlKey) {
            this.new_link = false;
            this.svg.on("mousemove", null);
            this.line.attr("class", "drag_line_hidden");
        }
    };
    GraphUI.prototype.redraw = function () {
        var _this = this;
        var links = this.links.data(this.force.links());
        links.enter().insert("line", ".node").attr("class", "link");
        links.exit().remove();
        var nodes = this.nodes.data(this.force.nodes());
        nodes.enter().append("circle")
            .attr("class", "node")
            .attr("r", 10)
            .style('fill', function (n) { return n.branch.color; })
            .style('stroke', function (n) { return n.branch.color; })
            .on("click", function (n) { _this.node = n; })
            .on("dblclick", function (n) { _this.nodemodalstate = true; });
        this.nodes.append("title").text(function (n) { return n.name; });
        nodes.exit().remove();
        this.links = this.svg.selectAll(".link");
        this.nodes = this.svg.selectAll(".node");
        this.force.start();
    };
    GraphUI.prototype.tick = function () {
        this.links.attr("x1", function (e) { return e.source.x; })
            .attr("y1", function (e) { return e.source.y; })
            .attr("x2", function (e) { return e.target.x; })
            .attr("y2", function (e) { return e.target.y; });
        this.nodes.attr("cx", function (n) { return n.x; })
            .attr("cy", function (n) { return n.y; });
    };
    GraphUI.prototype.add_edge = function (source, target) {
        //ajouter a la base de données récup l'id
        this.graph.edges.push(new edge_1.NVEdge(2264, 'undfined', source, target));
        this.redraw();
    };
    GraphUI.prototype.add_attribute = function () {
        this.node.attributes.push(new attribute_1.Attribute('', '', ''));
    };
    GraphUI.prototype.delete_attribute = function (attribute) {
        this.node.attributes.splice(this.node.attributes.indexOf(attribute), 1);
    };
    GraphUI.prototype.add_node = function () {
        //appel bdd (TEST)
        var node = new node_1.NVNode(9999, 'test', this.node.branch, this.node.owners, this.node.viewvers, null, this.node, null); //TODO Rempalcer
        var edge = new edge_1.NVEdge(9999, 'blabla', this.node, node); //TODO Rempalcer
        //reconstruction
        this.graph.nodes.push(node);
        this.graph.edges.push(edge);
        this.redraw();
    };
    GraphUI.prototype.delete_node = function () {
        var _this = this;
        console.log(this.graph);
        //this.graph.edges.splice(this.graph.edges.findIndex(x => x.source.id_node == this.node.id_node),1);
        //this.graph.edges.splice(this.graph.edges.findIndex(x => x.target.id_node == this.node.id_node),1);
        this.graph.nodes.splice(this.graph.nodes.indexOf(this.node), 1);
        console.log(this.graph);
        var toSplice = this.graph.edges.filter(function (l) { return (l.source === _this.node) || (l.target === _this.node); });
        toSplice.map(function (l) { _this.graph.edges.splice(_this.graph.edges.indexOf(l), 1); });
        this.redraw();
    };
    GraphUI.prototype.delete_node_and_sons = function () {
    };
    GraphUI.prototype.update_node = function (node_name) {
        this.node.name = node_name;
        this.title_state = false;
    };
    GraphUI.prototype.add_user_or_group = function () {
    };
    GraphUI.prototype.delete_user_or_group = function () {
    };
    GraphUI.prototype.update_user_or_group = function () {
    };
    GraphUI.prototype.show_branch = function (branch) {
    };
    GraphUI.prototype.add_branch = function (name, color) {
        if (this.branch == null)
            var br = new branch_1.Branch();
        else
            var br = this.branch;
        this.branch.name = name;
        this.branch.color = 'ffffff';
        var nd = new node_1.NVNode(13, "Nouveau noeud", br, this.allUsers, this.allUsers, null, null, null);
        this.branches.push(br);
        this.graph.nodes.push(nd);
        this.redraw();
        this.branchmodalstate = false;
    };
    GraphUI.prototype.update_branch = function (branch) {
        this.branchmodalstate = true;
        this.branch = branch;
    };
    GraphUI.prototype.update_users_node = function (user) {
    };
    GraphUI.prototype.delete_branch = function (branch) {
        var _this = this;
        //trouver le noeud parent le plus élevé et faire this.delete_node_and_sons
        var nodesbranch = Array();
        this.graph.nodes.forEach(function (element) {
            if (element.branch == branch) {
                nodesbranch.push(element);
            }
        });
        //supprime la branche(groupe)
        this.branches.splice(this.branches.indexOf(nodesbranch[0].branch), 1);
        //supprime les edges de la branche
        nodesbranch.forEach(function (elt) {
            _this.graph.edges.forEach(function (element) {
                if (element.source == elt || element.target == elt)
                    _this.graph.edges.splice(_this.graph.edges.indexOf(element), 1);
            });
        });
        //supprime les noeuds de la branche
        nodesbranch.forEach(function (element) {
            _this.graph.nodes.splice(_this.graph.nodes.indexOf(element), 1);
        });
        console.log(this.graph.nodes);
        this.redraw();
    };
    GraphUI.prototype.delete_edge = function () {
    };
    GraphUI.prototype.update_edge = function () {
    };
    GraphUI.prototype.test = function () {
        ///////////////////////TEST///////////////////////
        this.allUsers = [new user_1.User('0002', 'laumondais', 'thomas', null, null),
            new user_1.User('0003', 'chaumont', 'pierre', null, null),
            new user_1.User('0004', 'chipaux', 'germain', null, null),
            new user_1.User('0005', 'thomas', 'valentin', null, null),
            new user_1.User('0005', 'wahiba', 'bidah', null, null)];
        this.graph = new graph_1.Graph(1, 'first');
        var b1 = new branch_1.Branch();
        b1.name = 'branch 1';
        b1.color = '#234587';
        var b2 = new branch_1.Branch();
        b2.name = 'branch 2';
        b2.color = '#123120';
        var nodes = new Array();
        var edges = new Array();
        var n1 = new node_1.NVNode(1, 'un', b1, null, null, [new attribute_1.Attribute('one string', 'a string', 'string')], null, null);
        var n2 = new node_1.NVNode(2, 'deux', b1, null, null, [new attribute_1.Attribute('one number', '12', 'number')], n1, null);
        var n3 = new node_1.NVNode(3, 'trois', b1, null, null, [new attribute_1.Attribute('one boolean', 'true', 'boolean')], n1, null);
        var n4 = new node_1.NVNode(4, 'un', b2, null, null, [new attribute_1.Attribute('one string', 'a string', 'string')], null, null);
        var n5 = new node_1.NVNode(5, 'deux', b2, null, null, [new attribute_1.Attribute('one number', '12', 'number')], n4, null);
        var n6 = new node_1.NVNode(6, 'trois', b2, null, null, [new attribute_1.Attribute('one boolean', 'true', 'boolean')], n4, null);
        var e1 = new edge_1.NVEdge(1, 'link1', n1, n2);
        var e2 = new edge_1.NVEdge(2, 'link2', n1, n3);
        var e3 = new edge_1.NVEdge(3, 'link3', n4, n5);
        var e4 = new edge_1.NVEdge(4, 'link4', n4, n6);
        nodes.push(n1, n2, n3, n4, n5, n6);
        edges.push(e1, e2, e3, e4);
        this.graph.nodes = nodes;
        this.graph.edges = edges;
        ///////////////////////////////////////////////////
        this.node = new node_1.NVNode(1, 'fire', b1, [new user_1.User('0001', 'troquereau', 'benjamin', new preferencepopup_1.PreferencePopup(true, false, false))], [new user_1.User('0001', 'troquereau', 'benjamin', new preferencepopup_1.PreferencePopup(true, false, false))], [new attribute_1.Attribute('Test', 'Test', 'Test')], null, null);
        ///////////////////////////////////////////////////
    };
    GraphUI = __decorate([
        angular2_1.View({
            templateUrl: 'app/graphUI.html',
            directives: [angular2_1.CORE_DIRECTIVES]
        }),
        angular2_1.Component({
            selector: 'graph'
        }), 
        __metadata('design:paramtypes', [])
    ], GraphUI);
    return GraphUI;
})();
exports.GraphUI = GraphUI;
angular2_1.bootstrap(GraphUI);
//# sourceMappingURL=graphUI.js.map