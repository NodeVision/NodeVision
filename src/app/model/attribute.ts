import {Element} from '../enum';
import {Status} from '../enum';
<<<<<<< HEAD
=======

>>>>>>> 8af129ed4a093e03a15b64892799e9a2f45df1f7
export class Attribute{
        private _name:string;
        private _value: any;
        constructor(name?:string,value?:any){
            this._name = name;
            this._value = value 
        }
        //TODO
        get name(){ return this._name; }
        get value(){ return this._value; }
        set name(name : string){ this._name=name; }
        set value(value: any){ this._value=value; } 

} 