const inputData = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};
// ****** GRADR CHALLENGE 1 START *********
const covid19ImpactEstimator = (data) => {
  // output data
  const outputData = {
    data: { inputData },
    // impact estimation
    impact: {
      currentlyInfected: () => {
        const impactTotal = data.reportedCases * 10;
        return impactTotal;
      },
      infectionsAsByRequestedTime: () => {
        const impactInfectionsAsRequested = outputData.impact.currentlyInfected() * 1024;
        return impactInfectionsAsRequested;
      }
    },
    // severe impact estimation
    severeImpact: {
      currentlyInfected: () => {
        const severeTotal = data.reportedCases * 50;
        return severeTotal;
      },
      infectionsAsByRequestedTime: () => {
        const severeImpactAsRequested = outputData.severeImpact.currentlyInfected() * 1024;
        return severeImpactAsRequested;
      }
    }, // **** GRADR CHALLENGE 1 END *****

    // ******** GRADR CHALLENGE 2 START **********

    severeCasesByRequestedTime: {
      // severeCasesByRequestedTime for impact estimation as for the requested time
      hospitalBedsByRequestedTimeForImpact: () => {
        const severePositive = 0.15 * (outputData.impact.infectionsAsByRequestedTime());
        const { totalHospitalBeds } = data;
        const bedsOccupied = Math.floor(0.65 * totalHospitalBeds);
        const bedsAvailable = totalHospitalBeds - bedsOccupied;
        const bedStatus = bedsAvailable - severePositive;

        // output the remaining beds
        console.log(
          `
                    Number of Patients for impact: ${severePositive}
                    Total Hospital Beds: ${totalHospitalBeds} 
                    Beds Occupied: ${bedsOccupied}
                    Beds Available: ${bedsAvailable}
                    ${bedStatus < 0 ? `We have a shortage of ${bedStatus} beds` : `We can admit ${bedStatus} patients`}
                  `
        );
        return 1;
      },
      // severeCasesByRequestedTime for Severe impact estimation as for the requested time
      hospitalBedsByRequestedTimeForSevereImpact: () => {
        const severePositive = 0.15 * (outputData.severeImpact.infectionsAsByRequestedTime());
        const { totalHospitalBeds } = data;
        const bedsOccupied = Math.floor(0.65 * totalHospitalBeds);
        const bedsAvailable = totalHospitalBeds - bedsOccupied;
        const bedStatus = bedsAvailable - severePositive;

        // output the remaining beds
        console.log(
          `
                     Number of Patients for severe impact: ${severePositive}
                     Total Hospital Beds: ${totalHospitalBeds} 
                     Beds Occupied: ${bedsOccupied}
                     Beds Available: ${bedsAvailable}
                     ${bedStatus < 0 ? `We have a shortage of ${bedStatus} beds` : `We can admit ${bedStatus} patients`}                     
                   `
        );
        return 1;
      }
      // ******* GRADR CHALLENGE 2 END **************

    },

    // *********** GRADR CHALLENGE 3 START ***************
    casesForICUByRequestedTime: {
      severePositiveForICUAsPerImpact: () => {
        const severeCasesThatRequireICU = 0.05 * (outputData.impact.infectionsAsByRequestedTime());
        return severeCasesThatRequireICU;
      },
      severePositiveForICUAsPerSevereImpact: () => {
        const severeCasesThatRequireICU = 0.05 * (outputData.severeImpact.infectionsAsByRequestedTime());
        return severeCasesThatRequireICU;
      }
    },
    casesForVentilatorsByRequestedTime: {
      severePositiveForVentilatorsAsPerImpact: () => {
        const severeCasesThatRequireVentilator = 0.02 * (outputData.impact.infectionsAsByRequestedTime());
        return Math.floor(severeCasesThatRequireVentilator);
      },
      severePositiveForVentilatorsAsPerSevereImpact: () => {
        const severeCasesThatRequireVentilator = 0.02 * (outputData.severeImpact.infectionsAsByRequestedTime());
        return Math.floor(severeCasesThatRequireVentilator);
      }
    },
    dollarsInFlight: {
      dollarsInFlightLoseForImpact: () => {
        const economyLose = (outputData.impact.infectionsAsByRequestedTime()) * (data.region.avgDailyIncomeInUSD) * 30;
        console.log(
          `
                The Economy will lose ${economyLose} in a period of 1 month as per impact estimation
                `
        );
        return economyLose;
      },
      dollarsInFlightLoseForSevereImpact: () => {
        const economyLose = (outputData.severeImpact.infectionsAsByRequestedTime()) * (data.region.avgDailyIncomeInUSD) * 30;
        console.log(
          `
                The Economy will lose ${economyLose} in a period of 1 month as per severe impact estimation
                `
        );
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
  console.log(outputData.dollarsInFlight.dollarsInFlightLoseForImpact());
  console.log(outputData.dollarsInFlight.dollarsInFlightLoseForSevereImpact());
};
covid19ImpactEstimator(inputData);


export default covid19ImpactEstimator;
