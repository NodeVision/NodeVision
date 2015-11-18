declare class Ctrlattribute implements Observer {
    private uiattribute;
    private attribute;
    updateView(uiattribute: UIAttribute): void;
    updateModel(req: request): response<Attribute>;
}
