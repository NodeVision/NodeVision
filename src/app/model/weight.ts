export class Weight{
        private _name:string;
        private _value: number;
        constructor(name?:string,value?:number){
            this._name = name;
            this._value = value 
        }
        //TODO
        get name(){ return this._name; }
        get value(){ return this._value; }
        set name(name : string){ this._name=name; }
        set value(value: number){ this._value=value; } 

} 