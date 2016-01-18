import {bootstrap,View, Component,CORE_DIRECTIVES} from 'angular2/angular2';
@View({
  templateUrl: 'app/connexionUI.html',
  directives: [CORE_DIRECTIVES]
})
@Component({
    selector: 'connexion' 
})
export class ConnexionUI {
  constructor(){}

  /**
   * connect_user
   */
  public connect_user() {
    alert("test");
  }
  
  /**
   * register_user
   */
  public register_user(){
    
  }
}
bootstrap(ConnexionUI);