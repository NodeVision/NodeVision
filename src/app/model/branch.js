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