var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
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
var enum_1 = require('./enum');
var enum_2 = require('./enum');
var GraphUI = (function () {
    function GraphUI() {
        var _this = this;
        //Container
        this.url = "http://localhost:7474/db/data/"; //http://5.196.66.87
        this.width = 960;
        this.height = 500;
        //node Modal
        this.nodemodalstate = false;
        this.nodemodal = enum_1.Element.node;
        //attribut
        this.title_state = false;
        //branch Modal
        this.branchmodalstate = false;
        this.branchmodal = enum_1.Element.branch;
        this.branch = new branch_1.Branch();
        //navbar
        this.branches = new Array();
        this.test(); //TODO remove appel de la base de données  
        //navbar branches
        var b = new Array();
        this.graph.nodes.forEach(function (n) {
            b.push(n.branch);
        });
        b.forEach(function (br) {
            if (!_this.found(_this.branches, br.id)) {
                _this.branches.push(br);
            }
        });
        //canvas du graph
        this.force = d3.layout.force().charge(-120).linkDistance(70).size([this.width, this.height]);
        this.svg = d3.select("body").append("svg").attr("width", this.width).attr("height", this.height);
        this.svg
            .on('contextmenu', function () { _this.branchmodalstate = true; _this.branch = new branch_1.Branch('', '', 'Standard'); });
        this.init_graph();
        console.log(this.graph.nodes);
        console.log(this.nodes);
    }
    /** This is a description of the  function. */
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
            .attr("id", function (n) { return n.id; })
            .style('fill', function (n) { return n.branch.color; })
            .style('stroke', function (n) { return n.branch.color; })
            .on("mousedown", function (n) { _this.mousedown(n); })
            .call(this.force.drag)
            .on("mouseup", function (n) { _this.mouseupNode(n); })
            .call(this.force.drag)
            .on("dblclick", function (n) { _this.nodemodalstate = true; });
        this.nodes.append("title").text(function (n) { return n.name; });
    };
    /** This is a description of the  function. */
    GraphUI.prototype.redraw = function () {
        var _this = this;
        this.links = this.svg.selectAll(".link");
        var links = this.links.data(this.force.links());
        links.enter().insert("line", ".node").attr("class", "link");
        links.exit().remove();
        var nodes = this.nodes.data(this.force.nodes());
        nodes.enter().append("circle")
            .attr("class", "node")
            .attr("r", 10)
            .style('fill', function (n) { return n.branch.color; })
            .style('stroke', function (n) { return n.branch.color; })
            .on("mousedown", function (n) { _this.mousedown(n); })
            .on("mouseup", function (n) { _this.mouseupNode(n); })
            .call(this.force.drag)
            .on("dblclick", function (n) { _this.nodemodalstate = true; });
        this.nodes.append("title").text(function (n) { return n.name; });
        nodes.exit().remove();
        this.links = this.svg.selectAll(".link");
        this.nodes = this.svg.selectAll(".node");
        this.force.start();
    };
    /** This is a description of the  function. */
    GraphUI.prototype.tick = function () {
        this.links.attr("x1", function (e) { return e.source.x; })
            .attr("y1", function (e) { return e.source.y; })
            .attr("x2", function (e) { return e.target.x; })
            .attr("y2", function (e) { return e.target.y; });
        this.nodes.attr("cx", function (n) { return n.x; })
            .attr("cy", function (n) { return n.y; });
    };
    /** This is a description of the  function. */
    GraphUI.prototype.mouseupNode = function (n) {
        if (this.new_link) {
            this.add_edge(this.node, n);
            this.redraw();
            this.svg.on("mousemove", null);
            this.new_link = false;
        }
        this.nodes.call(this.force.drag);
    };
    /** This is a description of the  function. */
    GraphUI.prototype.mousedown = function (n) {
        var _this = this;
        this.node = n;
        if (d3.event.ctrlKey) {
            this.nodes
                .on('mousedown.drag', null)
                .on('touchstart.drag', null);
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
    /** This is a description of the  function. */
    GraphUI.prototype.mousemove = function () {
        this.m = d3.mouse(d3.event.currentTarget);
        this.line
            .attr("x2", this.m[0])
            .attr("y2", this.m[1]);
    };
    /** This is a description of the  function. */
    GraphUI.prototype.add_edge = function (source, target) {
        //ajouter a la base de données récup l'id  
        if (source != target) {
            var edge = new edge_1.NVEdge(2264, 'undfined', source, target);
            this.graph.edges.push(edge);
            this.query(enum_2.Action.create, edge);
        }
    };
    /** This is a description of the  function. */
    GraphUI.prototype.add_attribute = function () {
        this.node.attributes.push(new attribute_1.Attribute('', '', ''));
    };
    /** This is a description of the  function. */
    GraphUI.prototype.delete_attribute = function (attribute) {
        this.node.attributes.splice(this.node.attributes.indexOf(attribute), 1);
    };
    /** This is a description of the  function. */
    GraphUI.prototype.add_node = function () {
        //appel bdd (TEST)
        this.query(enum_2.Action.create, new node_1.NVNode(new branch_1.Branch('test', 'ff47f5', 'Standard')));
        var node = new node_1.NVNode(this.node.branch, 9999, 'test', Array()); //TODO Rempalcer
        var edge = new edge_1.NVEdge(9999, 'blabla', this.node, node); //TODO Rempalcer
        //reconstruction
        this.graph.nodes.push(node);
        this.graph.edges.push(edge);
        this.redraw();
    };
    /** This is a description of the  function. */
    GraphUI.prototype.delete_node = function () {
        var _this = this;
        this.query(enum_2.Action.delete, this.node);
        this.nodes[0].splice(this.graph.nodes.indexOf(this.node), 1);
        jQuery("#" + this.node.id).remove();
        this.graph.nodes.splice(this.graph.nodes.indexOf(this.node), 1);
        var toSplice = this.graph.edges.filter(function (l) { return (l.source === _this.node) || (l.target === _this.node); });
        toSplice.map(function (l) { _this.graph.edges.splice(_this.graph.edges.indexOf(l), 1); });
        this.nodemodalstate = false;
        this.redraw();
    };
    /** This is a description of the  function. */
    GraphUI.prototype.delete_node_and_sons = function () {
    };
    /** This is a description of the  function. */
    GraphUI.prototype.update_node = function (node_name) {
        this.node.name = node_name;
        this.title_state = false;
    };
    /** This is a description of the  function. */
    GraphUI.prototype.show_branch = function (branch) {
    };
    /** This is a description of the  function. */
    GraphUI.prototype.add_branch = function (name, color) {
        this.branch.name = name;
        this.branch.color = color;
        this.query(enum_2.Action.create, this.branch);
        var nd = new node_1.NVNode(this.branch, 13, "Nouveau noeud", Array());
        //TODO ATTENTION nd sort de ma poche
        this.branches.push(this.branch);
        this.graph.nodes.push(nd);
        this.redraw();
        this.branchmodalstate = false;
    };
    /** This is a description of the  function. */
    GraphUI.prototype.update_branch = function (branch) {
        this.branchmodalstate = true;
        this.branch = branch;
    };
    /** This is a description of the  function. */
    GraphUI.prototype.delete_branch = function (branch) {
        var _this = this;
        this.query(enum_2.Action.delete, branch);
        //trouver le noeud parent le plus élevé et faire this.delete_node_and_sons
        var nodesbranch = Array();
        this.graph.nodes.forEach(function (element) {
            if (element.branch == branch) {
                nodesbranch.push(element);
            }
        });
        //supprime la branche
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
        this.redraw();
    };
    /** This is a description of the  function. */
    GraphUI.prototype.delete_edge = function () {
    };
    /** This is a description of the  function. */
    GraphUI.prototype.update_edge = function () {
    };
    /** This is a description of the  function. */
    GraphUI.prototype.found = function (array, value) {
        var tamp;
        array.forEach(function (element) {
            if (element.id == value)
                tamp = element;
        });
        return tamp;
    };
    /** This is a description of the  function. */
    GraphUI.prototype.query = function (action, element, cypher) {
        var response;
        if (!cypher) {
            switch (action) {
                case enum_2.Action.read:
                    if (element instanceof node_1.NVNode)
                        cypher = "MATCH (n) WHERE id(n)=" + element.id + " RETURN n";
                    if (element instanceof edge_1.NVEdge)
                        cypher = "MATCH ()-[r]-() WHERE id(r)=" + element.id + " RETURN r";
                    break;
                case enum_2.Action.create:
                    if (element instanceof node_1.NVNode)
                        cypher = "MATCH (n),(b) WHERE id(n)=" + this.node.id + " AND id(b)=" + this.node.branch.id + " CREATE n-[r:HIERARCHICAL]->(c:Node {name:'undefined'})<-[re:BELONG]-b RETURN r,c";
                    if (element instanceof edge_1.NVEdge)
                        cypher = "MATCH (s:Node),(t:Node) WHERE id(s)=" + element.source.id + " AND id(t)=" + element.target.id + " CREATE (s)-[r:CUSTOM]->(t) RETURN r";
                    if (element instanceof branch_1.Branch)
                        cypher = "MATCH (u) WHERE u.matricule='" + this.user.matricule + "' CREATE (b:Branch {name:'" + this.branch.name + "',color:'" + this.branch.color + "',type:'" + this.branch.type + "'})-[re:BELONG]->(n:Node {name:'undefined'})<-[r:KNOWS]-u ";
                    if (element instanceof attribute_1.Attribute) {
                        var value = "";
                        switch (element.type) {
                            case 'string':
                                value = "'" + element.value + "'";
                                break;
                            case 'number':
                                value = element.value;
                                break;
                            case 'boolean':
                                value = element.value;
                                break;
                            case 'date':
                                value = "'" + element.value + "'";
                                break;
                        }
                        cypher = "MATCH (n) WHERE id(n)=" + this.node.id + " SET n." + element.name + "=" + value + " RETURN  n";
                    }
                    break;
                case enum_2.Action.update:
                    if (element instanceof node_1.NVNode)
                        cypher = "MATCH (n) WHERE id(n)=" + element.id + " SET n.name ='" + element.name + "'";
                    if (element instanceof edge_1.NVEdge)
                        cypher = "MATCH ()-[r]-() WHERE id(r)=" + element.id + " SET r.name ='" + element.name + "'";
                    if (element instanceof branch_1.Branch)
                        cypher = "MATCH (b) WHERE id(b)=" + element.id + " SET SET b.color ='" + element.color + "' , b.type ='" + element.type + "'";
                    if (element instanceof attribute_1.Attribute) {
                        var value = "";
                        switch (element.type) {
                            case 'string':
                                value = "'" + element.value + "'";
                                break;
                            case 'number':
                                value = element.value;
                                break;
                            case 'boolean':
                                value = element.value;
                                break;
                            case 'date':
                                value = "'" + element.value + "'";
                                break;
                        }
                        cypher = "MATCH (n) WHERE id(n)=" + this.node.id + " SET n." + element.name + "=" + value + " RETURN  n";
                    }
                    break;
                case enum_2.Action.delete:
                    if (element instanceof node_1.NVNode)
                        cypher = "MATCH (n) WHERE id(n)=" + element.id + " detach delete n";
                    if (element instanceof edge_1.NVEdge)
                        cypher = "MATCH ()-[r]-() WHERE id(r)=" + element.id + " delete r";
                    if (element instanceof attribute_1.Attribute)
                        cypher = "MATCH (n) WHERE id(n)=" + this.node.id + " SET n." + element.name + "= NULL RETURN n";
                    if (element instanceof branch_1.Branch)
                        cypher = "MATCH (b),(n) WHERE id(b)=" + element.id + " AND (b)-->(n) detach delete b,n";
                    break;
            }
        }
        console.log(cypher);
        jQuery.ajax({
            type: 'POST',
            url: this.url + "cypher",
            async: false,
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify({ "query": cypher, "params": {} }),
            success: function (data, textStatus, jqXHR) {
                console.log(textStatus);
                response = data.data;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
        return response;
    };
    /** This is a description of the  function. */
    GraphUI.prototype.test = function () {
        var _this = this;
        var neo_init = "";
        ///RECUP DU USER VIA LA CONNEXION mail:benjamin.troquereau@gmail.com//////////////////////// TODO
        this.user = new user_1.User('troquereaub@gmail.com', 'Troquereau', 'Benjamin', null, null);
        ////////////////////////////////////////////////////////////////////////////////////////////
        /// request to init the graph
        var response = this.query(enum_2.Action.read, null, "MATCH (u:User)-[r:KNOWS|HIERARCHICAL|CUSTOM*]->(n:Node)<-[re:BELONG]-(b:Branch) WHERE u.matricule = '" + this.user.matricule + "' RETURN n,r,b");
        this.graph = new graph_1.Graph(1, 'graph');
        // hydratation des noeuds
        response.forEach(function (n) {
            if (!_this.found(_this.graph.nodes, n[0].metadata.id)) {
                _this.graph.nodes.push(new node_1.NVNode(new branch_1.Branch(n[2].data.name, n[2].data.color, n[2].data.type, n[2].metadata.id), n[0].metadata.id, n[0].data.name, new Array()));
            }
        });
        // hydratation des arcs
        response.forEach(function (r) {
            r[1].forEach(function (e) {
                if (!_this.found(_this.graph.edges, e.metadata.id)) {
                    var source = _this.found(_this.graph.nodes, e.start.split("/")[e.start.split("/").length - 1]);
                    var target = _this.found(_this.graph.nodes, e.end.split("/")[e.end.split("/").length - 1]);
                    if (source && target)
                        _this.graph.edges.push(new edge_1.NVEdge(e.metadata.id, e.data.name, source, target));
                }
            });
        });
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
/*
CREATE (u:User {matricule:'troquereaub@gmail.com',name:'Troquereau',firstname:'Benjamin'});
CREATE (b:Branch {name:'b1',color:'AA11F6',type:'Standard'});
CREATE (n:Node {name:'n1'});
CREATE (n:Node {name:'n2'});
CREATE (n:Node {name:'n3'});

MATCH (s:User),(t:Node) WHERE t.name='n1' CREATE (s)-[r:KNOWS]->(t);
MATCH (s:Branch),(t:Node) CREATE (s)-[r:BELONG]->(t);
MATCH (s:Node),(t:Node) WHERE s.name='n1' AND t.name='n2' CREATE (s)-[r:HIERARCHICAL]->(t);
MATCH (s:Node),(t:Node) WHERE s.name='n1' AND t.name='n3' CREATE (s)-[r:HIERARCHICAL]->(t);

//DELETE

MATCH ()-[r]->(n) WHERE n.name='undefined' delete n,r
*/ 
//# sourceMappingURL=graphUI.js.map