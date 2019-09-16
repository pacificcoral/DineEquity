import { MultiSelect, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';
import { Button } from '@syncfusion/ej2-buttons';


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
let msObject: MultiSelect = new MultiSelect({
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
msObject.appendTo('#select');

let toggleMarkers: Button = new Button();
toggleMarkers.cssClass="e-info";
toggleMarkers.appendTo('#togglepins');

let toggleHeat: Button = new Button();
toggleHeat.cssClass='e-info';
toggleHeat.appendTo('#toggleheat');


