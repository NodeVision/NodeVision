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
    private branch = new Branch();
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
            .on('contextmenu', () => { this.branchmodalstate = true;this.branch = new Branch('','','Standard') });

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
            .call(this.force.drag)
            .on("mouseup", (n: NVNode) => { this.mouseupNode(n) })
            .call(this.force.drag)
            .on("dblclick", (n: NVNode) => { this.nodemodalstate = true });
        this.nodes.append("title").text((n: NVNode) => { return n.name; });
    }
    public redraw() {
        this.links = this.svg.selectAll(".link");
        var links = this.links.data(this.force.links());
        links.enter().insert("line", ".node").attr("class", "link");
        links.exit().remove();
        
        var nodes = this.nodes.data(this.force.nodes());
        nodes.enter().append("circle")
            .attr("class", "node")
            .attr("r", 10)
            .style('fill', (n: NVNode) => { return n.branch.color })
            .style('stroke', (n: NVNode) => { return n.branch.color })
            .on("mousedown", (n: NVNode) => { this.mousedown(n) })
            .on("mouseup", (n: NVNode) => { this.mouseupNode(n) })
            .call(this.force.drag)
            .on("dblclick", (n: NVNode) => { this.nodemodalstate = true });
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
     public mouseupNode(n: NVNode) {
        if (this.new_link) {
            this.add_edge(this.node, n);
            this.redraw();
            this.svg.on("mousemove", null);
            this.new_link = false;           
        }
        this.nodes.call(this.force.drag);
    }
    public mousedown(n: NVNode) {
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
            this.svg.on("mousemove", () => { this.mousemove() });
        }
    }
    public mousemove() {
        this.m = d3.mouse(d3.event.currentTarget);
        this.line
            .attr("x2",this.m[0])
            .attr("y2",this.m[1]);
    }
    public add_edge(source: NVNode, target: NVNode) {
        //ajouter a la base de données récup l'id  
        if(source != target){  
            var edge = new NVEdge(2264, 'undfined', source, target);      
            this.graph.edges.push(edge);
        }
        
    }
    public add_attribute() {
        this.node.attributes.push(new Attribute('', '', ''));
    }
    public delete_attribute(attribute: Attribute) {
        this.node.attributes.splice(this.node.attributes.indexOf(attribute), 1);
    }
    public add_node() {
        //appel bdd (TEST)
        var node = new NVNode(9999, 'test', this.node.branch, Array<Attribute>())//TODO Rempalcer
        var edge = new NVEdge(9999, 'blabla', this.node, node)//TODO Rempalcer
        
        //reconstruction
        this.graph.nodes.push(node);
        this.graph.edges.push(edge);
        this.redraw();
    }
    public delete_node() {
        //this.graph.edges.splice(this.graph.edges.findIndex(x => x.source.id_node == this.node.id_node),1);
        //this.graph.edges.splice(this.graph.edges.findIndex(x => x.target.id_node == this.node.id_node),1);
        this.graph.nodes.splice(this.graph.nodes.indexOf(this.node), 1);
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
    public show_branch(branch: Branch) {

    }
    public add_branch(name: string, color: string) {
     
        this.branch.name = name;
        this.branch.color = color;
        
        var nd = new NVNode(13, "Nouveau noeud", this.branch, Array<Attribute>());
        this.branches.push(this.branch);
        this.graph.nodes.push(nd);
        this.redraw();
        this.branchmodalstate = false;
    }

    public update_branch(branch: Branch) {
        this.branchmodalstate = true;
        this.branch = branch
    }
    public delete_branch(branch: Branch) {
        
        //trouver le noeud parent le plus élevé et faire this.delete_node_and_sons
        var nodesbranch = Array<NVNode>();
        this.graph.nodes.forEach(element => {
            if (element.branch == branch) {
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
    public found(array:any,value:any){
        var tamp
        array.forEach(element => {
            if(element.id == value) tamp =  element;
        });
        return tamp;
    }
    public test() {
        var neo_init ="";
        
        
        ///RECUP DU USER VIA LA CONNEXION mail:benjamin.troquereau@gmail.com//////////////////////// TODO
        var user = new User('benjamin.troquereau@gmail.com', 'Troquereau', 'Benjamin', null, null);
        ////////////////////////////////////////////////////////////////////////////////////////////
        
        /// request to init the graph
        var neo_init = "MATCH (u:User)-[r:KNOWS | RELTYPE*]->(n:Node) WHERE u.mail = 'benjamin.troquereau@gmail.com' RETURN n,r"
        var response;
        jQuery.ajax({
                    type: "POST",
                    async: false,
                    url: "http://5.196.66.87/db/data/cypher",
                    contentType: "application/json",
                    data: JSON.stringify({"query":neo_init, "params": {}}),
                    success: (data) => {
                        response = data.data;
                    }
                 });        
        this.graph = new Graph(1, 'first');         
        // hydratation des noeuds
        response.forEach(n => {
            this.graph.nodes.push(new NVNode(n[0].metadata.id,n[0].data.name,new Branch('name','ffffff','Standard'),new Array<Attribute>()));  
        });
        // hydratation des arcs
        response.forEach(r => {
           r[1].forEach(e => {
                var source = this.found(this.graph.nodes,e.start.split("/")[e.start.split("/").length - 1]);
                var target = this.found(this.graph.nodes,e.end.split("/")[e.end.split("/").length - 1]);
                if(source && target) this.graph.edges.push(new NVEdge(e.metadata.id,e.data.name,source,target));
            });
        });
         
    }
}
bootstrap(GraphUI);