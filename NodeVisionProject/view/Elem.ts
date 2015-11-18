enum Modal { graph, branch, node, edge, user }
class Elem<T extends HTMLElement> {
        public e : T;
        public class : string;
        public atts : Array<Attribute>;
        constructor(typeElement:string,className?:string,attributes?:Array<Attribute>|Attribute){
        this.e = <T>document.createElement(typeElement);
        if(className){ this.class = this.e.className = className;}    
        if(attributes){ this.addAttributes(attributes);}
        }
        public addAttributes(attributes : Array<Attribute>|Attribute){
                if(attributes instanceof Attribute){
                        this.e.setAttribute(attributes.name,attributes.value.toString());
                }else if(attributes instanceof Array){
                        attributes.forEach(a => {
                        this.e.setAttribute(a.name,a.value.toString());
                        });  
                }
        }
        public appendChild(childs : HTMLElement|HTMLElement[]){
                if(childs instanceof HTMLElement){
                        this.e.appendChild(childs);
                        return this;
                }else if(childs instanceof Array){
                        childs.forEach( c => {
                        this.e.appendChild(c);
                        });
                        return this;
                }
        }
}
