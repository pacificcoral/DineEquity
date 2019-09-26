import { MultiSelect, CheckBoxSelection, MultiSelectChangeEventArgs, SelectEventArgs } from '@syncfusion/ej2-dropdowns';
import { Button, CheckBox } from '@syncfusion/ej2-buttons';
import {Slider } from '@syncfusion/ej2-inputs';
import { enableRipple} from '@syncfusion/ej2-base';
import {Accordion} from '@syncfusion/ej2-navigations';
import { Grid, Group, Filter, Page, Sort, Resize, ColumnMenu, QueryCellInfoEventArgs, Search, Toolbar, Print, RowSelectEventArgs } from '@syncfusion/ej2-grids';
import { Tooltip } from '@syncfusion/ej2-popups';



//import {} from 'googlemaps';


declare var heatmap: any;
declare var map: any;
declare var clearMarkers: any;
declare var showMarkers: any;
declare var cmdLoadFile: any;
declare var chkMarkers: any;
declare var chkHeat:any;
declare var rngRadius: any;
declare var cmbVendors: MultiSelect;
declare var cmbItems:any;
declare var selectedItems:any;
declare var selectedVendors: any;
declare var setFilteredMapData:any;
declare var allData:any;
declare var grid:Grid;
declare var processFromAllData: any;
declare var bounceMarker:any;

enableRipple(true);



MultiSelect.Inject(CheckBoxSelection);

//initiate the MultiSelect
cmbVendors = new MultiSelect({
    // bind the sports Data to datasource property
     // maps the appropriate column to fields property
    fields: { text: 'name' },
    //set the placeholder to MultiSelect input
    placeholder:"Select Vendors",
    // set the type of mode for checkbox to visualized the checkbox added in li element.
    mode: 'CheckBox',
    //Bind the filter event
    showSelectAll: true,
    selectAllText:"Select All",
    showDropDownIcon: true,
    floatLabelType: "Always",
    
});


//render the component
cmbVendors.appendTo('#selectvendors');

cmbVendors.change= (e: MultiSelectChangeEventArgs)=>{selectedVendors = e.value; console.log(selectedVendors); setFilteredMapData();}
//cmbVendors.select = (e: SelectEventArgs)=>{console.log('select: '+e.itemData);}

cmbItems = new MultiSelect({
    fields: { text: 'name' },
    //set the placeholder to MultiSelect input
    placeholder:"Select Items",
    // set the type of mode for checkbox to visualized the checkbox added in li element.
    mode: 'CheckBox',
    //Bind the filter event
    showSelectAll: true,
    selectAllText:"Select All",
    showDropDownIcon: true,
    floatLabelType: "Always",
    
})
cmbItems.appendTo('#selectitems');

cmbItems.change= (e: MultiSelectChangeEventArgs)=>{selectedItems = e.value; console.log(selectedItems);setFilteredMapData();}

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
    value: 20,
    showButtons: true,
    tooltip: { placement: 'Before', isVisible: true, showOn: 'Focus' },
    
});
rngRadius.appendTo('#radiusrange');
rngRadius.change= radiusSliderChange;

function radiusSliderChange(){
    heatmap.set('radius', rngRadius.value);
}



// columns: [
//     { field: 'Vendor', headerText: 'Vendor', textAlign: 'Right', width: 120, type: 'string' },
//     { field: 'Product', width: 140, headerText: 'Product', type: 'string' },
//     { field: 'Country', headerText: 'Country', textAlign: 'Right', width: 120, format: 'string' },
//     { field: 'Address', headerText: 'Address', width: 140, format: 'string' }
// ],

Grid.Inject(Group, Filter, Page, Sort, Resize, ColumnMenu, Search, Toolbar, Print);

grid  = new Grid({
    dataSource: allData,

    height: '40%',
    allowSelection: true,
    selectionSettings: {type:'Multiple',enableToggle: true},
    allowGrouping: true,
    allowPaging: true,
    allowSorting: true,
    allowFiltering: true,
    allowResizing: true,
    showColumnMenu: true,
    queryCellInfo:tooltip,
    toolbar:['Search', 'Print', 'ExcelExport', 'WordExport', 'PdfExport'],
    enablePersistence: true,
    allowExcelExport:true,
    allowPdfExport:true,
    rowSelected: rowSelected
    
});

grid.appendTo('#datagrid');

let value: string = window.localStorage.getItem('allData');
let ad: Object = JSON.parse(value);
console.log(ad);
if (ad!=null){
    processFromAllData(ad);
}

function tooltip(args: QueryCellInfoEventArgs): void { // event triggers on every cell render.
    let tooltip: Tooltip = new Tooltip({
        content: args.data[args.column.field].toString() // add Essential JS2 tooltip for every cell.
    }, <HTMLElement>args.cell);
}

function rowSelected(args: RowSelectEventArgs) {
    let selectedrecords: Object[] = grid.getSelectedRecords();  // get the selected records.
    console.log(selectedrecords[0]);
    bounceMarker(selectedrecords[0]);


}