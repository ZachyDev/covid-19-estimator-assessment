/* eslint-disable max-len */
/* eslint-disable import/extensions */
import impact from './estimator.js';

// impact(

// );

let data = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 4,
    avgDailyIncomePopulation: 0.73
  },
  periodType: 'days',
  timeToElapse: 0,
  reportedCases: 0,
  population: 0,
  totalHospitalBeds: 0
};

const populateInfo = (information) => {
  // fetch elements
  const $ = (ele) => document.querySelector(`#${ele}`);

  const region = $('region');
  const period = $('period');
  const populationReport = $('populationReport');
  const allReportedCases = $('allReportedCases');
  const hospitalBeds = $('hospitalBeds');

  region.innerHTML = data.region.name;
  period.innerHTML = data.timeToElapse;
  populationReport.innerHTML = data.population;
  allReportedCases.innerHTML = data.reportedCases;
  hospitalBeds.innerHTML = data.totalHospitalBeds;

  // Best Case
  const currentlyInfected = $('currentlyInfected');
  const infectionsByRequestedTime = $('infectionsByRequestedTime');
  const severeCasesByRequestedTime = $('severeCasesByRequestedTime');
  const hospitalBedsByRequestedTime = $('hospitalBedsByRequestedTime');
  const casesForICUByRequestedTime = $('casesForICUByRequestedTime');
  const casesForVentilatorsByRequestedTime = $('casesForVentilatorsByRequestedTime');
  const dollarsInFlight = $('dollarsInFlight');

  currentlyInfected.innerHTML = information.impact.currentlyInfected;
  infectionsByRequestedTime.innerHTML = information.impact.infectionsByRequestedTime;
  severeCasesByRequestedTime.innerHTML = information.impact.severeCasesByRequestedTime;
  hospitalBedsByRequestedTime.innerHTML = information.impact.hospitalBedsByRequestedTime;
  casesForICUByRequestedTime.innerHTML = information.impact.casesForICUByRequestedTime;
  casesForVentilatorsByRequestedTime.innerHTML = information.impact.casesForVentilatorsByRequestedTime;
  dollarsInFlight.innerHTML = information.impact.dollarsInFlight;

  // Worst Case
  const severeImpactCurrentlyInfected = $('severeImpactCurrentlyInfected');
  const severeImpactInfectionsByRequestedTime = $('severeImpactInfectionsByRequestedTime');
  const severeImpactSevereCasesByRequestedTime = $('severeImpactSevereCasesByRequestedTime');
  const severeImpactHospitalBedsByRequestedTime = $('severeImpactHospitalBedsByRequestedTime');
  const severeImpactCasesForICUByRequestedTime = $('severeImpactCasesForICUByRequestedTime');
  const severeImpactCasesForVentilatorsByRequestedTime = $('severeImpactCasesForVentilatorsByRequestedTime');
  const severeImpactDollarsInFlight = $('severeImpactDollarsInFlight');

  severeImpactCurrentlyInfected.innerHTML = information.severeImpact.currentlyInfected;
  severeImpactInfectionsByRequestedTime.innerHTML = information.severeImpact.infectionsByRequestedTime;
  severeImpactSevereCasesByRequestedTime.innerHTML = information.severeImpact.severeCasesByRequestedTime;
  severeImpactHospitalBedsByRequestedTime.innerHTML = information.severeImpact.hospitalBedsByRequestedTime;
  severeImpactCasesForICUByRequestedTime.innerHTML = information.severeImpact.casesForICUByRequestedTime;
  severeImpactCasesForVentilatorsByRequestedTime.innerHTML = information.severeImpact.casesForVentilatorsByRequestedTime;
  severeImpactDollarsInFlight.innerHTML = information.severeImpact.dollarsInFlight;
};

function calculate() {
  const information = impact(data);

  populateInfo(information);
}

const submitButton = document.querySelector('[data-go-estimate]');
submitButton.addEventListener('click', (event) => {
  const { ...region } = data;

  // fetch elements
  const $ = (ele) => document.querySelector(`[${ele}]`);

  const population = $('data-population').value;
  const timeToElapse = $('data-time-to-elapse').value;
  const reportedCases = $('data-reported-cases').value;
  const totalHospitalBeds = $('data-total-hospital-beds').value;
  const periodType = $('data-period-type').value;


  data = {
    ...region,
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  };

  calculate();


  event.preventDefault();
  return data;
});

calculate();
