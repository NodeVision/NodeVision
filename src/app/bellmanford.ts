import {Graph} from './model/graph';

export class Bellmanford{
    //function qui afficher le resultat
    public printArray(dist:number[],num:number){
        
        console.log("Vertex   Distance from Source\n")
        for(var i=0 ; i < num; i++){
            console.log("%d \t\t %d\n", i, dist[i])
        }
    }

    //implementation de algorithme bellmanford
    //qui chercher les distance minimal de source à chaque points dans le gragh
    //ce function aussi detecte les cycle de "negative weight"

    public BellmanFord(graph :Graph ,depart:number){
        var V=graph.nodes.length;
        var E=graph.edges.length;
        var dist=new Array<number>();
        //initialiser les distances entre source et chaque point avec un valeur infini 
        for(var i=0;i<=V;i++){
            dist[i]=Number.MAX_VALUE;
        }
        
        dist[depart]=0;
        
        //Détender tous les edges | V | - 1 fois. 
        //Un chemin simple et plus court à partir de src à tout autre sommet peut avoir au plus | V | - 1 arêtes
        for(var i=0; i<=V-1; i++){
            for(var j=0; j<E; j++){
                var src=graph.edges[j].source.id;
                var dest=graph.edges[j].target.id;
                var weight = graph.edges[j].weight;
                if( dist[src]+weight<dist[dest] ){
                    dist[dest]=dist[src]+weight;
                }
            }
        }
        //verfier les cycles"negative-weight"
        //ce boucle garantit que les plus courtes distances ne contient pas de cycle"negative-weight"
        //si nous obtenons un chemin encore plus court que le resultat de ce boucle alors il a contient au mois un cycle "negative-weight"
        for(var j=0; j<E; j++){
                var src=graph.edges[j].source.id;
                var dest=graph.edges[j].target.id;
                var weight = graph.edges[j].weight;
                if( dist[src]+weight<dist[dest] ){
                    console.log("Graph contains negative weight cycle");
                }
        }
        this.printArray(dist,V);
    }
}