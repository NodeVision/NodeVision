import {bootstrap, View, Component, FormBuilder, CORE_DIRECTIVES} from 'angular2/angular2';
import {User} from './model/user';
import {Branch} from './model/branch';
import {NVNode} from './model/node';
import {NVEdge} from './model/edge';
import {Graph} from './model/graph';
import {Group} from './model/group';
import {Notification} from './model/notification';
import {Attribute} from './model/attribute';
import {PreferencePopup} from './model/preferencepopup';
import {Element} from './enum';
import {Action} from './enum';
import {AuthApp} from './connexionUI';
@View({
    templateUrl: 'src/html/graphUI.html',
    directives: [CORE_DIRECTIVES]
})
@Component({
    selector: 'graph'
})
export class GraphUI {
    
    private authentication = new AuthApp();
    private image = this.authentication.getPicture();
    private mail = this.authentication.getMail();
    //Container
    private url = "http://5.196.66.87/db/data/";//http://5.196.66.87
    private width: number = jQuery("body").width();
    private height: number = 500;
    //User
    private user : User;
    private userBranch = new Branch('Users','#ffffff',-1);
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
    private listAttribute = new Array<Attribute>();
    //branch Modal
    private branchmodalstate = false;
    private branchnamecondition = false;
    private attribnamecondition = false;
    private branchmodal = Element.branch;
    private branch = new Branch();
    //edge
    private edge: NVEdge;
    private edgemodalstate = false;
    private edgemodal = Element.edge;
    //users
    private users = Array<User>();
    //navbar
    private branches = new Array<Branch>();
    private socket;
    //administration
    private notifications = new Array<Notification>();
    constructor() {
       
        this.bdd();
        var n = new Notification(this.user,'test',new Branch('lol')); 
        this.notifications.push(n) 
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
        this.svg.on('contextmenu', () => { this.branchmodalstate = true;this.branch = new Branch()}).on('mouseup',() => { this.line.remove()});
        this.init_graph();

        //Création de la socket client
        this.socket = io.connect('http://localhost:8888');
        ///////////////////////////////////////////////////Ecoutes de la socket client //////////////////////////////////////////////////////////////////////////////////////////////////   
        /**/ // connetion User
        /**/ this.socket.on('broadcast user clt', (user) => {
        /**/     //hydratation
        /**/     var nu = this.graph.nodes.find(n => n.id == user._id)
        /**/     var u = new User(user._mail,user._id,nu);
        /**/     //add to users
        /**/     this.users.push(u);
        /**/ });
        /**/ // Add node broadcast
        /**/ this.socket.on('add node clt', (node, edge) => {
        /**/     //hydratation
        /**/     var b = new Branch(node._branch._name,node._branch._color,node._branch._id);
        /**/     var nt = new NVNode(b,node._id,node._name,node._node_attributs);
        /**/     var ns = this.graph.nodes.find(x => x.id == edge.source._id);
        /**/     var e = new NVEdge(edge._id,edge.name,ns,nt);
        /**/     //add to graph
        /**/     this.graph.nodes.push(nt);
        /**/     //this.nodes[0].push(nt);
        /**/     this.graph.edges.push(e);
        /**/     this.redraw();
        /**/ });
        /**/ // Delete node broadcast
        /**/ this.socket.on('del node clt', (id_node,del_branch?:boolean,id_branch?) => {
        /**/     //del to graph
        /**/     var toSpliceN = this.graph.nodes.filter((k) => { return (k.id === id_node) });
        /**/      toSpliceN.map((k) => { 
        /**/        this.graph.nodes.splice(this.graph.nodes.indexOf(k), 1);
        /**/     });
        /**/     var toSpliceE = this.graph.edges.filter((l) => { return (l.source.id === id_node) || (l.target.id === id_node); });
        /**/     toSpliceE.map((l) => { this.graph.edges.splice(this.graph.edges.indexOf(l), 1); });
        /**/     if(del_branch){
        /**/        var toSpliceB = this.branches.filter((b) => { return (b.id === id_branch); });
        /**/        toSpliceB.map((b) => { this.branches.splice(this.branches.indexOf(b), 1); });
        /**/     }
        /**/     this.redraw();
        /**/ });
        /**/ // Update node broadcast
        /**/ this.socket.on('up node clt', (node) => {
        /**/     //update to graph
        /**/     var toRenameN = this.graph.nodes.filter((k) => { return (k.id === node._id) });
        /**/     toRenameN.map((k) => { 
        /**/        this.graph.nodes[this.graph.nodes.indexOf(k)].name = node._name; 
        /**/     });  
        /**/ });
        /**/ // Add branch broadcast
        /**/ this.socket.on('add branch clt', (node) => {
        /**/     //hydratation
        /**/     var b = new Branch(node._branch._name,node._branch._color,node._branch._id);
        /**/     var n = new NVNode(b,node._id,node._name,node._node_attributs);
        /**/     // add to graph
        /**/     this.branches.push(b);
        /**/     this.graph.nodes.push(n);
        /**/     this.redraw();  
        /**/ });
        /**/ // Del branch broadcast
        /**/ this.socket.on('del branch clt', (branch) => {
        /**/     //hydratation
        /**/     var nodesbranch = Array<NVNode>();
        /**/     this.graph.nodes.forEach(element => {
        /**/        if (element.branch.id == branch._id) {
        /**/            nodesbranch.push(element);
        /**/        }
        /**/    });
        /**/    //supprime la branche
        /**/    this.branches.splice(this.branches.indexOf(nodesbranch[0].branch), 1); 
        /**/    //supprime les edges de la branche
        /**/    nodesbranch.forEach(elt => {
        /**/    this.graph.edges.forEach(element => {
        /**/        if (element.source == elt || element.target == elt)
        /**/            this.graph.edges.splice(this.graph.edges.indexOf(element), 1);
        /**/        });
        /**/    });    
        /**/    //supprime les noeuds de la branche
        /**/    nodesbranch.forEach(element => {
        /**/        this.graph.nodes.splice(this.graph.nodes.indexOf(element), 1);
        /**/    });
        /**/    this.redraw();            
        /**/ });
        /**/ // Update branch broadcast
        /**/ this.socket.on('up branch clt', (branch) => {
        /**/     // update to graph
        /**/     var toUpdateBranch = this.branches.filter((k) => { return (k.id === branch._id) });
        /**/     toUpdateBranch.map((k) => { 
        /**/        this.branches[this.branches.indexOf(k)].name = branch._name;
        /**/        this.branches[this.branches.indexOf(k)].color = branch._color;
        /**/     });
        /**/ });
        /**/ // Add edge broadcast
        /**/ this.socket.on('add edge clt', (edge, source, target) => {
        /**/     // add to graph 
        /**/      var Nedge = new NVEdge(edge._id, edge._name, this.graph.nodes.find(x => x.id == source._id), this.graph.nodes.find(x => x.id == target._id));      
        /**/      this.graph.edges.push(Nedge);
        /**/      this.redraw();
        /**/ });
        /**/ // Del edge broadcast
        /**/ this.socket.on('del edge clt', (source, target) => {
        /**/      // del to graph 
        /**/      var toSplice = this.graph.edges.filter((l) => { return (l.source.id === source._id) && (l.target.id === target._id); });
        /**/      toSplice.map((l) => { this.graph.edges.splice(this.graph.edges.indexOf(l), 1); });
        /**/      this.redraw();
        /**/ });
        /**/ // Update edge broadcast
        /**/ this.socket.on('up edge clt', (Nname, edge) => {
        /**/     //update to graph
        /**/     var toRenameE = this.graph.edges.filter((k) => { return (k.id === edge._id) });
        /**/     toRenameE.map((k) => { 
        /**/        this.graph.edges[this.graph.edges.indexOf(k)].name = Nname; 
        /**/     });
        /**/ });
        /**/ // Add attribute broadcast
        /**/ this.socket.on('add attr clt', (node, attribute) => {
        /**/     // add to graph 
        /**/     var toAddAttribut = this.graph.nodes.filter((k) => { return (k.id === node._id) });
        /**/     toAddAttribut.map((k) => {
        /**/     var Nattribute = new Attribute(attribute._name,attribute._value);      
        /**/        this.graph.nodes[this.graph.nodes.indexOf(k)].attributes.push(Nattribute);
        /**/     });  
        /**/ });
        /**/ // Del attribute broadcast
        /**/ this.socket.on('del attr clt', (node,attribute) => {
        /**/     // del to graph 
        /**/     var toDelAttribut = this.graph.nodes.filter((k) => { return (k.id === node._id) });
        /**/     toDelAttribut.map((k) => { 
        /**/        var toSplice = this.graph.nodes[this.graph.nodes.indexOf(k)].attributes.filter((l) => { return (l.name === attribute._name) });
        /**/        toSplice.map((l) => { this.graph.nodes[this.graph.nodes.indexOf(k)].attributes.splice(this.graph.nodes[this.graph.nodes.indexOf(k)].attributes.indexOf(l), 1); });    
        /**/     });  
        /**/ });
        /**/ // Update attribute broadcast
        /**/ this.socket.on('up attr clt', (type, node, attribute, value, name) => {
        /**/     // update to graph
        /**/        var toGetNode = this.graph.nodes.filter((k) => { return (k.id === node._id) });
        /**/        toGetNode.map((k) => { 
        /**/            var toUpdateAttribute = this.graph.nodes[this.graph.nodes.indexOf(k)].attributes.filter((l) => { return (l.name == attribute._name) });
        /**/            toUpdateAttribute.map((l) => {
        /**/                if(type == "value"){
        /**/                    this.graph.nodes[this.graph.nodes.indexOf(k)].attributes[this.graph.nodes[this.graph.nodes.indexOf(k)].attributes.indexOf(l)].value = value;
        /**/                }else if(type == "name"){
        /**/                    var NewAttribute = new Attribute(name,value);
        /**/                    this.graph.nodes[this.graph.nodes.indexOf(k)].attributes.push(NewAttribute);
        /**/                    this.graph.nodes[this.graph.nodes.indexOf(k)].attributes.splice(this.graph.nodes[this.graph.nodes.indexOf(k)].attributes.indexOf(l), 1);
        /**/                } 
        /**/            });
        /**/        });  
        /**/ });
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
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
            .on("click", (e: NVEdge) => { this.edge = e })
            .on("dblclick", (e: NVEdge) => { this.edgemodalstate = true })
            .style("stroke-width","5")
            .style("stroke","#999");

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
        links.enter().insert("line", ".node").attr("class", "link")
            .on("click", (e: NVEdge) => { this.edge = e})
            .on("dblclick", (e: NVEdge) => { this.edgemodalstate = true })
            .style("stroke-width","5")
            .style("stroke","#999")
        links.exit().remove();
        
        var nodes = this.nodes.data(this.force.nodes());
        nodes.enter().append("circle")
            .attr("class", "node")
            .attr("r", 10)
            .attr("id", (n: NVNode) => { return n.id })
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
            this.line = this.svg.append("line")
                .attr("class", "link")
                .style("stroke-width","5")
                .style("stroke","#999")
                .attr("x1", n.x)
                .attr("y1", n.y)
                .attr("x2", n.x)
                .attr("y2", n.y);
            this.nodes
                .on('mousedown.drag', null)
                .on('touchstart.drag', null);
            this.new_link = true;            
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

    //Création d'un nouvel attribut d'un noeud
    public add_attribute(){
        var NewAttribute = new Attribute('attribut'+(this.node.attributes.length+1),'');
        var response = this.query(Action.create, NewAttribute);
        this.node.attributes.push(NewAttribute);
        this.socket.emit('add attr srv', this.node, NewAttribute);
    }
    
    /** Supression d'un attribut d'un noeud */
    public delete_attribute(attribute: Attribute) {
        this.node.attributes.splice(this.node.attributes.indexOf(attribute), 1);
        this.query(Action.delete, attribute);
        this.socket.emit('del attr srv', this.node, attribute);
    }

    /** Mise à jour d'un attribut d'un noeud */
    public update_attribute(attribute, name, value) {
        var good_name = name.replace(/\s/g, "_").replace(/["\""]/g, "_").replace(/["\'"]/g, "_");
        var toUpdateAttribute = this.node.attributes.filter((k) => { return (k.name == attribute.name) });
        if(attribute.name == good_name){
            toUpdateAttribute.map((k) => { 
                this.node.attributes[this.node.attributes.indexOf(k)].value = value;
                var response = this.query(Action.update, this.node.attributes[this.node.attributes.indexOf(k)]);
                this.socket.emit('up attr srv', "value", this.node, this.node.attributes[this.node.attributes.indexOf(k)], value, good_name);
            });
        }else{
            var creation = true;
            this.node.attributes.forEach(element => {
                if (element.name == good_name && creation){
                    creation = false;
                    alert("Deux attributs ne peuvent avoir le même nom.");
                }
            });
            if(creation){

                toUpdateAttribute.map((k) => {
                    var NewAttribute = new Attribute(good_name,value);
                    this.node.attributes.push(NewAttribute);
                    this.query(Action.create, NewAttribute);
                    this.query(Action.delete, this.node.attributes[this.node.attributes.indexOf(k)]);
                    this.socket.emit('up attr srv', "name", this.node, this.node.attributes[this.node.attributes.indexOf(k)],value, good_name);
                    this.node.attributes.splice(this.node.attributes.indexOf(k), 1);
                });
            }
        }
    }
    /** Création d'un noeud */
    public add_node() {
        this.socket.emit('add node srv',this.user,this.node);
    }
    /** Suppression d'un noeud */
    public delete_node() {
        var NbNode = 0;
        this.graph.nodes.forEach((n:NVNode) => { if(n.branch.id == this.node.branch.id){ NbNode++ } })
        this.socket.emit('del node srv', this.node, NbNode);
    }
    /** Suppression d'un noeud ainsi que ses fils */
    public delete_node_and_sons() {
        var NbNode = 0;
        this.graph.nodes.forEach((n:NVNode) => { if(n.branch.id == this.node.branch.id){ NbNode++ } })
        this.socket.emit('del node & sons srv', this.node, NbNode);
    }
    /** Mise à jour d'un noeud */
    public update_node(node_name:string) {
        this.node.name = node_name;
        this.title_state = false;
        this.socket.emit('up node srv', this.node);
    }
    /** This is a description of the  function. */
    public show_branch(branch: Branch) {

    }
    /** Création d'une nouvelle branche */
    public add_branch(name: string, color: string) {
        if(name != ""){
            this.branch.name = name;
            this.branch.color = color;
            this.socket.emit('add branch srv', this.branch, this.user);
        }else{
            this.branchnamecondition = true;
        }

    }
    /** Affiche la pop up de modification d'une branche */
    public show_update_branch(branch: Branch) {
        this.branchmodalstate = true;
        this.branch = branch;
    }
    /** Modification d'une branche */
    public update_branch() {
        var response = this.query(Action.update, this.branch);
        this.branchmodalstate = false;
        this.socket.emit('up branch srv',this.branch);
    }

    /** This is a description of the  function. */
    public delete_branch(branch: Branch) {
        this.query(Action.delete,branch)
        //trouver le noeud parent le plus élevé et faire this.delete_node_and_sons
        var nodesbranch = Array<NVNode>();
        this.graph.nodes.forEach(element => {
            if (element.branch.id == branch.id) {
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
        this.socket.emit('del branch srv', branch);
    }
    
    /** This is a description of the  function. */
    public add_edge(source: NVNode, target: NVNode) {
        //ajouter a la base de données récup l'id  
        if(source != target){  
            var edge = new NVEdge(2264, 'undfined', source, target);      
            this.graph.edges.push(edge);
            this.query(Action.create,edge);
            this.socket.emit('add edge srv', edge, source, target);
        }       
    }

    /** This is a description of the  function. */
    public delete_edge() {
        this.query(Action.delete,this.edge);
        var toSplice = this.graph.edges.filter((l) => { return (l.source === this.edge.source) && (l.target === this.edge.target); });
        toSplice.map((l) => { this.graph.edges.splice(this.graph.edges.indexOf(l), 1); });
        this.edgemodalstate = false;
        this.redraw();
        this.socket.emit('del edge srv', this.edge.source, this.edge.target);
    }
    /** This is a description of the  function. */
    public update_edge(edgename:string) {
        this.edge.name = edgename;
        var response = this.query(Action.update, this.edge);
        this.title_state = false;
        this.socket.emit('up edge srv', edgename, this.edge);
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
                    if(element instanceof NVNode)cypher = "MATCH (n),(b),(u) WHERE id(n)="+this.node.id+" AND id(b)="+this.node.branch.id+" AND id(u)="+this.user.node.id+" CREATE n-[r:HIERARCHICAL { name:'undefined'}]->(c:Node {name:'undefined'})<-[re:BELONG]-b, (u)-[rel:WRITE]->(c) RETURN r,c";
                    if(element instanceof NVEdge) cypher = "MATCH (s:Node),(t:Node) WHERE id(s)="+element.source.id+" AND id(t)="+element.target.id+" CREATE (s)-[r:CUSTOM { name:'undefined'}]->(t) RETURN r";            
                    if(element instanceof Branch) cypher = "MATCH (u) WHERE id(u)="+this.user.node.id+" CREATE (b:Branch {name:'"+this.branch.name+"',color:'"+this.branch.color+"'})-[re:BELONG]->(n:Node {name:'undefined'})<-[r:WRITE]-u RETURN b, n";
                    if(element instanceof Attribute) cypher = "MATCH (n) WHERE id(n)="+this.node.id+" SET n."+element.name+"='"+element.value+"' RETURN  n";
                    if(element instanceof User) cypher = "CREATE (u:User {mail:'"+element.mail+"',name:'',firstname:'',image_path:''});";
                    break;
                case Action.update:
                    if(element instanceof NVNode) cypher = "MATCH (n) WHERE id(n)="+element.id+" SET n.name ='"+element.name+"'";
                    if(element instanceof NVEdge) cypher = "MATCH ()-[r]-() WHERE id(r)="+element.id+" SET r.name ='"+element.name+"'";
                    if(element instanceof Branch) cypher = "MATCH (b) WHERE id(b)="+element.id+" SET b.name='"+element.name+"', b.color ='"+element.color+"'";
                    if(element instanceof Attribute) cypher = "MATCH (n) WHERE id(n)="+this.node.id+" SET n."+element.name+"='"+element.value+"' RETURN  n";  
                    if(element instanceof User) cypher = "";
                    break;
                case Action.delete:
                    if(element instanceof NVNode) {
                        var isLastNode = 0;
                        this.graph.nodes.forEach((n:NVNode) => { if(n.branch == element.branch) isLastNode++ })
                        if(isLastNode > 0) cypher = "MATCH (n) WHERE id(n)="+element.id+" detach delete n";
                        else  cypher = "MATCH (b),(n) WHERE id(b)="+element.branch.id+" AND (b)-->(n) detach delete b,n";
                    }
                    if(element instanceof NVEdge) cypher = "MATCH ()-[r]-() WHERE id(r)="+element.id+" delete r";
                    if(element instanceof Attribute) cypher = "MATCH (n) WHERE id(n)="+this.node.id+" SET n."+element.name+"= NULL RETURN n";
                    if(element instanceof Branch) cypher = "MATCH (b),(n) WHERE id(b)="+element.id+" AND (b)-->(n) detach delete b,n";
                    break; 
            }
        }
        jQuery.ajax({
                type: 'POST',
                url: this.url+"cypher",
                async: false,
                contentType: "application/json; charset=UTF-8",
                data: JSON.stringify({"query":cypher, "params": {}}),
                success: (data, textStatus, jqXHR) => {
                    response = data.data;
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    response = textStatus;
                }
                });
                
        return response;   
    }
    /** This is a description of the  function. */
    public bdd() {
        //Récupération du user authentifié
        var mail = this.mail;
        var auth_user = <[]>this.query(Action.read,null,"MATCH (u:User) WHERE u.mail = '"+mail+"' RETURN u");
        //si le noeud existe,si il n'existe pas créer le noeud, sinon le récupérer
        if (auth_user.length == 0){
           auth_user =this.query(Action.create,new User(mail))
        }
        //hydrate le user
        this.user = new User(
            auth_user[0][0].data.mail,auth_user[0][0].metadata.id,new NVNode(
                this.userBranch,
                auth_user[0][0].metadata.id,
                auth_user[0][0].data.mail,
                [new Attribute('name',auth_user[0][0].data.name),
                new Attribute('firstname',auth_user[0][0].data.firstname)],null,
                auth_user[0][0].data.image_path));

        //Récupération de tous les noeuds sur lesquels on a la vision
        var response = this.query(Action.read,null,"MATCH (u:User)-[r:KNOWS|WRITE|READ|HIERARCHICAL|CUSTOM*]->(n:Node)<-[re:BELONG]-(b:Branch) WHERE id(u) = "+this.user.node.id+" RETURN keys(n),n,r,b")
        //Récupération de tous les utilisateurs qui ne sont pas nous même
        var reponse_users = this.query(Action.read,null,"MATCH (u:User) WHERE id(u) <> "+this.user.node.id+" RETURN u");
        this.graph = new Graph(1, 'graph');         
        reponse_users.forEach(u => {     
            var n = new NVNode(
                        this.userBranch,
                        u[0].metadata.id,
                        u[0].data.mail,
                        [new Attribute('name',u[0].data.name),
                        new Attribute('firstname',u[0].data.firstname)],null,
                        u[0].data.image_path)
            this.users.push(new User(u[0].data.mail,u[0].metadata.id,n));
            this.graph.nodes.push(n);
         });
        response.forEach(n => { // par chaque noeud
                this.listAttribute = new Array<Attribute>();
                n[0].forEach(nameAttribut => {
                    if(nameAttribut != "name")
                        {
                            var att = new Attribute(nameAttribut,n[1].data[nameAttribut])
                            this.listAttribute.push(att);
                        }
                }); 

                if(!this.found(this.graph.nodes,n[1].metadata.id)){
                this.graph.nodes.push(new NVNode(
                    new Branch(
                        n[3].data.name,
                        n[3].data.color,
                        n[3].metadata.id),
                    n[1].metadata.id,
                    n[1].data.name,
                    this.listAttribute
                    )
                );
            }
        });
        // hydratation des arcs
        response.forEach(r => {
           r[2].forEach(e => {
               if(!this.found(this.graph.edges,e.metadata.id)){
                    var source = this.found(this.graph.nodes,e.start.split("/")[e.start.split("/").length - 1]);
                    var target = this.found(this.graph.nodes,e.end.split("/")[e.end.split("/").length - 1]);
                    if(source && target) this.graph.edges.push(new NVEdge(e.metadata.id,e.data.name,source,target,e.metadata.type));
               }
            });
        }); 
    }
}
bootstrap(GraphUI);

/*germainchipaux@gmail.com
CREATE (u:User {matricule:'troquereaub@gmail.com',name:'Troquereau',firstname:'Benjamin'});
CREATE (u:User {matricule:'germainchipaux@gmail.com',name:'Chipaux',firstname:'Germain'});
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