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
var Branch = (function () {
    function Branch(name, color, type, id) {
        this.types = ['Standard', 'User', 'Group', 'Temporal']; // TODO METTRE AUTRE PART
        if (name)
            this._name = name;
        if (color)
            this._color = color;
        if (type)
            this._type = 'Standard';
        if (id)
            this._id = id;
    }
    Object.defineProperty(Branch.prototype, "id", {
        get: function () { return this._id; },
        set: function (id) { this._id = id; },
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
    Object.defineProperty(Branch.prototype, "type", {
        get: function () { return this._type; },
        set: function (type) { this._type = type; },
        enumerable: true,
        configurable: true
    });
    Branch = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [String, String, String, Number])
    ], Branch);
    return Branch;
})();
exports.Branch = Branch;
//# sourceMappingURL=branch.js.map