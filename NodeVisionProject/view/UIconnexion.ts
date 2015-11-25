/**
Vue de connexion à la base NodeVision
**/

class UIconnexion {
    private container: Elem<HTMLElement>;
    private mailTextBox: Elem<HTMLInputElement>;
    private passwordBox: Elem<HTMLInputElement>;
    private signinButton: Elem<HTMLElement>;
    private loginButton: Elem<HTMLElement>;
    
    public constructor() {

        var container = new Elem('div', 'container col-md-4 col-md-offset-4');
        var panel = new Elem('div', 'panel panel-primary');
        var panelTitle = new Elem('div', 'panel-heading');
        panelTitle.e.innerHTML = 'Connexion';
        var panelBody = new Elem('div', 'panel-body');

        var form = new Elem('form');

        // Input Mail
        var mailContainer = new Elem('div', 'form-group');
        var mailGroup = new Elem('div', 'input-group input-group-lg');
        var mailIcon = new Elem('span', 'input-group-addon', new Attribute('id', 'basic-addon1'));
        mailIcon.e.innerHTML = '@';
        var mailTextBox = new Elem('input', 'form-control', [new Attribute('type', 'text'), new Attribute('placeholder', 'Username')]);
        
        // Input Password
        var passContainer = new Elem('div', 'form-group');
        var passGroup = new Elem('div', 'input-group input-group-lg');
        var passIcon = new Elem('span', 'input-group-addon', new Attribute('id', 'basic-addon2'));
        passIcon.e.innerHTML = '&#128274';
        var passwordBox = new Elem('input', 'form-control', [new Attribute('type', 'password'), new Attribute('placeholder', 'Password')]);

        // Buttons
        var buttonContainer = new Elem('div', 'col-md-6 col-md-offset-3');
        this.signinButton = new Elem('button', 'btn btn-default btn-lg');
        this.signinButton.e.innerHTML = 'Register';
        this.loginButton = new Elem('button', 'btn btn-primary btn-lg');
        this.loginButton.e.innerHTML = 'Login';

        // Creation UI
        mailGroup.appendChild([mailIcon.e, mailTextBox.e]);
        mailContainer.appendChild(mailGroup.e);
        passGroup.appendChild([passIcon.e, passwordBox.e]);
        passContainer.appendChild(passGroup.e);
        buttonContainer.appendChild([this.signinButton.e, this.loginButton.e]);
        form.appendChild([mailContainer.e, passContainer.e, buttonContainer.e]);
        panelBody.appendChild(form.e);
        panel.appendChild([panelTitle.e, panelBody.e]);
        container.appendChild(panel.e);

        document.body.appendChild(container.e);
    }
}