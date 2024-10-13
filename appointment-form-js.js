document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  let formData = new FormData(this);

  fetch('process_appointment.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message);
    if (data.status === 'success') {
      // Optionally reset the form or redirect the user
      this.reset();
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
  });
});
