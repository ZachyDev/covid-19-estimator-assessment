/* eslint-disable prefer-const */
// input data
const inputData = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'weeks',
  timeToElapse: 1,
  reportedCases: 674,
  population: 92931687,
  totalHospitalBeds: 1380614
};

// destruct the periodType
let { periodType, timeToElapse } = inputData;
// periodType conversion
if (periodType === 'days') {
  timeToElapse *= 1;
} else if (periodType === 'weeks') {
  timeToElapse *= 7;
} else if (periodType === 'months') {
  timeToElapse *= 30;
}
// covid19ImpactEsimator function
const covid19ImpactEstimator = (data) => {
  // power
  const power = Math.trunc(timeToElapse / 3);
  // destruct the data object
  const { reportedCases, totalHospitalBeds } = data;
  // output data
  const outputData = {
    data: { inputData },
    impact: {
      // GRADR CHALLENGE 1 FOR IMPACT ESTIMATION
      currentlyInfected: reportedCases * 10,
      infectionsByRequestedTime() {
        // destruct currentlyInfected property
        const { impact } = outputData;
        const { currentlyInfected } = impact;
        return currentlyInfected * (2 ** power);
      },
      // GRADR CHALLENGE 2 FOR IMPACT ESTIMATION
      severeCasesByRequestedTime() {
        // destruct informationByRequestedTime
        const { impact } = outputData;
        const { infectionsByRequestedTime } = impact;
        return 0.15 * infectionsByRequestedTime();
      },
      hospitalBedsByRequestedTime() {
        // destruct informationByRequestedTime
        const { impact } = outputData;
        const { severeCasesByRequestedTime } = impact;
        // available beds at 35%
        const availableBeds = Math.trunc(0.35 * totalHospitalBeds);
        return availableBeds - severeCasesByRequestedTime();
      },
      // GRADR CHALLENGE 3 FOR IMPACT ESTIMATION
      casesForICUByRequestedTime() {
        const { impact } = outputData;
        const { infectionsByRequestedTime } = impact;
        return 0.05 * infectionsByRequestedTime();
      },
      casesForVentilatorsByRequestedTime() {
        const { impact } = outputData;
        const { infectionsByRequestedTime } = impact;
        return Math.trunc(0.02 * infectionsByRequestedTime());
      },
      dollarsInFlight() {
        const { impact } = outputData;
        const { region } = data;
        const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = region;
        const { infectionsByRequestedTime } = impact;
        return Math.trunc(infectionsByRequestedTime() * avgDailyIncomeInUSD * avgDailyIncomePopulation * 30);
      }
    },
    // GRADR CHALLENGE 1 FOR SEVERE IMPACT ESTIMATION
    severeImpact: {
      currentlyInfected: reportedCases * 50,
      infectionsByRequestedTime() {
        // destruct currentlyInfected property
        const { severeImpact } = outputData;
        const { currentlyInfected } = severeImpact;
        return currentlyInfected * (2 ** power);
      },
      // GRADR CHALLENGE 2 FOR IMPACT ESTIMATION
      severeCasesByRequestedTime() {
        // destruct informationByRequestedTime
        const { severeImpact } = outputData;
        const { infectionsByRequestedTime } = severeImpact;
        return 0.15 * infectionsByRequestedTime();
      },
      hospitalBedsByRequestedTime() {
        // destruct informationByRequestedTime
        const { severeImpact } = outputData;
        const { severeCasesByRequestedTime } = severeImpact;
        // available beds at 35%
        const availableBeds = Math.trunc(0.35 * totalHospitalBeds);
        return availableBeds - severeCasesByRequestedTime();
      },
      // GRADR CHALLENGE 3 FOR SEVERE IMPACT ESTIMATION
      casesForICUByRequestedTime() {
        const { severeImpact } = outputData;
        const { infectionsByRequestedTime } = severeImpact;
        return 0.05 * infectionsByRequestedTime();
      },
      casesForVentilatorsByRequestedTime() {
        const { severeImpact } = outputData;
        const { infectionsByRequestedTime } = severeImpact;
        return Math.trunc(0.02 * infectionsByRequestedTime());
      },
      dollarsInFlight() {
        const { severeImpact } = outputData;
        const { region } = data;
        const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = region;
        const { infectionsByRequestedTime } = severeImpact;
        return Math.trunc(infectionsByRequestedTime() * avgDailyIncomeInUSD * avgDailyIncomePopulation * 30);
      }
    }
  };
  // destruct from impact and severe impact objects
  // const { impact, severeImpact } = outputData;
  return outputData;
  // testing my code
  // console.log('impact ' + severeImpact.severeCasesByRequestedTime())
  // console.log('impact ' + severeImpact.hospitalBedsByRequestedTime());
  // console.log('impact ' + severeImpact.casesForICUByRequestedTime());
  // console.log('impact ' + severeImpact.casesForVentilatorsByRequestedTime());
  // console.log('impact ' + severeImpact.dollarsInFlight());
  // console.log(severeImpact.severeCasesByRequestedTime());
  // console.log(severeImpact.hospitalBedsByRequestedTime());
  // console.log(severeImpact.casesForICUByRequestedTime());
  // console.log(severeImpact.casesForVentilatorsByRequestedTime())
};
module.exports = covid19ImpactEstimator(inputData);
// export default covid19ImpactEstimator;
