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
    function NVNode(branch, id, name, node_attributs, users) {
        this._id = id;
        this._name = name;
        this._node_attributs = node_attributs;
        this._branch = branch;
        this._users = users;
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
        set: function (id) { this._id = id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NVNode.prototype, "attributes", {
        get: function () { return this._node_attributs; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NVNode.prototype, "branch", {
        get: function () { return this._branch; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NVNode.prototype, "users", {
        get: function () { return this._users; },
        enumerable: true,
        configurable: true
    });
    NVNode = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [branch_1.Branch, Number, String, Array, Array])
    ], NVNode);
    return NVNode;
})();
exports.NVNode = NVNode;
//# sourceMappingURL=node.js.map