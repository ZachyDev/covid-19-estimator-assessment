const button = document.getElementById('find');
button.addEventListener('click', (event) => {
  event.preventDefault();
  const country = document.getElementById('country').value;
  document.write(`<h1 style="color:gold;font-family:verdana">${country} COVID-19 Estimator</h1>`);
  // this is the ajax fetch request to COVID-19 api
  fetch(`https://covid-19-data.p.rapidapi.com/country?format=json&name=${country}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
      'x-rapidapi-key': '6a7f8e0053mshb9abe890d64e508p192e05jsn7b2ee60ecc40'
    }
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // statistics
      const confirmedCases = `Confirmed Cases: ${data[0].confirmed} `;
      const recoveredCases = `Recovered Cases: ${data[0].recovered} `;
      const deathCases = `Death Cases: ${data[0].deaths} `;
      // create div class element
      const list = document.createElement('li');
      list.innerHTML = `${confirmedCases}<br>${recoveredCases}<br>${deathCases}`;
      document.body.appendChild(list);
      list.style.backgroundColor = 'black';
      list.style.color = 'white';
      list.style.listStyleType = 'none';
      list.style.fontSize = `${20}px`;
      list.style.fontFamily = 'georgia';
      list.style.opacity = 0.8;

      document.body.style.backgroundImage = "url('corona.jpg')";
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundSize = 'cover';
    })
    .catch((err) => {
      console.log(err);
    });
});
