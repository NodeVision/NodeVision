import {NVNode} from './node';
export class NVEdge implements d3.layout.force.Link<NVNode>{

    private _id: number;
    private _name: string;
    public source: NVNode;
    public target: NVNode;
    private _type: string;
    private _weight: number;
    constructor(id: number, name: string, source: NVNode, target: NVNode,type?:string,weight?:number) {
        this._id = id;
        this._name = name;
        this.source = source;
        this.target = target;
        this._type = type;
        this._weight = weight;
    }
    get id(){ return this._id }
    get name(){ return this._name }
    set name(name:string){ this._name = name}
    get type(){ return this._type }
    get weight(){return this._weight}
}