declare enum Modal {
    graph = 0,
    node = 1,
    edge = 2,
    user = 3,
}
declare class Elem<T extends HTMLElement> {
    e: T;
    class: string;
    atts: Array<Attribute>;
    constructor(typeElement: string, className?: string, attributes?: Array<Attribute> | Attribute);
    addAttributes(attributes: Array<Attribute> | Attribute): void;
    appendChild(childs: HTMLElement | HTMLElement[]): Elem<T>;
}
