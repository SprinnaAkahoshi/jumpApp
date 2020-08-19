var fipsSearch = document.querySelector("#fips-search");
var searched = false;

function fetchData() {
    event.preventDefault();
    fetch("https://localhost:44385/api/TransactionCountySummary/06001")
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            if (!searched) {
                searched = true;
                var dnoneCollection = document.getElementsByClassName("d-none");
                while (dnoneCollection.length){
                    dnoneCollection[0].classList.add("slideup", "d-flex", "flex-column", "justify-content-center");
                    dnoneCollection[0].classList.remove("d-none");
                }
            }
            for (var key in data){
                var element = document.getElementById(key);
                if (element !== null){
                    element.classList.add('mb-0');
                    switch (key){
                        case "zillowcomCDLiveDate":
                        case "bkCutoverDate":
                        case "reactZillowcomCDLiveDate":
                        case "kiVersionDate":
                        case "qcCompletionDate":
                            var originalDate = data[key];
                            var dateSplit = originalDate.split("T")[0].split("-");
                            element.innerHTML = dateSplit[1] + "/" + dateSplit[2] + "/" + dateSplit[0];
                            break;
                        case "disclosureState":
                        case "foreclosure":
                        case "historicalDataCorrections":
                            if (data[key]){
                                element.innerHTML = "Yes";
                            } else {
                                element.innerHTML = "No";
                            }
                            break;
                        default:
                            element.innerHTML = data[key]; 
                    }
                }
            }
            var fipsCountyState = data.county + ", " +  data.state + " - " + data.fips;
            var fipsCountyStateDisplay = document.querySelector("#countyState");
            fipsCountyStateDisplay.innerHTML = fipsCountyState;
        }); 
}

fipsSearch.addEventListener("submit", fetchData);