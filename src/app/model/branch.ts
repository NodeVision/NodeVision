import {Injectable} from 'angular2/angular2';

@Injectable()
export class Branch {
    private _id: number;
    private _name: string;
    private _color: string;

    constructor(name?: string, color?: string,id?:number) {
        if (name) this._name = name;
        if (color) this._color = color;
        if (id) this._id = id;
    }
    get id() { return this._id }
    get name() { return this._name }
    get color() { return this._color }
    set id(id: number) { this._id = id }
    set name(name: string) { this._name = name }
    set color(color: string) { this._color = color }
}