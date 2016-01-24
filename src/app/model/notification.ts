import {Injectable} from 'angular2/angular2';
import {User} from './user';
import {Branch} from './branch';
export class Notification{
    private _from:User;
    private _name:string;
    private _message:string;
    private _branch:Branch;
    
    constructor(from:User,name:string,branch:Branch,message?:string){
         this._from = from;
         this._message = message;
         this._name = name;
         this._branch = branch;
    }
    public notif(){
         var m = this._from.node.attributes['firstname']+' '+
            this._from.node.name+' propose to collaborate on '+
            this._branch.name;
         return m;
            
    }
    get message(){return this._message}
    
    
}