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
    Graph = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [Number, String])
    ], Graph);
    return Graph;
})();
exports.Graph = Graph;
//# sourceMappingURL=graph.js.map