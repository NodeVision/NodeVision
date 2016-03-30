import {PreferencePopup} from './preferencepopup';
import {Status} from '../enum';
import {User} from './user';
import {NVNode} from './node';
export class Log {
    public _type: Status;
    public _message: string;
    public author: User;
    public _details: string;
    public _noeudBeforeModif: NVNode;
    public _noeudMofifie : NVNode
    constructor(type: Status, message: string, author:User, details: string,noeudBeforeModif?: NVNode, noeudModifie?: NVNode) {
        this._type = type;
        this._message = message;
        this._details = details;
        this.author = author;
        this._noeudBeforeModif = noeudBeforeModif;
        this._noeudMofifie = noeudModifie;
    }
    
    get TitleNoeudModifie(){
        console.log(this._noeudBeforeModif != null && this._noeudMofifie != null ? this._noeudBeforeModif.name != this._noeudMofifie.name : false);
        
        return this._noeudBeforeModif != null && this._noeudMofifie != null ? this._noeudBeforeModif.name != this._noeudMofifie.name : false;
    }
    
        get ImageNoeudModifie(){
            console.log(this._noeudBeforeModif != null && this._noeudMofifie != null ? this._noeudBeforeModif.image_path != this._noeudMofifie.image_path : false);
            
        return this._noeudBeforeModif != null && this._noeudMofifie != null ? this._noeudBeforeModif.image_path != this._noeudMofifie.image_path : false;
    }
}