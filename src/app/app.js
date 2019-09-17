define(["require", "exports", "@syncfusion/ej2-dropdowns", "@syncfusion/ej2-buttons", "@syncfusion/ej2-inputs", "@syncfusion/ej2-base"], function (require, exports, ej2_dropdowns_1, ej2_buttons_1, ej2_inputs_1, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ej2_base_1.enableRipple(true);
    ej2_dropdowns_1.MultiSelect.Inject(ej2_dropdowns_1.CheckBoxSelection);
    var sportsData = [
        { id: 'game1', sports: 'Badminton' },
        { id: 'game2', sports: 'Football' },
        { id: 'game3', sports: 'Tennis' },
        { id: 'game4', sports: 'Golf' },
        { id: 'game5', sports: 'Cricket' },
        { id: 'game6', sports: 'Handball' },
        { id: 'game7', sports: 'Karate' },
        { id: 'game8', sports: 'Fencing' },
        { id: 'game9', sports: 'Boxing' }
    ];
    var cmbVendors = new ej2_dropdowns_1.MultiSelect({
        dataSource: sportsData,
        fields: { text: 'sports', value: 'id' },
        placeholder: "Select vendors",
        mode: 'CheckBox',
        showSelectAll: true,
        selectAllText: "Select All",
    });
    cmbVendors.appendTo('#select');
    var PrintShit = function (s) { return 3; };
    var toggleMarkers = new ej2_buttons_1.CheckBox();
    toggleMarkers.label = 'Show Markers';
    toggleMarkers.checked = true;
    toggleMarkers.appendTo('#togglepins');
    toggleMarkers.change = function () {
        if (toggleMarkers.checked)
            showMarkers();
        else
            clearMarkers();
    };
    var toggleHeat = new ej2_buttons_1.CheckBox();
    toggleHeat.cssClass = 'e-info';
    toggleHeat.label = 'Show Heat';
    toggleHeat.checked = true;
    toggleHeat.appendTo('#toggleheat');
    toggleHeat.change = function () {
        if (toggleHeat.checked)
            heatmap.setMap(map);
        else
            heatmap.setMap(null);
    };
    var loadfile = new ej2_buttons_1.Button();
    loadfile.cssClass = 'e-info';
    loadfile.appendTo('#loadfile');
    var radiusSlider = new ej2_inputs_1.Slider({
        value: 30,
        showButtons: true,
        tooltip: { placement: 'Before', isVisible: true, showOn: 'Focus' },
    });
    radiusSlider.appendTo('#radiusrange');
    radiusSlider.change = radiusSliderChange;
    function radiusSliderChange() {
        heatmap.set('radius', radiusSlider.value);
        console.log(radiusSlider.value);
    }
});
