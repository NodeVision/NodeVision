declare module node_neo4j {

    export interface PropertyContainer {
        // The URL of this property container.
        self: string;
		
        // Whether this property container exists in (has been persisted to) the Neo4j database.
        exists: boolean;
		
        // If this property container exists, its Neo4j integer ID.
        id: number;
		
        // This property container's properties. This is a map of key-value pairs.
        data: { [key: string]: any; };
		
        // Test whether the given object represents the same property container as this one.
        equals(other: PropertyContainer): boolean;
		
        // Delete this property container from the database.
        'delete'(): void;
		
        // A convenience alias for #delete since delete is a reserved keyword in JavaScript.
        del(): void;
		
        // Return a JSON representation of this property container, suitable for serialization.
        toJSON(): any;
    }

    export interface Node extends PropertyContainer {
        // Return a human-readable string representation of this node, suitable for development purposes (e.g.
        toString(): String;
		
        // Persist or update this node in the database.
        save(_?: Callback<Node>): void;
		
        // Delete this node from the database.
        'delete'(_?: Callback<void>, force?: boolean): void;
		
        // Delete this node from the database.
        del(_?: Callback<void>, force?: boolean): void;
		
        // Add this node to the given index under the given key-value pair.
        index(index: string, key: string, value: any, _?: Callback<void>): void;
		
        // Delete this node from the given index, optionally under the given key or key-value pair.
        unindex(index: string, key: string, value: any, _: Callback<void>): void;
		
        // Create and "return" (via callback) a relationship of the given type, and optionally with the given properties, from this node to another node.
        createRelationshipTo(otherNode: Node, type: string, data: any, cb: Callback<Relationship>): void;
		
        // Create and "return" (via callback) a relationship of the given type, and optionally with the given properties, from another node to this node.
        createRelationshipFrom(otherNode: Node, type: string, data: any, cb: Callback<Relationship>): void;
		
        // Fetch and "return" (via callback) the relationships of the given type or types from or to this node.
        getRelationships(type: string, _: Callback<Relationship[]>): void;
		
        // Fetch and "return" (via callback) the relationships of the given type or types from this node.
        outgoing(type: string, _: Callback<Relationship[]>): void;
		
        // Fetch and "return" (via callback) the relationships of the given type or types to this node.
        incoming(type: string, _: Callback<Relationship[]>): void;
		
        // Fetch and "return" (via callback) the relationships of the given type or types from or to this node.
        all(type: string, _: Callback<Relationship[]>): void;
		
        // Fetch and "return" (via callback) the nodes adjacent to this one following only relationships of the given type(s) and/or direction(s).
        getRelationshipNodes(rels: string | any | string[] | any[], _: Callback<Node[]>): void;
		
        // Fetch and "return" (via callback) the shortest path, if there is one, from this node to the given node.
        path(to: Node, type: string, direction: string, maxDepth?: number, algorithm?: string, _?: Callback<Path>): void;
    }

    export interface Relationship extends PropertyContainer {
        // The node this relationship goes from.
        start: Node;
		
        // The node this relationship goes to.
        end: Node;
		
        // This relationship's type.
        'type': string;
		
        // Return a human-readable string representation of this relationship, suitable for development purposes (e.g.
        toString(): string;
		
        // Persist or update this relationship in the database.
        save(_: Callback<Relationship>): void;
		
        // Add this relationship to the given relationship index under the given property key and value.
        index(index: string, key: string, value: any, _: Callback<void>): void;
		
        // Delete this relationship from the given index, optionally under the given key or key- value pair.
        unindex(index: string, key: string, value: any, _: Callback<void>): void;
    }

    export interface Path {
        // The node that this path starts at.
        start: Node;
		
        // The node that this path ends at.
        end: Node;
		
        // The length of this path.
        length: number;
		
        // The nodes that make up this path.
        nodes: Node[];
		
        // The relationships that make up this path.
        relationships: Relationship[];
    }

    export interface GraphDatabaseOptions {
        url: string;
        proxy?: string;
    }

    export interface Callback<T> {
        (err: Error, result: T): void;
    }

    export class GraphDatabase {
        // Construct a new client for the Neo4j graph database available at the given (root) URL.
        constructor(url: string);
        constructor(opts: GraphDatabaseOptions);
		
        // Create and immediately return a new, unsaved node with the given properties.
        createNode(data: any): Node;
		
        // Fetch and "return" (via callback) the node with the given Neo4j ID.
        getNodeById(id: number, _: Callback<Node>): void;

        // Fetch and "return" (via callback) the node indexed under the given property and value in the given index.
        getIndexedNode(index: string, property: string, value: any, _: Callback<Node>): void;

        // Fetch and "return" (via callback) the nodes indexed under the given property and value in the given index.
        getIndexedNodes(index: string, property: string, value: any, _: Callback<Node[]>): void;
		
        // Fetch and "return" (via callback) the nodes matching the given query (in Lucene syntax) from the given index.
        queryNodeIndex(index: string, query: string, _: Callback<Node[]>): void;
		
        // Fetch and "return" (via callback) the relationship with the given Neo4j ID.
        getRelationshipById(id: number, _: Callback<Relationship>): void;
		
        // Fetch and "return" (via callback) the relationship indexed under the given property and value in the given index.
        getIndexedRelationship(index: string, property: string, value: any, _: Callback<Relationship>): void;
		
        // Fetch and "return" (via callback) the relationships indexed under the given property and value in the given index.
        getIndexedRelationships(index: string, property: string, value: any, _: Callback<Relationship[]>): void;
		
        // Fetch and "return" (via callback) the relationships matching the given query (in Lucene syntax) from the given index.
        queryRelationshipIndex(index: string, query: string, _: Callback<Relationship[]>): void;
		
        // Get the current existing node indexes.
        getNodeIndexes(_: Callback<string[]>): void;
		
        // Create node index.
        createNodeIndex(name: string, config?: any, _?: Callback<void>): void;
		
        // Delete a node index.
        deleteNodeIndex(name: string, _?: Callback<void>): void;

        // Get the current existing relationship indexes.
        getRelationshipIndexes(_: Callback<string[]>): void;

        // Create relationship index.
        createRelationshipIndex(name: string, config?: any, _?: Callback<void>): void;
		
        // Delete a relationship index.
        deleteRelationshipIndex(name: string, _?: Callback<void>): void;
		
        // Transforms the given node or relationship object, parsed from JSON, to its appropriate node or relationship instance.
        fromJSON(obj: any): PropertyContainer;
		
        // A "reviver" function for JSON.parse() that'll transform any serialized nodes or relationships into their appropriate instances.
        reviveJSON(key: string, val: any): any;
		
        // Fetch and "return" (via callback) the results of the given Cypher query, optionally passing along the given query parameters (recommended to avoid Cypher injection security vulnerabilities).
        query<T>(query: string, params?: any, _?: Callback<T[]>): void;
		
        // Execute and "return" (via callback) the results of the given Gremlin script, optionally passing along the given script parameters (recommended to avoid Gremlin injection security vulnerabilities).
        execute<T>(script: string, params?: any, _?: Callback<T>): void;
    }
}