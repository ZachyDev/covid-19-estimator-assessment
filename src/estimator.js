const estimateImpact = (currentlyInfected, data) => {
  let days;
  const time = data.timeToElapse;
  if (data.periodType === 'days') {
    days = time;
  }
  if (data.periodType === 'weeks') {
    days = time * 7;
  }
  if (data.periodType === 'months') {
    days = time * 30;
  }

  const { region, totalHospitalBeds } = data;
  const { avgDailyIncomePopulation, avgDailyIncomeInUSD } = region;

  const factor = Math.trunc(days / 3);
  const infectionsByRequestedTime = currentlyInfected * (2 ** factor);
  const severeCasesByRequestedTime = 0.15 * infectionsByRequestedTime;

  const beds = (0.35 * totalHospitalBeds) - severeCasesByRequestedTime;
  const hospitalBedsByRequestedTime = Math.trunc(beds);

  const casesForICUByRequestedTime = Math.trunc(0.05 * infectionsByRequestedTime);
  const casesForVentilatorsByRequestedTime = Math.trunc(0.02 * infectionsByRequestedTime);

  const economyLose = infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD * days;
  const dollarsInFlight = economyLose;

  const outputData = {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
  return outputData;
};

const covid19ImpactEstimator = (data) => {
  const currentlyInfected = data.reportedCases * 10;
  const currentlyInfectedSevere = data.reportedCases * 50;
  const outputData = {
    data,
    impact: estimateImpact(currentlyInfected, data),
    severeImpact: estimateImpact(currentlyInfectedSevere, data)
  };
  return outputData;
};

module.exports = covid19ImpactEstimator;
// export default covid19ImpactEstimator;