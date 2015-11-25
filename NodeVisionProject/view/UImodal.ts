// construit un modal vide
class UIModal{
    private mhead : Elem<HTMLElement>;
    private mbody : Elem<HTMLElement>;
    private mfoot : Elem<HTMLElement>;

    constructor(id: Modal) {
        var mf = new Elem('div','modal fade',
            [new Attribute('tabindex','-1'),
             new Attribute('role','dialog'),
             new Attribute('aria-labelledby', 'myModalLabel'),
             new Attribute('id',id)]);
            
        var md = new Elem('div','modal-dialog modal-lg',
            new Attribute('role','document'));
        var mc = new Elem('div','modal-content');
        this.mhead = new Elem('div','modal-header');
        this.mbody = new Elem('div','modal-body');
        this.mfoot = new Elem('div','modal-footer');
        document.body.appendChild(mf.e)
        mf.appendChild(md.appendChild(mc.appendChild([
            this.mhead.e,
            this.mbody.e,
            this.mfoot.e]).e).e);
        //clear modal onblur
        var m = this;
        jQuery('#'+id).on('hidden.bs.modal', function (e) {
                m.getbody().e.innerHTML = '';
                m.getfoot().e.innerHTML = '';
                m.gethead().e.innerHTML = ''; 
        });
    }
    
    public gethead(){ return this.mhead;}
    public getbody(){ return this.mbody;}
    public getfoot(){ return this.mfoot;}
}
