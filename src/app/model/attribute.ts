import {Injectable} from 'angular2/angular2';
import {Modal} from '../enum';
import {Status} from '../enum';
@Injectable()
export class Attribute{
        private _name:string;
        private _value: string | Modal | Status;
        private _type: string;
        
        constructor(name?:string,value?:string|Modal|Status,type?:string){
            this._name = name;
            this._value = value 
            this._type = type;
        }
        //TODO
        get name(){ return this._name; }
        get value(){ return this._value; }
        get type() { return this._type; }
        set name(name : string){ this._name=name; }
        set value(value: string | Modal | Status){ this._value=value; }
        set type(type: string) { this._type = type; } 
        
} 