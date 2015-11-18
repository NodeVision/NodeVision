declare class UIpreferencepopup {
    private dropdown;
    private ctrlpreferencepopup;
    constructor(preferencepopup: PreferencePopup);
    init(ctrlpreferencepopup: Ctrlpreferencepopup): void;
    setui(preferencepopup: PreferencePopup): void;
    getui(): Elem<HTMLElement>;
}
