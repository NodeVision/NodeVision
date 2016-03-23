import {Graph} from './model/graph';
export class Bellmanford{
    //function qui affiche le resultat
    public printArray(dist:number[],num:number){
        
        console.log("Vertex   Distance from Source\n")
        for(var i=0 ; i < num; i++){
            console.log("%d \t\t %d\n", i, dist[i])
        }
    }
    
    public BellmanFord(graph :Graph ,depart:number,type_weight:string){
        var V=graph.nodes.length;
        var E=graph.edges.length;
        var dist=new Array<number>();
        //initialiser les distances entre la source et chaque point avec une valeur infini 
        for(var i=0;i<=V;i++){
            dist[i]=Number.MAX_VALUE;
        }
        dist[depart]=0;
        //détection des poids positif
        for(var i=0; i<=V-1; i++){
            for(var j=0; j<E; j++){
                var src=graph.edges[j].source.id;
                var dest=graph.edges[j].target.id;               
                var weight = graph.edges[j].weight.find(x => x.name == type_weight).value;
                if( dist[src]+weight<dist[dest] ){
                    dist[dest]=dist[src]+weight;
                }
            }
        }
        //détection des poids négatif
        for(var j=0; j<E; j++){
                var src=graph.edges[j].source.id;
                var dest=graph.edges[j].target.id;
                var weight = graph.edges[j].weight.find(x => x.name == type_weight).value;
                if( dist[src]+weight<dist[dest] ){
                    console.log("Graph contains negative weight cycle");
                }
        }
        this.printArray(dist,V);
    }
}