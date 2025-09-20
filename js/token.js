const tokens = {
  "AI2025": "ai-intro",
  "PE2025": "prompt-eng",
  "EDU2025": "ai-in-education" // <<-- dodaj to
};


function checkToken() {
  const input = document.getElementById("tokenInput").value.trim();
  const error = document.getElementById("error");

  if (tokens[input]) {
    window.location.href = `${tokens[input]}/index.html`;
  } else {
    error.textContent = "Nieprawidłowy token. Spróbuj ponownie.";
  }
}
