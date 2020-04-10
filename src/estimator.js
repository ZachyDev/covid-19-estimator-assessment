function computeImpact(currentlyInfected, data) {
  let days = null;
  const duration = data.timeToElapse;
  if (data.periodType === 'days') {
    days = duration;
  }
  if (data.periodType === 'weeks') {
    days = duration * 7;
  }
  if (data.periodType === 'months') {
    days = duration * 30;
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

  const d = infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD * days;
  const dollarsInFlight = d;

  const output = {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
  return output;
}

const covid19ImpactEstimator = (data) => {
  const currentlyInfected = data.reportedCases * 10;
  const currentlyInfectedSevere = data.reportedCases * 50;
  const output = {
    data,
    impact: computeImpact(currentlyInfected, data),
    severeImpact: computeImpact(currentlyInfectedSevere, data)
  };
  return output;
};

module.exports = covid19ImpactEstimator;
// export default covid19ImpactEstimator;