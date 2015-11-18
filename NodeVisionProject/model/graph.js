var Graph = (function () {
    function Graph(id, name) {
        this._nodes = new Array();
        this._edges = new Array();
        this._id = id;
        this._name = name;
    }
    Object.defineProperty(Graph.prototype, "nodes", {
        get: function () { return this._nodes; },
        set: function (nodes) { this._nodes = nodes; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Graph.prototype, "edges", {
        get: function () { return this._edges; },
        set: function (edges) { this._edges = edges; },
        enumerable: true,
        configurable: true
    });
    return Graph;
})();
//# sourceMappingURL=graph.js.map