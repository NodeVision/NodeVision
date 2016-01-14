import {bootstrap, View, Component, FormBuilder, CORE_DIRECTIVES} from 'angular2/angular2';
import {User} from './model/user';
import {Branch} from './model/branch';
import {NVNode} from './model/node';
import {NVEdge} from './model/edge';
import {Graph} from './model/graph';
import {Group} from './model/group';
import {Attribute} from './model/attribute';
import {PreferencePopup} from './model/preferencepopup';
import {Element} from './enum';
import {Action} from './enum';
@View({
    templateUrl: 'app/graphUI.html',
    directives: [CORE_DIRECTIVES]
})
@Component({
    selector: 'graph'
})
export class GraphUI {
    //Container
    private url = "http://5.196.66.87/db/data/";//http://5.196.66.87
    private width: number = 960;
    private height: number = 500;
    private user : User;
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
    private nodemodal = Element.node;
    //attribut
    private title_state = false;
    private node: NVNode;
    //branch Modal
    private branchmodalstate = false;
    private branchmodal = Element.branch;
    private branch = new Branch();
    //edge
    private edge: NVEdge;
    private edgemodalstate = false;
    private edgemodal = Element.edge; 
    //navbar
    private branches = new Array<Branch>();

    constructor() {
        this.test(); //TODO remove appel de la base de données  
        //navbar branches
        var b = new Array<Branch>();
        this.graph.nodes.forEach(n => {  
            b.push(n.branch);
        });
        b.forEach(br =>{
            if(!this.found(this.branches,br.id)){
                this.branches.push(br);
            }
        });
        
        //canvas du graph
        this.force = d3.layout.force().charge(-120).linkDistance(70).size([this.width, this.height]);
        this.svg = d3.select("body").append("svg").attr("width", this.width).attr("height", this.height);
        this.svg
            .on('contextmenu', () => { this.branchmodalstate = true;this.branch = new Branch('','','Standard') });

        this.init_graph();
    }
    /** This is a description of the  function. */
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
<<<<<<< HEAD
            .on("click", (e: NVEdge) => { this.edge = e ; console.log("tt") })
            .on("dblclick",(e:NVEdge) => { this.edgemodalstate = true });
=======
            .on("mousedown", function(d){ alert("HEYYYYYYYYY")});
>>>>>>> origin/dev
        this.nodes = this.svg.selectAll(".node")
            .data(this.graph.nodes)
            .enter().append("circle")
            .attr("class", "node")
            .attr("r", 10)
            .attr("id", (n: NVNode) => { return n.id })
            .style('fill', (n: NVNode) => { return n.branch.color })
            .style('stroke', (n: NVNode) => { return n.branch.color })
            .on("mousedown", (n: NVNode) => { this.mousedown(n) })
            .call(this.force.drag)
            .on("mouseup", (n: NVNode) => { this.mouseupNode(n) })
            .on("dblclick", (n: NVNode) => { this.nodemodalstate = true });
        this.nodes.append("title").text((n: NVNode) => { return n.name; });
    }
    /** This is a description of the  function. */
    public redraw() {
        this.links = this.svg.selectAll(".link");
        var links = this.links.data(this.force.links());
        links.enter().insert("line", ".node").attr("class", "link").on("mousedown", function(d){alert("HEY")});
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
    /** This is a description of the  function. */
    public tick() {
     
        this.links.attr("x1", (e: NVEdge) => { return e.source.x; })
            .attr("y1", (e: NVEdge) => { return e.source.y; })
            .attr("x2", (e: NVEdge) => { return e.target.x; })
            .attr("y2", (e: NVEdge) => { return e.target.y; });
        this.nodes.attr("cx", (n: NVNode) => { return n.x; })
            .attr("cy", (n: NVNode) => { return n.y; });
    }
    /** This is a description of the  function. */
    public mouseupNode(n: NVNode) {
        if (this.new_link) {
            this.add_edge(this.node, n);
            this.redraw();
            this.svg.on("mousemove", null);
            this.new_link = false;           
        }
        this.nodes.call(this.force.drag);
    }
    /** This is a description of the  function. */
    public mousedown(n: NVNode) {
        this.node = n;
        if (d3.event.shiftKey) {
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
    /** This is a description of the  function. */
    public mousemove() {
        this.m = d3.mouse(d3.event.currentTarget);
        this.line
            .attr("x2",this.m[0])
            .attr("y2",this.m[1]);
    }
    /** This is a description of the  function. */
    public add_edge(source: NVNode, target: NVNode) {
        //ajouter a la base de données récup l'id  
        if(source != target){  
            var edge = new NVEdge(2264, 'undfined', source, target);      
            this.graph.edges.push(edge);
            this.query(Action.create,edge);
        }
        
    }
    public add_attribute_line(){
        this.node.attributes.push(new Attribute(this.node.attributes.length+1,'','',''));
    }
    
    /** This is a description of the  function. */
    public add_attribute(attribute_id, attribute_name, attribute_value, attribute_type) {
        var foundAttribute = this.node.attributes.find(x => x.id == attribute_id);
        this.node.attributes.splice(this.node.attributes.findIndex(x => x.id == attribute_id), 1);
        
        foundAttribute.name = attribute_name;
        foundAttribute.type = attribute_type;
        foundAttribute.value = attribute_value;
        
        this.node.attributes.push(foundAttribute);
        var response = this.query(Action.create, foundAttribute);
    }
    /** This is a description of the  function. */
    public delete_attribute(attribute: Attribute) {
        this.node.attributes.splice(this.node.attributes.indexOf(attribute), 1);
        this.query(Action.delete, attribute);
    }
    /** This is a description of the  function. */
    public add_node() {
        //appel bdd (TEST)
        console.log("bonjour");
        var response = this.query(Action.create,new NVNode(this.node.branch));
        var node = new NVNode(this.node.branch, response[0][1].metadata.id, response[0][1].data.name, Array<Attribute>());
        var edge = new NVEdge(response[0][0].metadata.id, response[0][0].data.name, this.node, node);
        console.log("aurevoir");
        
        //reconstruction
        this.graph.nodes.push(node);
        this.graph.edges.push(edge);
        this.redraw();
    }
    /** This is a description of the  function. */
    public delete_node() {
        this.query(Action.delete,this.node)
        
        this.nodes[0].splice(this.graph.nodes.indexOf(this.node), 1);
        jQuery("#"+this.node.id).remove()
        this.graph.nodes.splice(this.graph.nodes.indexOf(this.node), 1);
        
        var toSplice = this.graph.edges.filter((l) => { return (l.source === this.node) || (l.target === this.node); });
        toSplice.map((l) => { this.graph.edges.splice(this.graph.edges.indexOf(l), 1); });
        this.nodemodalstate = false;
     
        this.redraw();
    }
    /** This is a description of the  function. */
    public delete_node_and_sons() {

    }
    /** This is a description of the  function. */
    public update_node(node_name) {
        this.node.name = node_name;
        var response = this.query(Action.update, this.node);
        this.title_state = false;
    }
    /** This is a description of the  function. */
    public show_branch(branch: Branch) {

    }
    /** This is a description of the  function. */
    public add_branch(name: string, color: string) {
        //branch input
        this.branch.name = name;
        this.branch.color = color;
        //id branch from the database
        var response = this.query(Action.create,this.branch)
        this.branch.id = response[0][0].metadata.id;
        this.branches.push(this.branch);
        //id node from the database
        this.node = new NVNode(this.branch,response[0][1].metadata.id, response[0][1].data.name ,Array<Attribute>());
        this.graph.nodes.push(this.node);
        
        this.redraw();
        this.branchmodalstate = false;
    }
    /** This is a description of the  function. */
    public update_branch(branch: Branch) {
        this.branchmodalstate = true;
        this.branch = branch
    }
    /** This is a description of the  function. */
    public delete_branch(branch: Branch) {
        this.query(Action.delete,branch)
        //trouver le noeud parent le plus élevé et faire this.delete_node_and_sons
        var nodesbranch = Array<NVNode>();
        this.graph.nodes.forEach(element => {
            if (element.branch == branch) {
                nodesbranch.push(element);
            }
        });
        
        //supprime la branche
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

        this.redraw();
    }
    /** This is a description of the  function. */
    public delete_edge() {

    }
    /** This is a description of the  function. */
    public update_edge() {


    }
    /** This is a description of the  function. */
    public found(array:any[],value:any){
        var tamp;
        array.forEach(element => {
            if(element.id == value) tamp =  element;
        });
        return tamp;
    }
    /** This is a description of the  function. */
    public query(action:Action,element?:NVNode|NVEdge|Branch|User|Attribute,cypher?:string){
        var response;
        if(!cypher){
            switch(action){
                case Action.read:
                    if(element instanceof NVNode) cypher = "MATCH (n) WHERE id(n)="+element.id+" RETURN n";
                    if(element instanceof NVEdge) cypher = "MATCH ()-[r]-() WHERE id(r)="+element.id+" RETURN r";
                    break;
                case Action.create:
                    if(element instanceof NVNode)cypher = "MATCH (n),(b) WHERE id(n)="+this.node.id+" AND id(b)="+this.node.branch.id+" CREATE n-[r:HIERARCHICAL]->(c:Node {name:'undefined'})<-[re:BELONG]-b RETURN r,c";
                    if(element instanceof NVEdge) cypher = "MATCH (s:Node),(t:Node) WHERE id(s)="+element.source.id+" AND id(t)="+element.target.id+" CREATE (s)-[r:CUSTOM]->(t) RETURN r";            
                    if(element instanceof Branch) cypher = "MATCH (u) WHERE u.matricule='"+this.user.matricule+"' CREATE (b:Branch {name:'"+this.branch.name+"',color:'"+this.branch.color+"',type:'"+this.branch.type+"'})-[re:BELONG]->(n:Node {name:'undefined'})<-[r:KNOWS]-u RETURN b, n";
                    if(element instanceof Attribute){
                        var value="";
                        switch (element.type) {
                            case 'string': value = "'"+element.value+"'"; break;
                            case 'number': value = element.value; break;
                            case 'boolean': value = element.value; break;
                            case 'date': value = "'"+element.value+"'";break; 
                        }
                        cypher = "MATCH (n) WHERE id(n)="+this.node.id+" SET n."+element.name+"="+value+" RETURN  n";
                    } 
                    break;
                case Action.update:
                    if(element instanceof NVNode) cypher = "MATCH (n) WHERE id(n)="+element.id+" SET n.name ='"+element.name+"'";
                    if(element instanceof NVEdge) cypher = "MATCH ()-[r]-() WHERE id(r)="+element.id+" SET r.name ='"+element.name+"'";
                    if(element instanceof Branch) cypher = "MATCH (b) WHERE id(b)="+element.id+" SET SET b.color ='"+element.color+"' , b.type ='"+element.type+"'";
                    if(element instanceof Attribute){
                        var value="";
                        switch (element.type) {
                            case 'string': value = "'"+element.value+"'"; break;
                            case 'number': value = element.value; break;
                            case 'boolean': value = element.value; break;
                            case 'date': value = "'"+element.value+"'";break;
                        }
                        cypher = "MATCH (n) WHERE id(n)="+this.node.id+" SET n."+element.name+"="+value+" RETURN  n";
                    }                  
                    break;
                case Action.delete:
                    if(element instanceof NVNode) {
                        var isLastNode = 0;
                        this.graph.nodes.forEach((n:NVNode) => { if(n.branch == element.branch) isLastNode++ })
                        console.log(isLastNode);
                        if(isLastNode > 0) cypher = "MATCH (n) WHERE id(n)="+element.id+" detach delete n";
                        else  cypher = "MATCH (b),(n) WHERE id(b)="+element.branch.id+" AND (b)-->(n) detach delete b,n";
                    }
                    if(element instanceof NVEdge) cypher = "MATCH ()-[r]-() WHERE id(r)="+element.id+" delete r";
                    if(element instanceof Attribute) cypher = "MATCH (n) WHERE id(n)="+this.node.id+" SET n."+element.name+"= NULL RETURN n";
                     if(element instanceof Branch) cypher = "MATCH (b),(n) WHERE id(b)="+element.id+" AND (b)-->(n) detach delete b,n";
                    break; 
            }
        }
        console.log(cypher)
        jQuery.ajax({
                type: 'POST',
                url: this.url+"cypher",
                async: false,
                contentType: "application/json; charset=UTF-8",
                data: JSON.stringify({"query":cypher, "params": {}}),
                success: (data, textStatus, jqXHR) => {
                    console.log(textStatus);
                    response = data.data;
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    console.log(errorThrown);
                }
                });
                
        return response;   
    }
    /** This is a description of the  function. */
    public test() {
        var neo_init ="";
        ///RECUP DU USER VIA LA CONNEXION mail:benjamin.troquereau@gmail.com//////////////////////// TODO
        this.user = new User('troquereaub@gmail.com', 'Troquereau', 'Benjamin', null, null);
        ////////////////////////////////////////////////////////////////////////////////////////////
        
        /// request to init the graph
        var response = this.query(Action.read,null,"MATCH (u:User)-[r:KNOWS|HIERARCHICAL|CUSTOM*]->(n:Node)<-[re:BELONG]-(b:Branch) WHERE u.matricule = '"+this.user.matricule+"' RETURN keys(n),n,r,b")
        console.log("DEBUUUUUUUUUUUT")
        console.log(response);
        console.log("FINNNNNNNNNNNNNN")
        this.graph = new Graph(1, 'graph');         
        // hydratation des noeuds
        
        var listAttribute = new Array<Attribute>();
        response.forEach(n => {
                listAttribute.splice(0, listAttribute.length);
                n[0].forEach(elt => {
                    if(n[0].indexOf(elt) != 0)
                    {
                    listAttribute.push(new Attribute(n[1].metadata.id, elt,n[1].data[elt]));
                    }
                });
                
                if(!this.found(this.graph.nodes,n[1].metadata.id)){
                this.graph.nodes.push(new NVNode(
                    new Branch(
                        n[3].data.name,
                        n[3].data.color,
                        n[3].data.type,n[3].metadata.id),
                    n[1].metadata.id,
                    n[1].data.name,
                    listAttribute
                    )
                );
                
                console.log(listAttribute); 
            }
        });
        
        // hydratation des arcs
        response.forEach(r => {
           r[2].forEach(e => {
               if(!this.found(this.graph.edges,e.metadata.id)){
                    var source = this.found(this.graph.nodes,e.start.split("/")[e.start.split("/").length - 1]);
                    var target = this.found(this.graph.nodes,e.end.split("/")[e.end.split("/").length - 1]);
                    if(source && target) this.graph.edges.push(new NVEdge(e.metadata.id,e.data.name,source,target));
               }
            });
        });
         
    }
}
bootstrap(GraphUI);

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
MATCH (n) WHERE  id(n) <> 125 detach delete (n)
MATCH ()-[r]-() delete (r)
MATCH ()-[r]->(n) WHERE n.name='undefined' delete n,r
*/

/*MATCH (n),(b),(u) WHERE id(b)="" AND u.matricule='troquereaub@gmail.com' CREATE (u)-[r:KNOW]->(n)<-[re:BELONG]-b RETURN n*/