(function (Action) {
    Action[Action["create"] = 0] = "create";
    Action[Action["read"] = 1] = "read";
    Action[Action["update"] = 2] = "update";
    Action[Action["delete"] = 3] = "delete";
})(exports.Action || (exports.Action = {}));
var Action = exports.Action;
(function (Status) {
    Status[Status["sucess"] = 0] = "sucess";
    Status[Status["warning"] = 1] = "warning";
    Status[Status["fail"] = 2] = "fail";
})(exports.Status || (exports.Status = {}));
var Status = exports.Status;
(function (Modal) {
    Modal[Modal["graph"] = 0] = "graph";
    Modal[Modal["branch"] = 1] = "branch";
    Modal[Modal["node"] = 2] = "node";
    Modal[Modal["edge"] = 3] = "edge";
    Modal[Modal["user"] = 4] = "user";
})(exports.Modal || (exports.Modal = {}));
var Modal = exports.Modal;
(function (EDGE_TYPE) {
    EDGE_TYPE[EDGE_TYPE["hierarchy"] = 0] = "hierarchy";
    EDGE_TYPE[EDGE_TYPE["custom"] = 1] = "custom";
})(exports.EDGE_TYPE || (exports.EDGE_TYPE = {}));
var EDGE_TYPE = exports.EDGE_TYPE;
//# sourceMappingURL=enum.js.map