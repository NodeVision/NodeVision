var Branch = (function () {
    function Branch(id) {
        this._id = id;
    }
    Object.defineProperty(Branch.prototype, "id", {
        get: function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Branch.prototype, "name", {
        get: function () { return this._name; },
        set: function (name) { this._name = name; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Branch.prototype, "color", {
        get: function () { return this._color; },
        set: function (color) { this._color = color; },
        enumerable: true,
        configurable: true
    });
    return Branch;
})();
//# sourceMappingURL=branch.js.map