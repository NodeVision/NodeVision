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
    return User;
})();
//# sourceMappingURL=user.js.map