declare class UIModal {
    private mhead;
    private mbody;
    private mfoot;
    constructor(id: Modal);
    gethead(): Elem<HTMLElement>;
    getbody(): Elem<HTMLElement>;
    getfoot(): Elem<HTMLElement>;
}
