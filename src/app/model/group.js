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
var Group = (function () {
    function Group(id, name) {
        this._id = id;
        this._name = name;
    }
    Object.defineProperty(Group.prototype, "name", {
        get: function () { return this._name; },
        set: function (name) { this._name = name; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "users", {
        get: function () { return this._users; },
        set: function (users) { this._users = users; },
        enumerable: true,
        configurable: true
    });
    Group = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [Number, String])
    ], Group);
    return Group;
})();
exports.Group = Group;
//# sourceMappingURL=group.js.map