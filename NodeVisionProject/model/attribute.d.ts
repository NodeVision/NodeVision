declare class Attribute extends Observable {
    private name;
    private value;
    private type;
    constructor(name?: string, value?: string | Modal | State, type?: string);
    getName(): string;
    getValue(): string | Modal | State;
    getType(): string;
    setName(name: string): void;
    setValue(value: string | Modal | State): void;
    setType(type: string): void;
}
