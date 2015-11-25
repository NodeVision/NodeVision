enum Action { create, read, update, delete }
enum Status { sucess, warning, fail }
class response<T> {
    public state: Status;
    public message: string;
    public data: T;
    public ui: any;
    
    constructor(state: Status, message?: string, data?: T, ui?:any) {
        
        this.state = state;
        if (message) this.message = message;
        if (data) this.data = data;
        if (ui) this.ui = ui;
    }
}
class request{
    public crud: Action;
    public data: any;
    constructor(crud: Action, data?: any) {
        this.crud = crud;
        if (data) this.data = data;
    }
}