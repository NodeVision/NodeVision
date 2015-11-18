var user = new User('0001', 'troquereau', 'benjamin', new PreferencePopup(false, false, false));
/////////////////////////////////////////////////////////////////////////////////////////////////
var ctrlpreferencepopup = new Ctrlpreferencepopup()
var uipreferencepopup = new UIpreferencepopup(user.preferencepopup);



var ctrlbar = new Ctrlbar();
var uibar = new UIbar(uipreferencepopup);
ctrlbar.init(uibar);


uipreferencepopup.init(ctrlpreferencepopup, ctrlbar);


var ctrlgrpah = new Ctrlgraph();
var uigraph = new UIgraph();
uigraph.init(ctrlgrpah);
ctrlgrpah.updateView(uigraph);