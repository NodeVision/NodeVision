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
var Attribute = (function () {
    function Attribute(id, name, value, type) {
        this._id = id;
        this._name = name;
        this._value = value;
        this._type = type;
    }
    Object.defineProperty(Attribute.prototype, "id", {
        //TODO
        get: function () { return this._id; },
        set: function (id) { this._id = id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Attribute.prototype, "name", {
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
        __metadata('design:paramtypes', [Number, String, Object, String])
    ], Attribute);
    return Attribute;
})();
exports.Attribute = Attribute;
//# sourceMappingURL=attribute.js.map