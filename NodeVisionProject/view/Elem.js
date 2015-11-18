var Modal;
(function (Modal) {
    Modal[Modal["graph"] = 0] = "graph";
    Modal[Modal["branch"] = 1] = "branch";
    Modal[Modal["node"] = 2] = "node";
    Modal[Modal["edge"] = 3] = "edge";
    Modal[Modal["user"] = 4] = "user";
})(Modal || (Modal = {}));
var Elem = (function () {
    function Elem(typeElement, className, attributes) {
        this.e = document.createElement(typeElement);
        if (className) {
            this.class = this.e.className = className;
        }
        if (attributes) {
            this.addAttributes(attributes);
        }
    }
    Elem.prototype.addAttributes = function (attributes) {
        var _this = this;
        if (attributes instanceof Attribute) {
            this.e.setAttribute(attributes.name, attributes.value.toString());
        }
        else if (attributes instanceof Array) {
            attributes.forEach(function (a) {
                _this.e.setAttribute(a.name, a.value.toString());
            });
        }
    };
    Elem.prototype.appendChild = function (childs) {
        var _this = this;
        if (childs instanceof HTMLElement) {
            this.e.appendChild(childs);
            return this;
        }
        else if (childs instanceof Array) {
            childs.forEach(function (c) {
                _this.e.appendChild(c);
            });
            return this;
        }
    };
    return Elem;
})();
//# sourceMappingURL=Elem.js.map