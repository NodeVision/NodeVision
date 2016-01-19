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
var AuthApp = (function () {
    function AuthApp() {
        this.lock = new Auth0Lock('9B7uUwnzc73tnd1YVu3oE7cesLWqciSA', 'nodevision.eu.auth0.com');
    }
    AuthApp.prototype.login = function () {
        this.lock.show(function (err, profile, id_token) {
            if (err) {
                throw new Error(err);
            }
            localStorage.setItem('profile', JSON.stringify(profile));
            localStorage.setItem('id_token', id_token);
        });
    };
    AuthApp.prototype.logout = function () {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
    };
    AuthApp.prototype.loggedIn = function () {
        // return tokenNotExpired();
    };
    AuthApp = __decorate([
        angular2_1.View({
            templateUrl: 'app/connexionUI.html',
            directives: [angular2_1.CORE_DIRECTIVES]
        }),
        angular2_1.Component({
            selector: 'AuthApp'
        }), 
        __metadata('design:paramtypes', [])
    ], AuthApp);
    return AuthApp;
})();
exports.AuthApp = AuthApp;
angular2_1.bootstrap(AuthApp);
//# sourceMappingURL=connexionUI.js.map