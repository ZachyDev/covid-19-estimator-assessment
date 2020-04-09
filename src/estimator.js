const inputData = {
    region: {
    name: "Africa",
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
    },
    periodType: "days",
    timeToElapse: 58,
    reportedCases: 674,
    population: 66622705,
    totalHospitalBeds: 1380614
}
           // **************************** GRADR CHALLENGE 1 START *****************************************************
const covid19ImpactEstimator = (data) => {
    // output data
    const outputData = {
        data: { inputData },
        // impact estimation
        impact: {
            currentlyInfected: () =>{
                let impactTotal = data.reportedCases * 10;
                return impactTotal;
               
            },
            infectionsAsByRequestedTime: () =>{
                let impactInfectionsAsRequested =  outputData.impact.currentlyInfected () * 1024;
                return impactInfectionsAsRequested;
               
             },
        },
        // severe impact estimation
        severeImpact: {
            currentlyInfected: () =>{
                let severeTotal = data.reportedCases * 50;
                return severeTotal;
            },
             infectionsAsByRequestedTime: () =>{
                 let severeImpactAsRequested = outputData.severeImpact.currentlyInfected() * 1024;
                 return severeImpactAsRequested;
            } 
        },           // **************************** GRADR CHALLENGE 1 END *****************************************************

                    // **************************** GRADR CHALLENGE 2 START *****************************************************

        severeCasesByRequestedTime: {
            // severeCasesByRequestedTime for impact estimation as for the requested time
            hospitalBedsByRequestedTimeForImpact : () =>{
               let severePositive = 0.15 * ( outputData.impact.infectionsAsByRequestedTime()); //will need to be hospitalized
               let totalHospitalBeds = data.totalHospitalBeds;
               let bedsOccupied = Math.floor(0.65 * totalHospitalBeds);
               let bedsAvailable = totalHospitalBeds - bedsOccupied;
               let bedStatus = bedsAvailable - severePositive;
    
             // output the remaining beds
              console.log(
                  `
                    Number of Patients for impact: ${ severePositive }
                    Total Hospital Beds: ${ totalHospitalBeds} 
                    Beds Occupied: ${ bedsOccupied }
                    Beds Available: ${ bedsAvailable }
                    ${ bedStatus < 0 ? `We have a shortage of ${ bedStatus } beds` :  `We can admit ${bedstatus} patients` }
                    
                  `
              );
              return 1;


            },
             // severeCasesByRequestedTime for Severe impact estimation as for the requested time
            hospitalBedsByRequestedTimeForSevereImpact : () =>{
                let severePositive = 0.15 * ( outputData.severeImpact.infectionsAsByRequestedTime()); //will need to be hospitalized
                let totalHospitalBeds = data.totalHospitalBeds;
                let bedsOccupied = Math.floor(0.65 * totalHospitalBeds);
                let bedsAvailable = totalHospitalBeds - bedsOccupied;
                let bedStatus = bedsAvailable - severePositive;
     
              // output the remaining beds
               console.log(
                   `
                     Number of Patients for severe impact: ${ severePositive }
                     Total Hospital Beds: ${ totalHospitalBeds} 
                     Beds Occupied: ${ bedsOccupied }
                     Beds Available: ${ bedsAvailable }
                     ${ bedStatus < 0 ? `We have a shortage of ${ bedStatus } beds` :  `We can admit ${bedstatus} patients` }
                     
                   `
               );
               return 1;
 
 
             }, 
              // **************************** GRADR CHALLENGE 2 END *****************************************************
            
        },
        
        // **************************** GRADR CHALLENGE 3 START *****************************************************
        casesForICUByRequestedTime: {
            severePositiveForICUAsPerImpact: () =>{
                let severeCasesThatRequireICU =  0.05 * (outputData.impact.infectionsAsByRequestedTime());
                return severeCasesThatRequireICU;
               
            },
            severePositiveForICUAsPerSevereImpact: () =>{
                let severeCasesThatRequireICU = 0.05 * (outputData.severeImpact.infectionsAsByRequestedTime());
                return severeCasesThatRequireICU;
            }
        },
        casesForVentilatorsByRequestedTime: {
            severePositiveForVentilatorsAsPerImpact: () =>{
                let severeCasesThatRequireVentilator =  0.02 * (outputData.impact.infectionsAsByRequestedTime());
                return Math.floor(severeCasesThatRequireVentilator);
               
            },
            severePositiveForVentilatorsAsPerSevereImpact: () =>{
                let severeCasesThatRequireVentilator = 0.02 * (outputData.severeImpact.infectionsAsByRequestedTime());
                return Math.floor(severeCasesThatRequireVentilator);
            }
        },
        dollarsInFlight:{
            dollarsInFlightLoseForImpact:() =>{
                let economyLose = (outputData.impact.infectionsAsByRequestedTime()) * (data.region.avgDailyIncomeInUSD) * 30;
                console.log(
                `
                The Economy will lose ${ economyLose } in a period of 1 month as per impact estimation
                `
                )
                return economyLose;
            },
            dollarsInFlightLoseForSevereImpact:() =>{
                let economyLose = (outputData.severeImpact.infectionsAsByRequestedTime()) * (data.region.avgDailyIncomeInUSD) * 30;
                console.log(
                `
                The Economy will lose ${ economyLose } in a period of 1 month as per severe impact estimation
                `
                )
                return economyLose;
            }
        }
        

    };
    // console.log(outputData.severeImpact.currentlyInfected())
    // console.log(outputData.severeImpact.infectionsAsByRequestedTime())
    // tests for severe
    // console.log(outputData.severeCasesByRequestedTime.hospitalBedsByRequestedTimeForImpact())
    // console.log(outputData.casesForVentilatorsByRequestedTime.severePositiveForVentilatorsAsPerSevereImpact())
    // console.log(outputData.name.user())
    console.log(outputData.dollarsInFlight.dollarsInFlightLoseForImpact())
    console.log(outputData.dollarsInFlight.dollarsInFlightLoseForSevereImpact())

 
    

    
};
covid19ImpactEstimator(inputData)


// export default covid19ImpactEstimator;
