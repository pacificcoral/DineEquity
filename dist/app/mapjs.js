var map, heatmap;
var markers = [];
var markersOn = false;
var slider = document.getElementById("radiusrange");
var fileUpload = document.getElementById('loadfile');
var vendors = [];
var items = [];
var allData = [];
var heatPoints = [];
var selectedVendors=[];
var selectedItems=[];

// typescript declared controls
var cmdLoadFile, chkMarkers, chkHeat, rngRadius, cmbVendors, cmbItems;

fileUpload.onclick = loadFile;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: { lat: 0, lng: 0 },
        mapTypeId: google.maps.MapTypeId.SATELLITE
    });
}

function loadFile(){

    var input = document.createElement('input');
    input.type = 'file';
    
    input.onchange = e => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        // here we tell the reader what to do when it's done reading...
        reader.onload = readerEvent => {
            var content = readerEvent.target.result; // this is the content!
            processData(content);


        }
    }

    input.click();
}

function processData(allText) {
   var allTextLines = allText.split(/\r\n|\n/);
    allData=[];
    var ven = '';
    vendors = [];
    items = [];
    var item = '';
    for (var i = 2; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(/\t/);
        if (data.length == 15 && data[0]!="") {
            allData.push({
                Vendor: data[0],
                Item_No: data[1],
                Product: data[2],
                Facility_Name: data[3],
                Country: data[4],
                Address: data[5],
                City: data[6],
                BAP_Level: data[7],
                Raw_Material_Region: data[8],
                Comments: data[9],
                Database_Name: data[10],
                Percent_Business: data[11],
                Latitude: data[12],
                Longitude: data[13],
                Weight: data[14],
                });


                if (data[0] != ven){
                    ven = data[0];
                    vendors.push({name: ven, active: true});
                }
                if (items.filter( i => i.name== data[2].toString().trim()).length==0)
                {
                    item = data[2].toString().trim();
                    items.push({name: item});
                }

        }
    }


     cmbVendors.dataSource=vendors;
     cmbVendors.selectAll(true);
     cmbItems.dataSource = items;
     cmbItems.selectAll(true);
    selectedVendors = vendors.map(a=>a.name);
    selectedItems=items.map(a=>a.name);
    setFilteredMapData();
}

function setFilteredMapData(){
    // filter data based on selected vendors and items
    heatPoints=[];
    clearMarkers();
    markers=[];
    if (heatmap != null) heatmap.setMap(null);
    var filteredData=[];
    allData.forEach((i)=>{
        if (selectedVendors.includes(i.Vendor) && selectedItems.includes(i.Product)){
            filteredData.push(i);
        }
    })
    

    filteredData.forEach((i)=>{
        var tarr = { location: new google.maps.LatLng(parseFloat(i.Latitude), parseFloat(i.Longitude)), weight: parseFloat(i.Weight) };
        heatPoints.push(tarr);
        //
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(parseFloat(i.Latitude), parseFloat(i.Longitude)),
            title: i.Vendor + '\n' + i.Facility_Name,            
        });
        // get vendor ordinal to determine color
        var k=vendors.indexOf(vendors.filter((f)=>{return f.name==i.Vendor;})[0]) % 8;
        switch (k){
            case 0:
                var icon= {url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png", scaledSize: new google.maps.Size(24,24) };
            break;
            case 1:
                    var icon= {url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", scaledSize: new google.maps.Size(24,24) };
                break;
            case 2:
                    var icon= {url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png", scaledSize: new google.maps.Size(24,24) };
                break;
            case 3:
                    var icon= {url: "http://maps.google.com/mapfiles/ms/icons/ltblue-dot.png", scaledSize: new google.maps.Size(24,24) };
                break;
            case 4:
                    var icon= {url: "http://maps.google.com/mapfiles/ms/icons/orange-dot.png", scaledSize: new google.maps.Size(24,24) };
                break;
            case 5:
                    var icon= {url: "http://maps.google.com/mapfiles/ms/icons/pink-dot.png", scaledSize: new google.maps.Size(24,24) };
                break;
            case 6:
                    var icon= {url: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png", scaledSize: new google.maps.Size(24,24) };
                break;
            case 7:
                    var icon= {url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", scaledSize: new google.maps.Size(24,24) };
                break;


        }
        marker.setIcon(icon);
        markers.push(marker);
    })

    heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatPoints,
        map: map
    });
    heatmap.setMap(map);
    setMapOnAll(map);
    showMarkers();

}



// Sets the map on all markers in the array.
function setMapOnAll(mmap) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(mmap);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
    markersOn = false;
}

// Shows any markers currently in the array.
function showMarkers() {
    setMapOnAll(map);
    markersOn = true;
}



