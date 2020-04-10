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
      currentlyInfected: Object(data.reportedCases * 10),
      infectionsAsByRequestedTime: () => {
        // chech the periodType
        if (data.periodType === 'days') {
          const power = Math.floor(data.timeToElapse / 3);
          return Object(outputData.impact.currentlyInfected * Math.pow(2, power));
        } if (data.periodType === 'weeks') {
          const days = (data.timeToElapse * 7);
          const power = Math.floor(days / 3);
          return Object(outputData.impact.currentlyInfected * Math.pow(2, power));
        } if (data.periodType === 'months') {
          const days = (data.timeToElapse * 30);
          const power = Math.floor(days / 3);
          return Object(outputData.impact.currentlyInfected * Math.pow(2, power));
        }
      }
    },
    // severe impact estimation
    severeImpact: {
      currentlyInfected: Object(data.reportedCases * 50),
      infectionsAsByRequestedTime: () => {
        // chech the periodType
        if (data.periodType === 'days') {
          const power = Math.floor(data.timeToElapse / 3);
          return Object(outputData.severeImpact.currentlyInfected * Math.pow(2, power));
        } if (data.periodType === 'weeks') {
          const days = (data.timeToElapse * 7);
          const power = Math.floor(days / 3);
          return Object(outputData.severeImpact.currentlyInfected * Math.pow(2, power));
        } if (data.periodType === 'months') {
          const days = (data.timeToElapse * 30);
          const power = Math.floor(days / 3);
          return Object(outputData.severeImpact.currentlyInfected * Math.pow(2, power));
        }
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
      },
      // severeCasesByRequestedTime for Severe impact estimation as for the requested time
      hospitalBedsByRequestedTimeForSevereImpact: () => {
        const severePositive = 0.15 * (outputData.severeImpact.infectionsAsByRequestedTime());
        const { totalHospitalBeds } = data;
        const bedsOccupied = Math.floor(0.65 * totalHospitalBeds);
        const bedsAvailable = totalHospitalBeds - bedsOccupied;
        const bedStatus = bedsAvailable - severePositive;
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
        const economyLose = (outputData.impact.infectionsAsByRequestedTime()) * (data.region.avgDailyIncomeInUSD) * 30 * (data.region.avgDailyIncomePopulation);
        return economyLose;
      },
      dollarsInFlightLoseForSevereImpact: () => {
        const economyLose = (outputData.severeImpact.infectionsAsByRequestedTime()) * (data.region.avgDailyIncomeInUSD) * 30 * (data.region.avgDailyIncomePopulation);
        return economyLose;
      }
    }
  };
  console.log(typeof (outputData.impact.currentlyInfected));
  return outputData;
};
covid19ImpactEstimator(inputData);
// module.exports = covid19ImpactEstimator;


export default covid19ImpactEstimator;
