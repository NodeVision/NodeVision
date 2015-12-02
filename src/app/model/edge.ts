import {Injectable} from 'angular2/angular2';
import {NVNode} from './node';
export enum EDGE_TYPE{ hierarchy, custom }
@Injectable()
export class NVEdge implements d3.layout.force.Link<d3.layout.force.Node>{

    private _id: number;
    private _name: string;
    public source: NVNode;
    public target: NVNode;
    constructor(id: number, name: string, source: NVNode, target: NVNode) {
        this._id = id;
        this._name = name;
        this.source = source;
        this.target = target;
    }
    
}