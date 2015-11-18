declare class User extends Observable {
    private matricule;
    private name;
    private firsname;
    private preferencepopup;
    constructor(matricule: string, name: string, firsname: string, preferencepopup: PreferencePopup);
    getmatricule(): string;
    getname(): string;
    getfirstname(): string;
    getpreferencepopup(): PreferencePopup;
}
