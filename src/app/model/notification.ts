import {User} from './user';
import {Branch} from './branch';
export class Notification{
    private _from:User;
    private _name:string;
    private _message:string;
    private _branch:Branch;
    private _note;
    
    constructor(from:User,name:string,branch:Branch,message?:string){
         this._from = from;
         this._message = message;
         this._name = name;
         this._branch = branch;
         if(from.node.attributes[1].value != '' && from.node.attributes[0].value != ''){
             this._note = from.node.attributes[1].value+' '+from.node.attributes[0].value;
         }else{
             this._note = from.mail;
         }
         this._note +=' propose to collaborate on '+this._branch.name;    
    }
    get from(){ return this._from}
    get note(){return this._note}
    get message(){return this._message}
}