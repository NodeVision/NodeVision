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
var node_1 = require('./node');
(function (EDGE_TYPE) {
    EDGE_TYPE[EDGE_TYPE["hierarchy"] = 0] = "hierarchy";
    EDGE_TYPE[EDGE_TYPE["custom"] = 1] = "custom";
})(exports.EDGE_TYPE || (exports.EDGE_TYPE = {}));
var EDGE_TYPE = exports.EDGE_TYPE;
var NVEdge = (function () {
    function NVEdge(id, name, source, target) {
        this._id = id;
        this._name = name;
        this.source = source;
        this.target = target;
    }
    NVEdge = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [Number, String, node_1.NVNode, node_1.NVNode])
    ], NVEdge);
    return NVEdge;
})();
exports.NVEdge = NVEdge;
//# sourceMappingURL=edge.js.map