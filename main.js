const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_SUPABASE_ANON_KEY;

const form = document.getElementById('feedbackForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    showError('Please fill in all fields');
    return;
  }

  submitBtn.disabled = true;
  btnText.textContent = 'Sending...';
  successMessage.classList.add('hidden');
  errorMessage.classList.add('hidden');

  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/submit-feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to submit feedback');
    }

    successMessage.classList.remove('hidden');
    form.reset();
    btnText.textContent = 'Send Message';

    setTimeout(() => {
      successMessage.classList.add('hidden');
    }, 5000);
  } catch (error) {
    showError(error.message || 'An error occurred. Please try again.');
    btnText.textContent = 'Send Message';
  } finally {
    submitBtn.disabled = false;
  }
});

function showError(message) {
  errorText.textContent = message;
  errorMessage.classList.remove('hidden');
  setTimeout(() => {
    errorMessage.classList.add('hidden');
  }, 5000);
}