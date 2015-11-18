class Ctrlbar {
    private uibar: UIbar;
    public init(uibar:UIbar) {
        this.uibar = uibar;
    }
    public updateSettings(ui: UIpreferencepopup) {
        this.uibar.setpreferencepopup(ui);
    }
  /*  public updateBranch(ui: UIbranch) 

        this.uibar.setbranches(ui);
    }*/
}