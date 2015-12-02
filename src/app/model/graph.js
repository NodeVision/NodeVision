var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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