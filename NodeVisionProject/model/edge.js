var EDGE_TYPE;
(function (EDGE_TYPE) {
    EDGE_TYPE[EDGE_TYPE["hierarchy"] = 0] = "hierarchy";
    EDGE_TYPE[EDGE_TYPE["custom"] = 1] = "custom";
})(EDGE_TYPE || (EDGE_TYPE = {}));
var NVEdge = (function () {
    function NVEdge(id, name, source, target) {
        this._id = id;
        this._name = name;
        this.source = source;
        this.target = target;
    }
    return NVEdge;
})();
//# sourceMappingURL=edge.js.map