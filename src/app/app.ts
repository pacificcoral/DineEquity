import { MultiSelect, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';
import { Button, CheckBox } from '@syncfusion/ej2-buttons';
import {Slider } from '@syncfusion/ej2-inputs';
import { enableRipple} from '@syncfusion/ej2-base';
//import {} from 'googlemaps';

declare var heatmap: any;
declare var map: any;
declare var clearMarkers: any;
declare var showMarkers: any;
declare var mapjs: any;
declare var cmdLoadFile: any;
declare var chkMarkers: any;
declare var chkHeat:any;
declare var rngRadius: any;
declare var cmbVendors: MultiSelect;
declare var cmbItems:any;

enableRipple(true);

MultiSelect.Inject(CheckBoxSelection);



//initiate the MultiSelect
cmbVendors = new MultiSelect({
    // bind the sports Data to datasource property
     // maps the appropriate column to fields property
    fields: { text: 'name', value: 'active' },
    //set the placeholder to MultiSelect input
    placeholder:"Select vendors",
    // set the type of mode for checkbox to visualized the checkbox added in li element.
    mode: 'CheckBox',
    //Bind the filter event
    showSelectAll: true,
    selectAllText:"Select All",

});


//render the component
cmbVendors.appendTo('#select');




chkMarkers = new CheckBox();
//toggleMarkers.cssClass="e-info";
chkMarkers.label='Show Markers';
chkMarkers.checked=true;
chkMarkers.appendTo('#togglepins');
chkMarkers.change = ()=>{
    if (chkMarkers.checked)
        showMarkers();
    else    
        clearMarkers();
}



chkHeat = new CheckBox();
chkHeat.cssClass='e-info';
chkHeat.label='Show Heat';
chkHeat.checked=true;
chkHeat.appendTo('#toggleheat');
chkHeat.change = ()=>{
    if (chkHeat.checked)
        heatmap.setMap(map);
    else
        heatmap.setMap(null);
}

cmdLoadFile = new Button();
cmdLoadFile.cssClass='e-info';
cmdLoadFile.appendTo('#loadfile');






// radius range slider
rngRadius = new Slider({
    value: 30,
    showButtons: true,
    tooltip: { placement: 'Before', isVisible: true, showOn: 'Focus' },
    
});
rngRadius.appendTo('#radiusrange');
rngRadius.change= radiusSliderChange;

function radiusSliderChange(){
    heatmap.set('radius', rngRadius.value);
}



