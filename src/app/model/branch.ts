import {Injectable} from 'angular2/angular2';
@Injectable()
export class Branch {
    private _id: number;
    private _name: string;
    private _color: string; //#1f77b4

    constructor(name?: string, color?: string) {
        if (name)
            this._name = name;
        if (color)
            this._color = color;
    }
    get id() { return this._id }
    get name() { return this._name }
    get color() { return this._color }
    set name(name: string) { this._name = name }
    set color(color: string) { this._color = color }
}