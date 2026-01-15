const form = document.getElementById("feedbackForm");
const submitBtn = document.getElementById("submitBtn");
const btnText = document.getElementById("btnText");
const successMessage = document.getElementById("successMessage");
const errorMessage = document.getElementById("errorMessage");
const errorText = document.getElementById("errorText");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    message: document.getElementById("message").value.trim(),
  };

  // UI state
  submitBtn.disabled = true;
  btnText.textContent = "Sending...";
  successMessage.classList.add("hidden");
  errorMessage.classList.add("hidden");

  try {
    const response = await fetch(
      "https://portfolio-production-2005.up.railway.app/api/messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const contentType = response.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      throw new Error("Invalid server response (not JSON)");
    }

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to send message");
    }

    // Success
    successMessage.classList.remove("hidden");
    form.reset();

    setTimeout(() => {
      successMessage.classList.add("hidden");
    }, 5000);

  } catch (error) {
    errorText.textContent = "✗ " + error.message;
    errorMessage.classList.remove("hidden");
    console.error(error);
  } finally {
    submitBtn.disabled = false;
    btnText.textContent = "Send Message";
  }
});
