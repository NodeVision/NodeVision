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