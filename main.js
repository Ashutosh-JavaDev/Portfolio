
  const form = document.getElementById('feedbackForm');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const successMessage = document.getElementById('successMessage');
  const errorMessage = document.getElementById('errorMessage');
  const errorText = document.getElementById('errorText');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      message: document.getElementById('message').value.trim()
    };

    console.log('Submitting form data:', formData);

    // Disable button and show loading
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');

    try {
      // Send data to backend API
      const response = await fetch('portfolio-production-2005.up.railway.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      console.log('Server response:', result);

      if (response.ok) {
        // Show success message
        successMessage.classList.remove('hidden');
        form.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          successMessage.classList.add('hidden');
        }, 5000);
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      // Show error message
      errorText.textContent = '✗ ' + error.message;
      errorMessage.classList.remove('hidden');
    } finally {
      // Re-enable button
      submitBtn.disabled = false;
      btnText.textContent = 'Send Message';
    }
  });
