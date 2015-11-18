declare class UIAttribute {
    private div_attribute;
    constructor(attribute: Attribute);
    setui(attribute: Attribute): void;
    getui(): Elem<HTMLElement>;
}
