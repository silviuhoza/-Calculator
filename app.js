//Listen for submit

document.querySelector('#loan-form').addEventListener('submit', function (h) {
  // Hide results
  document.getElementById('results').style.display = 'none';

  // Show loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);

  h.preventDefault();
});

//Calculte Results
function calculateResults() {
  // console.log('Calculating...');

  //Ui Vars
  let amount = document.getElementById('amount');
  let interest = document.getElementById('interest');
  let years = document.getElementById('years');
  let monthlyPayment = document.getElementById('monthly-payment');
  let totalPayment = document.getElementById('total-payment');
  let totalInterest = document.getElementById('total-interest');

  let principal = parseFloat(amount.value);
  let calculatedInterest = parseFloat(interest.value) / 100 / 12;
  let calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  let x = Math.pow(1 + calculatedInterest, calculatedPayments);
  let monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    // Show results
    document.getElementById('results').style.display = 'block';

    // Hide loader
    document.getElementById('loading').style.display = 'none';
  } else {
    console.log('Please check your numbers');
    showError('Please check your numbers');
  }
}

// Show Error
function showError(error) {
  // Hide results
  document.getElementById('results').style.display = 'none';

  // Hide loader
  document.getElementById('loading').style.display = 'none';

  // Create a div
  let errorDiv = document.createElement('div');

  // Get elements
  let card = document.querySelector('.card');
  let heading = document.querySelector('.heading');

  // Add class
  errorDiv.className = 'alert alert-danger';

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear error
function clearError() {
  document.querySelector('.alert').remove();
}