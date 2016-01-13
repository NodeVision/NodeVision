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
var ConnexionUI = (function () {
    function ConnexionUI() {
    }
    /**
     * connect_user
     */
    ConnexionUI.prototype.connect_user = function () {
        alert("test");
    };
    /**
     * register_user
     */
    ConnexionUI.prototype.register_user = function () {
    };
    ConnexionUI = __decorate([
        angular2_1.View({
            templateUrl: 'app/connexionUI.html',
            directives: [angular2_1.CORE_DIRECTIVES]
        }),
        angular2_1.Component({
            selector: 'connexion'
        }), 
        __metadata('design:paramtypes', [])
    ], ConnexionUI);
    return ConnexionUI;
})();
exports.ConnexionUI = ConnexionUI;
angular2_1.bootstrap(ConnexionUI);
//# sourceMappingURL=connexionUI.js.map