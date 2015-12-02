import {bootstrap, View, Component, FormBuilder, CORE_DIRECTIVES} from 'angular2/angular2';
import {User} from './model/user';
import {Branch} from './model/branch';
import {NVNode} from './model/node';
import {NVEdge} from './model/edge';
import {Graph} from './model/graph';
import {Group} from './model/group';
import {Attribute} from './model/attribute';
import {PreferencePopup} from './model/preferencepopup';
import {Modal} from './enum';
@View({
    templateUrl: 'app/graphUI.html',
    directives: [CORE_DIRECTIVES]
})
@Component({
    selector: 'graph'
})
export class GraphUI {
    //Container
    private width: number = 960;
    private height: number = 500;
    //Graph
    private graph: Graph;
    private force: d3.layout.Force<d3.layout.force.Link<d3.layout.force.Node>, d3.layout.force.Node>;
    private links: d3.Selection<d3.layout.force.Link<d3.layout.force.Node>>;
    private nodes: d3.Selection<d3.layout.force.Node>;
    private svg: d3.Selection<any>;
    private line: d3.Selection<any>;
    private m: [number, number];
    private new_link: boolean;
    //node Modal
    private nodemodalstate = false;
    private nodemodal = Modal.node;
    //attribut
    private title_state = false;
    private node: NVNode;
    private users: Array<User>;
    private allUsers: Array<User>;
    //branch Modal
    private branchmodalstate = false;
    private branchmodal = Modal.branch;
    private branch = new Branch(-1);
    //edge
    private edge: NVEdge;    
    //navbar
    private branches = new Array<Branch>();

    constructor() {
        this.test(); //TODO remove appel de la base de données  
      
        //navbar branches
        this.graph.nodes.forEach(n => {
            if (this.branches.indexOf(n.branch) == -1) {
                this.branches.push(n.branch);
            }
        });
        //canvas du graph
        this.force = d3.layout.force().charge(-120).linkDistance(70).size([this.width, this.height]);
        this.svg = d3.select("body").append("svg").attr("width", this.width).attr("height", this.height);
        this.svg
            .on("mouseup", () => { this.mouseup() })
            .on('contextmenu', () => { this.branchmodalstate = true });

        this.init_graph();
    }

    public init_graph() {
        //initialisation du graph           
        this.force
            .nodes(this.graph.nodes)
            .links(this.graph.edges)
            .on("tick", () => this.tick())
            .start();
        this.links = this.svg.selectAll(".link")
            .data(this.graph.edges)
            .enter().append("line")
            .attr("class", "link")
            .on("click", (e: NVEdge) => { this.edge = e });
        this.nodes = this.svg.selectAll(".node")
            .data(this.graph.nodes)
            .enter().append("circle")
            .attr("class", "node")
            .attr("r", 10)
            .style('fill', (n: NVNode) => { return n.branch.color })
            .style('stroke', (n: NVNode) => { return n.branch.color })
            .on("mousedown", (n: NVNode) => { this.mousedown(n) })
            .on("mouseover", (n: NVNode) => { this.mouseover(n) })
        //.call(this.force.drag)
            .on("click", (n: NVNode) => { this.node = n; })
            .on("dblclick", (n: NVNode) => { this.nodemodalstate = true });
        this.nodes.append("title").text((n: NVNode) => { return n.name; });
    }
    public mouseover(n: NVNode) {
        if (this.new_link) {
            this.add_edge(this.node, n);
        }
    }
    public mousedown(n: NVNode) {
        if (d3.event.ctrlKey) {
            this.new_link = true;
            this.line = this.svg.append("line")
                .attr("class", "link")
                .attr("x1", n.x)
                .attr("y1", n.y)
                .attr("x2", n.x)
                .attr("y2", n.y);
            this.svg.on("mousemove", () => { this.mousemove() });
        }
    }
    public mousemove() {
        this.m = d3.mouse(d3.event.currentTarget);
        this.line.attr("x2", this.m[0])
            .attr("y2", this.m[1]);
    }
    public mouseup() {
        if (d3.event.ctrlKey) {
            this.new_link = false;
            this.svg.on("mousemove", null);
            this.line.attr("class", "drag_line_hidden");
        }
    }
    public redraw() {

        var links = this.links.data(this.force.links());
        links.enter().insert("line", ".node").attr("class", "link");
        links.exit().remove();
        var nodes = this.nodes.data(this.force.nodes());
        nodes.enter().append("circle")
            .attr("class", "node")
            .attr("r", 10)
            .style('fill', (n: NVNode) => { return n.branch.color })
            .style('stroke', (n: NVNode) => { return n.branch.color })
            .on("click", (n: NVNode) => { this.node = n })
            .on("dblclick", (n: NVNode) => { this.nodemodalstate = true })
        this.nodes.append("title").text((n: NVNode) => { return n.name; });

        nodes.exit().remove();
        this.links = this.svg.selectAll(".link");
        this.nodes = this.svg.selectAll(".node");
        this.force.start();

    }
    public tick() {
        this.links.attr("x1", (e: NVEdge) => { return e.source.x; })
            .attr("y1", (e: NVEdge) => { return e.source.y; })
            .attr("x2", (e: NVEdge) => { return e.target.x; })
            .attr("y2", (e: NVEdge) => { return e.target.y; });
        this.nodes.attr("cx", (n: NVNode) => { return n.x; })
            .attr("cy", (n: NVNode) => { return n.y; });
    }
    public add_edge(source: NVNode, target: NVNode) {
        //ajouter a la base de données récup l'id
                    
        this.graph.edges.push(new NVEdge(2264, 'undfined', source, target))
        this.redraw();
    }
    public add_attribute() {
        this.node.attributes.push(new Attribute('', '', ''));
    }
    public delete_attribute(attribute: Attribute) {
        this.node.attributes.splice(this.node.attributes.indexOf(attribute), 1);
    }
    public add_node() {
        //appel bdd (TEST)
        var node = new NVNode(9999, 'test', this.node.branch, this.node.owners, this.node.viewvers, null, this.node, null)//TODO Rempalcer
        var edge = new NVEdge(9999, 'blabla', this.node, node)//TODO Rempalcer
        
        //reconstruction
        this.graph.nodes.push(node);
        this.graph.edges.push(edge);
        this.redraw();
    }
    public delete_node() {
        console.log(this.graph);
        
        //this.graph.edges.splice(this.graph.edges.findIndex(x => x.source.id_node == this.node.id_node),1);
        //this.graph.edges.splice(this.graph.edges.findIndex(x => x.target.id_node == this.node.id_node),1);
        this.graph.nodes.splice(this.graph.nodes.indexOf(this.node), 1);
        console.log(this.graph);
        var toSplice = this.graph.edges.filter((l) => { return (l.source === this.node) || (l.target === this.node); });
        toSplice.map((l) => { this.graph.edges.splice(this.graph.edges.indexOf(l), 1); });

        this.redraw();
    }
    public delete_node_and_sons() {

    }
    public update_node(node_name) {
        this.node.name = node_name;
        this.title_state = false;
    }
    public add_user_or_group() {

    }
    public delete_user_or_group() {

    }
    public update_user_or_group() {

    }
    public show_branch(branch: Branch) {

    }
    public add_branch(name: string, color: string) {
        var br = new Branch(name, "ffffff") //TODO récuperer la couleur du picker
        var nd = new NVNode(13, "Nouveau noeud", br, this.allUsers, this.allUsers, null, null, null);
        this.branches.push(br);
        this.graph.nodes.push(nd);
        this.redraw();
        this.branchmodalstate = false;
    }

    public update_branch(branch: Branch) {
        this.branchmodalstate = true;
        this.branch = branch
    }

    public update_users_node(user: User) {

    }

    public delete_branch(branch: Branch) {
        
        //trouver le noeud parent le plus élevé et faire this.delete_node_and_sons
        var nodesbranch = Array<NVNode>();
        this.graph.nodes.forEach(element => {
            if (element.branch == branch)
                {
                    console.log(element.branch.name+" : "+branch.name);
                nodesbranch.push(element);
            }
        });
        
        //supprime la branche(groupe)
        this.branches.splice(this.branches.indexOf(nodesbranch[0].branch), 1);
        
        //supprime les edges de la branche
        nodesbranch.forEach(elt => {
            this.graph.edges.forEach(element => {
                if (element.source == elt || element.target == elt)
                    this.graph.edges.splice(this.graph.edges.indexOf(element), 1);
            });
        });
        
        //supprime les noeuds de la branche
        nodesbranch.forEach(element => {
            this.graph.nodes.splice(this.graph.nodes.indexOf(element), 1);
        });
        
        console.log(this.graph.nodes);
        
        this.redraw();
    }

    public delete_edge() {

    }
    public update_edge() {

    }

    public test() {
        ///////////////////////TEST///////////////////////
        this.allUsers = [new User('0002', 'laumondais', 'thomas', null, null),
            new User('0003', 'chaumont', 'pierre', null, null),
            new User('0004', 'chipaux', 'germain', null, null),
            new User('0005', 'thomas', 'valentin', null, null),
            new User('0005', 'wahiba', 'bidah', null, null)]
        this.graph = new Graph(1, 'first');
        var b1 = new Branch(); b1.name = 'branch 1'; b1.color = '#234587';
        var b2 = new Branch(); b2.name = 'branch 2'; b2.color = '#123120';
        var nodes = new Array<NVNode>();
        var edges = new Array<NVEdge>();
        var n1 = new NVNode(1, 'un', b1, null, null, [new Attribute('one string', 'a string', 'string')], null, null);
        var n2 = new NVNode(2, 'deux', b1, null, null, [new Attribute('one number', '12', 'number')], n1, null);
        var n3 = new NVNode(3, 'trois', b1, null, null, [new Attribute('one boolean', 'true', 'boolean')], n1, null);
        var n4 = new NVNode(4, 'un', b2, null, null, [new Attribute('one string', 'a string', 'string')], null, null);
        var n5 = new NVNode(5, 'deux', b2, null, null, [new Attribute('one number', '12', 'number')], n4, null);
        var n6 = new NVNode(6, 'trois', b2, null, null, [new Attribute('one boolean', 'true', 'boolean')], n4, null);
        var e1 = new NVEdge(1, 'link1', n1, n2);
        var e2 = new NVEdge(2, 'link2', n1, n3);
        var e3 = new NVEdge(3, 'link3', n4, n5);
        var e4 = new NVEdge(4, 'link4', n4, n6);
        nodes.push(n1, n2, n3, n4, n5, n6);
        edges.push(e1, e2, e3, e4);
        this.graph.nodes = nodes;
        this.graph.edges = edges;
                
        ///////////////////////////////////////////////////
        this.node = new NVNode(1,
            'fire',
            b1,
            [new User('0001', 'troquereau', 'benjamin', new PreferencePopup(true, false, false))],
            [new User('0001', 'troquereau', 'benjamin', new PreferencePopup(true, false, false))],
            [new Attribute('Test', 'Test', 'Test')], null, null);
        ///////////////////////////////////////////////////
    }
}
bootstrap(GraphUI);