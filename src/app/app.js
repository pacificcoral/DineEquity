define(["require", "exports", "@syncfusion/ej2-dropdowns"], function (require, exports, ej2_dropdowns_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    var msObject = new ej2_dropdowns_1.MultiSelect({
        dataSource: sportsData,
        fields: { text: 'sports', value: 'id' },
        placeholder: "Select games",
        mode: 'CheckBox',
    });
    msObject.appendTo('#select');
});
