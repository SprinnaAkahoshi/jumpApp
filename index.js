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
                    dnoneCollection[0].classList.remove("d-none");
                }
            }
            for (var key in data){
                var id = "#" + key;
                var element = document.querySelector(id)
                if (element !== null){
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
                            }
                            break;
                        default:
                            element.innerHTML = data[key]; 
                    }
                }
            }
            var countyState = data.county + ", " +  data.state
            var countyStateDisplay = document.querySelector("#countyState")
            countyStateDisplay.innerHTML = countyState;
        }); 
}

fipsSearch.addEventListener("submit", fetchData);