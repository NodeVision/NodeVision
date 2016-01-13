import {Injectable} from 'angular2/angular2';

@Injectable()
export class Branch {
    private _id: number;
    private _name: string;
    private _color: string; //#1f77b4
    private _type: string;
    public types = ['Standard','User','Group','Temporal']; // TODO METTRE AUTRE PART

    constructor(name?: string, color?: string,type?:string,id?:number) {
        if (name) this._name = name;
        if (color) this._color = color;
        if (type) this._type = 'Standard';
        if (id) this._id = id;
    }
    get id() { return this._id }
    get name() { return this._name }
    get color() { return this._color }
    get type() { return this._type }
    set id(id: number) { this._id = id }
    set name(name: string) { this._name = name }
    set color(color: string) { this._color = color }
    set type(type: string) { this._type = type }
}