var NVNode = (function () {
    function NVNode(id, name, branch, id_owner, id_viewer, node_attributs, parent_node, node_relationships) {
        this._id_owner = new Array();
        this._id_viewer = new Array();
        this._node_relationships = new Array();
        this._id = id;
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
    Object.defineProperty(NVNode.prototype, "id_node", {
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
    return NVNode;
})();
//# sourceMappingURL=node.js.map