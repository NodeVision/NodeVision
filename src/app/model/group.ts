import {User} from './user';
import {NVNode} from './node';
<<<<<<< HEAD
=======

>>>>>>> 8af129ed4a093e03a15b64892799e9a2f45df1f7
export class Group {
    private _id: number;
    private _name: string;
    private _users: Array<User>;
    
    constructor(id: number, name: string) {
        this._id = id;
        this._name = name;
    }
    get name() { return this._name }
    set name(name: string) {this._name = name }
    get users() { return this._users }
    set users(users:Array<User>) { this._users = users}
}