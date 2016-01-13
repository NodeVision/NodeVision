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
    Attribute = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [String, Object, String])
    ], Attribute);
    return Attribute;
})();
exports.Attribute = Attribute;
//# sourceMappingURL=attribute.js.map