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
var enum_1 = require('../enum');
var Popup = (function () {
    function Popup(type, message, details, preference) {
        this._type = type;
        this._message = message;
        this._details = details;
        this._preference = preference;
    }
    Popup = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [Number, String, String, preferencepopup_1.PreferencePopup])
    ], Popup);
    return Popup;
})();
exports.Popup = Popup;
//# sourceMappingURL=popup.js.map