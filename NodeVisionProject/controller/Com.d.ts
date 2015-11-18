declare enum State {
    sucess = 0,
    warning = 1,
    fail = 2,
    create = 3,
    read = 4,
    update = 5,
    delete = 6,
}
declare class response<T> {
    state: State;
    message: string;
    data: T;
    ui: Elem<HTMLElement>;
    constructor(state: State, message?: string, data?: T, ui?: Elem<HTMLElement>);
}
declare class request {
    crud: State;
    data: any;
    constructor(crud: State, data?: any);
}
