var Ctrlbar = (function () {
    function Ctrlbar() {
    }
    Ctrlbar.prototype.init = function (uibar) {
        this.uibar = uibar;
    };
    Ctrlbar.prototype.updateSettings = function (ui) {
        this.uibar.setpreferencepopup(ui);
    };
    return Ctrlbar;
})();
//# sourceMappingURL=Ctrlbar.js.map