/* eslint-disable max-len */
// input data
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
const impact = {};
const severeImpact = {};

// CHALLENGE ONE

// eslint-disable-next-line no-unused-vars
const currentlyInfectedEstimate = (data) => {
  // destructure reported cases from input data
  const { reportedCases, periodType } = inputData;
  let { timeToElapse } = inputData;

  if (periodType === 'weeks') {
    timeToElapse *= 7;
  }

  if (periodType === 'months') {
    timeToElapse *= 30;
  }

  inputData.timeToElapse = timeToElapse;

  const powerFactor = Math.trunc(timeToElapse / 3);

  // calculate currently infected individuals for impact object
  impact.currentlyInfected = reportedCases * 10;

  // calculate projected number of infected individuals after estimate Time for impact object
  impact.infectionsByRequestedTime = Math.trunc(impact.currentlyInfected * (2 ** powerFactor));

  // calculate currently infected individuals for severe impact object
  severeImpact.currentlyInfected = reportedCases * 50;

  // calculate projected number of infected individuals after estimate Time for severe impact object
  severeImpact.infectionsByRequestedTime = Math.trunc(severeImpact.currentlyInfected * (2 ** powerFactor));
};

// CHALLENGE TWO

// eslint-disable-next-line no-unused-vars
const severeCasesByRequestedTime = (data) => {
  // destructure requested time from input data
  const { timeToElapse } = inputData;

  const powerFactor = Math.trunc(timeToElapse / 3);

  // calculate cases by requested time
  impact.severeCasesByRequestedTime = Math.trunc((15 / 100) * impact.currentlyInfected * (2 ** powerFactor));

  // calculate cases by requested time
  // eslint-disable-next-line max-len
  severeImpact.severeCasesByRequestedTime = Math.trunc((15 / 100) * (severeImpact.currentlyInfected * (2 ** powerFactor)));
};

// eslint-disable-next-line no-unused-vars
const hospitalBedsByRequestedTime = (data) => {
  const { totalHospitalBeds } = inputData;

  // available beds based on 35% deficit
  const availableBeds = (35 / 100) * totalHospitalBeds;

  // available beds after severe cases are admitted
  impact.hospitalBedsByRequestedTime = Math.trunc(availableBeds - impact.severeCasesByRequestedTime);

  // available beds after severe cases are admitted
  // eslint-disable-next-line max-len
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(availableBeds - severeImpact.severeCasesByRequestedTime);
};

// CHALLENGE THREE
const casesForICUByRequestedTime = () => {
  // cases for ICU
  impact.casesForICUByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * (5 / 100));

  // cases for ICU
  severeImpact.casesForICUByRequestedTime = Math.trunc(severeImpact.infectionsByRequestedTime * (5 / 100));
};

const casesForVentilatorsByRequestedTime = () => {
  // cases for ICU
  impact.casesForVentilatorsByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * (2 / 100));

  // cases for ICU
  // eslint-disable-next-line max-len
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(severeImpact.infectionsByRequestedTime * (2 / 100));
};

// eslint-disable-next-line no-unused-vars
const dollarsInFlight = (data) => {
  // eslint-disable-next-line no-unused-vars
  const { region } = inputData;
  const { timeToElapse } = inputData;

  // how much money the economy is likely to lose over the said period.
  impact.dollarsInFlight = Math.trunc((impact.infectionsByRequestedTime * region.avgDailyIncomePopulation * region.avgDailyIncomeInUSD) / timeToElapse);

  severeImpact.dollarsInFlight = Math.trunc((severeImpact.infectionsByRequestedTime * region.avgDailyIncomePopulation * region.avgDailyIncomeInUSD) / timeToElapse);
};

const covid19ImpactEstimator = (data) => {
  const estimator = () => {
    currentlyInfectedEstimate(data);
    severeCasesByRequestedTime(data);
    hospitalBedsByRequestedTime(data);
    casesForICUByRequestedTime(data);
    casesForVentilatorsByRequestedTime();
    dollarsInFlight(data);
  };

  estimator(data);

  return ({
    data,
    impact,
    severeImpact
  });
};
// console.log(covid19ImpactEstimator());
export default covid19ImpactEstimator;
