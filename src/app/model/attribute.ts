import {Injectable} from 'angular2/angular2';
import {Element} from '../enum';
import {Status} from '../enum';
@Injectable()
export class Attribute{
        private _id: number;
        private _name:string;
        private _value: any;
        
        constructor(id:number, name?:string,value?:any){
            this._id = id;
            this._name = name;
            this._value = value 
        }
        //TODO
        get id(){return this._id; }
        get name(){ return this._name; }
        get value(){ return this._value; }
        set id(id : number){ this._id = id; }
        set name(name : string){ this._name=name; }
        set value(value: any){ this._value=value; }
        
} 