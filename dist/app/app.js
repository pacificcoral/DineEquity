define(["require", "exports", "@syncfusion/ej2-dropdowns", "@syncfusion/ej2-buttons", "@syncfusion/ej2-inputs", "@syncfusion/ej2-base"], function (require, exports, ej2_dropdowns_1, ej2_buttons_1, ej2_inputs_1, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ej2_base_1.enableRipple(true);
    ej2_dropdowns_1.MultiSelect.Inject(ej2_dropdowns_1.CheckBoxSelection);
    cmbVendors = new ej2_dropdowns_1.MultiSelect({
        fields: { text: 'name' },
        placeholder: "Select Vendors",
        mode: 'CheckBox',
        showSelectAll: true,
        selectAllText: "Select All",
        showDropDownIcon: true,
        floatLabelType: "Always",
    });
    cmbVendors.appendTo('#selectvendors');
    cmbVendors.change = function (e) { selectedVendors = e.value; console.log(selectedVendors); setFilteredMapData(); };
    cmbItems = new ej2_dropdowns_1.MultiSelect({
        fields: { text: 'name' },
        placeholder: "Select Items",
        mode: 'CheckBox',
        showSelectAll: true,
        selectAllText: "Select All",
        showDropDownIcon: true,
        floatLabelType: "Always",
    });
    cmbItems.appendTo('#selectitems');
    cmbItems.change = function (e) { selectedItems = e.value; console.log(selectedItems); setFilteredMapData(); };
    chkMarkers = new ej2_buttons_1.CheckBox();
    chkMarkers.label = 'Show Markers';
    chkMarkers.checked = true;
    chkMarkers.appendTo('#togglepins');
    chkMarkers.change = function () {
        if (chkMarkers.checked)
            showMarkers();
        else
            clearMarkers();
    };
    chkHeat = new ej2_buttons_1.CheckBox();
    chkHeat.cssClass = 'e-info';
    chkHeat.label = 'Show Heat';
    chkHeat.checked = true;
    chkHeat.appendTo('#toggleheat');
    chkHeat.change = function () {
        if (chkHeat.checked)
            heatmap.setMap(map);
        else
            heatmap.setMap(null);
    };
    cmdLoadFile = new ej2_buttons_1.Button();
    cmdLoadFile.cssClass = 'e-info';
    cmdLoadFile.appendTo('#loadfile');
    rngRadius = new ej2_inputs_1.Slider({
        value: 20,
        showButtons: true,
        tooltip: { placement: 'Before', isVisible: true, showOn: 'Focus' },
    });
    rngRadius.appendTo('#radiusrange');
    rngRadius.change = radiusSliderChange;
    function radiusSliderChange() {
        heatmap.set('radius', rngRadius.value);
    }
});
