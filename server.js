const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (request, response) => {
  response.render('index', { resultToRender: '' });
});

app.post('/bmi', (request, response) => {
  let height = Number(request.body.height) / 100;
  let weight = Number(request.body.weight);
  let bmi = (weight / (height * height)).toFixed(2);
  let userResult = '';

  if (bmi < 18.5) {
    userResult = 'Underweight';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    userResult = 'Normal weight';
  } else if (bmi >= 25 && bmi <= 29.9) {
    userResult = 'Overweight';
  } else {
    userResult = 'Obese';
  }

  let finalresult = {
    userBMI: bmi,
    result: userResult
  };

  response.render('index', { resultToRender: result });
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
