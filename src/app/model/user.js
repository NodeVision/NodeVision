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
var preferencepopup_1 = require('./preferencepopup');
var User = (function () {
    function User(matricule, name, firsname, preferencepopup, branchVsblty) {
        this._matricule = matricule;
        this._name = name;
        this._firstname = firsname;
        this._preferencepopup = preferencepopup;
    }
    Object.defineProperty(User.prototype, "matricule", {
        get: function () { return this._matricule; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "name", {
        get: function () { return this._name; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "firstname", {
        get: function () { return this._firstname; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "preferencepopup", {
        get: function () { return this._preferencepopup; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "branchesvisibility", {
        get: function () { return this._branchesvisibility; },
        enumerable: true,
        configurable: true
    });
    User = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [String, String, String, preferencepopup_1.PreferencePopup, Array])
    ], User);
    return User;
})();
exports.User = User;
//# sourceMappingURL=user.js.map