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

enableRipple(true);

MultiSelect.Inject(CheckBoxSelection);

//define the array of complex data
let sportsData: { [key: string]: Object }[] = [
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


//initiate the MultiSelect
var cmbVendors: MultiSelect = new MultiSelect({
    // bind the sports Data to datasource property
    dataSource: sportsData,
    // maps the appropriate column to fields property
    fields: { text: 'sports', value: 'id' },
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


let PrintShit  = function(s: any): number  {return 3;};


let toggleMarkers: CheckBox = new CheckBox();
//toggleMarkers.cssClass="e-info";
toggleMarkers.label='Show Markers';
toggleMarkers.checked=true;
toggleMarkers.appendTo('#togglepins');
toggleMarkers.change = ()=>{
    if (toggleMarkers.checked)
        showMarkers();
    else    
        clearMarkers();
}



let toggleHeat: CheckBox = new CheckBox();
toggleHeat.cssClass='e-info';
toggleHeat.label='Show Heat';
toggleHeat.checked=true;
toggleHeat.appendTo('#toggleheat');
toggleHeat.change = ()=>{
    if (toggleHeat.checked)
        heatmap.setMap(map);
    else
        heatmap.setMap(null);
}

let loadfile: Button = new Button();
loadfile.cssClass='e-info';
loadfile.appendTo('#loadfile');






// radius range slider
let radiusSlider: Slider = new Slider({
    value: 30,
    showButtons: true,
    tooltip: { placement: 'Before', isVisible: true, showOn: 'Focus' },
    
});
radiusSlider.appendTo('#radiusrange');
radiusSlider.change= radiusSliderChange;

function radiusSliderChange(){
    heatmap.set('radius', radiusSlider.value);
    console.log(radiusSlider.value);
}



