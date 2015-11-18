var Action;
(function (Action) {
    Action[Action["create"] = 0] = "create";
    Action[Action["read"] = 1] = "read";
    Action[Action["update"] = 2] = "update";
    Action[Action["delete"] = 3] = "delete";
})(Action || (Action = {}));
var Status;
(function (Status) {
    Status[Status["sucess"] = 0] = "sucess";
    Status[Status["warning"] = 1] = "warning";
    Status[Status["fail"] = 2] = "fail";
})(Status || (Status = {}));
var response = (function () {
    function response(state, message, data, ui) {
        this.state = state;
        if (message)
            this.message = message;
        if (data)
            this.data = data;
        if (ui)
            this.ui = ui;
    }
    return response;
})();
var request = (function () {
    function request(crud, data) {
        this.crud = crud;
        if (data)
            this.data = data;
    }
    return request;
})();
//# sourceMappingURL=Com.js.map