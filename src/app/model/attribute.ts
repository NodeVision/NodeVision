import {Injectable} from 'angular2/angular2';
import {Element} from '../enum';
import {Status} from '../enum';
@Injectable()
export class Attribute{
        private _name:string;
        private _value: any;
        
<<<<<<< HEAD
        constructor(id:number, name?:string,value?:any){
            this._id = id;
=======
        constructor(name?:string,value?:any){
>>>>>>> origin/dev
            this._name = name;
            this._value = value 
        }
        //TODO
        get name(){ return this._name; }
        get value(){ return this._value; }
<<<<<<< HEAD
        set id(id : number){ this._id = id; }
        set name(name : string){ this._name=name; }
        set value(value: any){ this._value=value; }
        
=======
        set name(name : string){ this._name=name; }
        set value(value: any){ this._value=value; } 
>>>>>>> origin/dev
} 