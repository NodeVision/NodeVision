var Attribute = (function () {
    function Attribute(name, value, type) {
        this._name = name;
        this._value = value;
        this._type = type;
    }
    Object.defineProperty(Attribute.prototype, "name", {
        //TODO
        get: function () { return this._name; },
        set: function (name) { this._name = name; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Attribute.prototype, "value", {
        get: function () { return this._value; },
        set: function (value) { this._value = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Attribute.prototype, "type", {
        get: function () { return this._type; },
        set: function (type) { this._type = type; },
        enumerable: true,
        configurable: true
    });
    return Attribute;
})();
//# sourceMappingURL=attribute.js.map