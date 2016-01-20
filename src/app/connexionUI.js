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