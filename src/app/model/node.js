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
var branch_1 = require('./branch');
var NVNode = (function () {
    function NVNode(id, name, branch, id_owner, id_viewer, node_attributs, parent_node, node_relationships) {
        this._id_owner = new Array();
        this._id_viewer = new Array();
        this._node_relationships = new Array();
        this._id = this.index = id;
        this._name = name;
        this._id_owner = id_owner;
        this._id_viewer = id_viewer;
        this._node_attributs = node_attributs;
        this._parent_node = parent_node;
        this._branch = branch;
        this._node_relationships = node_relationships;
    }
    Object.defineProperty(NVNode.prototype, "name", {
        //get & set
        get: function () { return this._name; },
        set: function (name) { this._name = name; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NVNode.prototype, "id", {
        get: function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NVNode.prototype, "parent_node", {
        get: function () { return this._parent_node; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NVNode.prototype, "attributes", {
        get: function () { return this._node_attributs; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NVNode.prototype, "viewvers", {
        get: function () { return this._id_owner; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NVNode.prototype, "owners", {
        get: function () { return this._id_owner; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NVNode.prototype, "branch", {
        get: function () { return this._branch; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NVNode.prototype, "node_relationships", {
        get: function () { return this._node_relationships; },
        enumerable: true,
        configurable: true
    });
    NVNode = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [Number, String, branch_1.Branch, Array, Array, Array, NVNode, Array])
    ], NVNode);
    return NVNode;
})();
exports.NVNode = NVNode;
//# sourceMappingURL=node.js.map