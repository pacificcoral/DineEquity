define(["require", "exports", "@syncfusion/ej2-dropdowns", "@syncfusion/ej2-buttons", "@syncfusion/ej2-inputs", "@syncfusion/ej2-base", "@syncfusion/ej2-grids", "@syncfusion/ej2-popups"], function (require, exports, ej2_dropdowns_1, ej2_buttons_1, ej2_inputs_1, ej2_base_1, ej2_grids_1, ej2_popups_1) {
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
    ej2_grids_1.Grid.Inject(ej2_grids_1.Group, ej2_grids_1.Filter, ej2_grids_1.Page, ej2_grids_1.Sort, ej2_grids_1.Resize, ej2_grids_1.ColumnMenu, ej2_grids_1.Search, ej2_grids_1.Toolbar, ej2_grids_1.Print);
    grid = new ej2_grids_1.Grid({
        dataSource: allData,
        height: '40%',
        allowSelection: true,
        selectionSettings: { type: 'Multiple', enableToggle: true },
        allowGrouping: true,
        allowPaging: true,
        allowSorting: true,
        allowFiltering: true,
        allowResizing: true,
        showColumnMenu: true,
        queryCellInfo: tooltip,
        toolbar: ['Search', 'Print', 'ExcelExport', 'WordExport', 'PdfExport'],
        enablePersistence: true,
        allowExcelExport: true,
        allowPdfExport: true,
        rowSelected: rowSelected
    });
    grid.appendTo('#datagrid');
    var value = window.localStorage.getItem('allData');
    var ad = JSON.parse(value);
    console.log(ad);
    if (ad != null) {
        processFromAllData(ad);
    }
    function tooltip(args) {
        var tooltip = new ej2_popups_1.Tooltip({
            content: args.data[args.column.field].toString()
        }, args.cell);
    }
    function rowSelected(args) {
        var selectedrecords = grid.getSelectedRecords();
        console.log(selectedrecords[0]);
        bounceMarker(selectedrecords[0]);
    }
});
