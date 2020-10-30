var today, dd, mm, yyyy;
let id;
var startDate;
var endDate;
var daysOfDifference;
let todayNewRecovered;


let newCases = document.getElementById('searchNewCasesButton');
let historicalCases = document.getElementById('searchButtonHistorical');

if(newCases)
{
    newCases.addEventListener('click', function(){searchCases(newCases.id)});
}

if(historicalCases)
{
    historicalCases.addEventListener('click', function(){searchCases(historicalCases.id)});
}



function deleteOldData()
{
    let comprobation = document.getElementsByClassName("newData");

    if(comprobation)
    {
        for (let i = 0; i < comprobation.length; i++) 
        {
            comprobation[i].remove();
        }
        
    }
}

function getComunity()
{
    var comunitiesObj = document.getElementById("comunities");
    var selectedComunity = comunitiesObj.value;

    return selectedComunity;
}


(function calcDateOfToday()
{
    today = new Date();
    dd = String(today.getDate()).padStart(2, '0');
    mm = String(today.getMonth() + 1).padStart(2, '0');
    yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
}())

function differenceBetweenDates()
{
}

function getDate(id)
{
    if(id == 'searchNewCasesButton')
    {
        startDate = today;
        endDate = today;
        daysOfDifference = 1;
    }

    else if(id == 'searchButtonHistorical')
    {
        startDate = document.getElementById("startDate").value;
        endDate = document.getElementById("endDate").value;
        daysOfDifference = (Date.parse(endDate) - Date.parse(startDate))/(1000*60*60*24);

    }

}


 function searchCases(id)
 {
    var selectedComunity = getComunity();
    getDate(id);
    deleteOldData();

    console.log(daysOfDifference);

    
        
    
    axios.get(`https://api.covid19tracking.narrativa.com/api/country/spain/region/${selectedComunity}?date_from=${startDate}&date_to=${endDate}`)
    .then(function (response)
    {   
        
           
        //handle sucess
        todayNewRecovered = response.data.dates[`${startDate}`]["countries"]["Spain"]["regions"]["0"]["today_new_recovered"];
        let todayNewConfirmed = response.data.dates[`${startDate}`]["countries"]["Spain"]["regions"]["0"]["today_new_confirmed"];
        let todayNewTotalHospitalisedPatients = response.data.dates[`${startDate}`]["countries"]["Spain"]["regions"]["0"]["today_new_total_hospitalised_patients"];
        let todayNewIntensiveCare = response.data.dates[`${startDate}`]["countries"]["Spain"]["regions"]["0"]["today_new_intensive_care"];

        todayNewRecovered += todayNewRecovered;
        todayNewConfirmed += todayNewConfirmed;
        
        console.log("Recuperados: " + todayNewRecovered)

        let divAllData = document.createElement('div'); 
        divAllData.className="newData";
        let divRecovered = document.createElement('div'); 
        divRecovered.className="data";
        let divConfirmed = document.createElement('div'); 
        divConfirmed.className="data";
        let divHospitalised = document.createElement('div'); 
        divHospitalised.className="data";
        let divIntensiveCare = document.createElement('div'); 
        divIntensiveCare.className="data";

        let recoveredText = document.createElement('p');
        let confirmedText = document.createElement('p');
        let newHospitalisedText = document.createElement('p');
        let intensiveCareText = document.createElement('p');

        let recoveredHeader = document.createElement('p');
        let confirmedHeader = document.createElement('p');
        let newHospitalisedHeader = document.createElement('p')
        let intensiveCareHeader = document.createElement('p')

        recoveredText.appendChild(document.createTextNode(todayNewRecovered));
        confirmedText.appendChild(document.createTextNode(todayNewConfirmed));
        newHospitalisedText.appendChild(document.createTextNode(todayNewTotalHospitalisedPatients));
        intensiveCareText.appendChild(document.createTextNode(todayNewIntensiveCare));

        recoveredHeader.appendChild(document.createTextNode("Nuevos recuperados: "));
        confirmedHeader.appendChild(document.createTextNode("Nuevos casos confirmados: "));
        newHospitalisedHeader.appendChild(document.createTextNode("Nuevos hospitalizados: "));
        intensiveCareHeader.appendChild(document.createTextNode("Nuevos pacientes en cuidados intensivos: "));

        divRecovered.appendChild(recoveredHeader);
        divRecovered.appendChild(recoveredText);
        divConfirmed.appendChild(confirmedHeader);
        divConfirmed.appendChild(confirmedText);
        divHospitalised.appendChild(newHospitalisedHeader);
        divHospitalised.appendChild(newHospitalisedText);
        divIntensiveCare.appendChild(intensiveCareHeader);
        divIntensiveCare.appendChild(intensiveCareText);
        
        divAllData.appendChild(divRecovered);
        divAllData.appendChild(divConfirmed);
        divAllData.appendChild(divHospitalised);
        divAllData.appendChild(divIntensiveCare);

        document.getElementById("newData").appendChild(divAllData);
    })

    .catch(function (error)
    {
        //handle error
        console.log(error)
    })
 }
