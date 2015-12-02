import {Injectable} from 'angular2/angular2';
@Injectable()
export class Branch {
    private _id: number;
    private _name: string;
    private _color: string; //#1f77b4

    constructor(id: number) {
        this._id = id;
    }
    get id() { return this._id }
    get name() { return this._name }
    get color() { return this._color }
    set name(name: string) { this._name = name }
    set color(color: string) { this._color = color }
}