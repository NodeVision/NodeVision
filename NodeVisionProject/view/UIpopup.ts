class UIpopup {
    private div: Elem<HTMLElement>;
    public constructor(popup: Popup) {
        var type;
        //type de message
        switch (popup._type) {
            case Status.sucess:
                type = 'alert-success';
                break;
            case Status.warning:
                type = 'alert-warning';
                break;
            case Status.fail:
                type = 'alert-danger';
                break;
        }
        this.div = new Elem('div', 'alert ' + type + ' alert-dismissible fade in', new Attribute('role', 'alert'));
        //si fadeout décoché
        if (!popup._preference._fadeout) {
            var button_close = new Elem('button', 'close', [new Attribute('data-dismiss', 'alert'), new Attribute('aria-label', 'Close')]);
            var span = new Elem('span', '', new Attribute('aria-hidden', 'true')); span.e.innerHTML = 'x';
            this.div.appendChild(button_close.appendChild(span.e).e);
        }
        //Le message
        var p = new Elem('p');
        p.e.innerHTML = popup._message;
        this.div.appendChild(p.e);
        //JSON de l'objet renvoyé
        if (popup._preference._details && popup._type == Status.sucess) {
            var details = new Elem('p');
            var italic = new Elem('em');
            italic.e.innerHTML = popup._details;
            this.div.appendChild(details.appendChild(italic.e).e);  
        }
    }
    public getui() {
        return this.div;
    }
}