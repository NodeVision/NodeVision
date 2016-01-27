import {User} from './user';
import {NVNode} from './node';

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