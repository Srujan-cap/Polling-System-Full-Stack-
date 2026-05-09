


const API = "http://localhost:5000";
let optionCount = 0;

/* ------------------- INIT ------------------- */
window.onload = () => {
  loadTheme();
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    showApp();
  } else {
    showLogin();
  }
  
};

/* ------------------- UI CONTROL ------------------- */
function showLogin() {
  document.getElementById("login-section").style.display = "block";
  document.getElementById("app-section").style.display = "none";
}

function showApp() {
  document.getElementById("login-section").style.display = "none";
  document.getElementById("app-section").style.display = "block";

  initApp();
}

/* ------------------- APP INIT ------------------- */
function initApp() {
  document.getElementById("options").innerHTML = "";
  optionCount = 0;

  addOption();
  addOption();

  loadPolls();
}

/* ------------------- LOGIN ------------------- */
async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error);

    // ✅ Show success message
    showSnackbar("✅ Successfully logged in");

    // Save user
    localStorage.setItem("user", JSON.stringify(data.user));

    // Clear input fields
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";

    // Small delay for better UX
    setTimeout(() => {
      showApp();
    }, 1000);

  } catch (err) {
    showSnackbar(err.message);
  }
}

/* ------------------- LOGOUT ------------------- */
function logout() {
  localStorage.removeItem("user");
  showLogin();
}

/* ------------------- SNACKBAR ------------------- */
function showSnackbar(message) {
  let sb = document.getElementById("snackbar");

  if (!sb) {
    sb = document.createElement("div");
    sb.id = "snackbar";
    document.body.appendChild(sb);
  }

  sb.innerText = message;
  sb.className = "show";

  setTimeout(() => {
    sb.className = sb.className.replace("show", "");
  }, 2500);
}

/* ------------------- OPTIONS ------------------- */
function addOption() {
  if (optionCount >= 4) {
    showSnackbar("Maximum 4 options allowed");
    return;
  }

  const wrapper = document.createElement("div");
  wrapper.className = "option-input";

  const input = document.createElement("input");
  input.placeholder = "Option";

  const removeBtn = document.createElement("button");
  removeBtn.innerText = "✖";

  removeBtn.onclick = () => {
    wrapper.remove();
    optionCount--;
  };

  wrapper.appendChild(input);
  wrapper.appendChild(removeBtn);

  document.getElementById("options").appendChild(wrapper);
  optionCount++;
}

/* ------------------- CREATE POLL ------------------- */
async function createPoll() {
  const question = document.getElementById("question").value;

  if (!question) {
    showSnackbar("Question is required");
    return;
  }

  const rawOptions = [...document.querySelectorAll("#options input")]
    .map((i) => i.value.trim())
    .filter(Boolean);

  const normalized = rawOptions.map((o) => o.toLowerCase());
  const hasDuplicates = new Set(normalized).size !== normalized.length;

  if (rawOptions.length < 2) {
    showSnackbar("Minimum 2 options required");
    return;
  }

  if (rawOptions.length > 4) {
    showSnackbar("Maximum 4 options allowed");
    return;
  }

  if (hasDuplicates) {
    showSnackbar("Duplicate options are not allowed");
    return;
  }

  await fetch(`${API}/polls`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, options: rawOptions }),
  });

  initApp();
}

/* ------------------- VOTE ------------------- */
async function vote(pollId, index) {
  const prev = localStorage.getItem(`voted_${pollId}`);
  if (prev == index) return;

  await fetch(`${API}/polls/${pollId}/vote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ optionIndex: index }),
  });

  localStorage.setItem(`voted_${pollId}`, index);
  loadPolls();
}

/* ------------------- RENDER ------------------- */
function renderPoll(poll) {
  const total = poll.options.reduce((sum, o) => sum + o.votes, 0);
  const selected = localStorage.getItem(`voted_${poll.id}`);

  return `
    <div class="card poll">
      <h3>${poll.question}</h3>

      ${poll.options.map((o, i) => {
        const percent = total ? (o.votes / total) * 100 : 0;
        const isSelected = selected == i;

        return `
          <div class="option ${isSelected ? "selected" : ""}" onclick="vote(${poll.id}, ${i})">
            <div class="bar" style="width:${percent}%"></div>
            <span>
              ${o.text} — ${Math.round(percent)}%
              ${selected !== null ? `(${o.votes})` : ""}
            </span>
          </div>
        `;
      }).join("")}

      <div class="meta">Total votes: ${total}</div>
    </div>
  `;
}

/* ------------------- LOAD POLLS ------------------- */
async function loadPolls() {
  const res = await fetch(`${API}/polls`);
  const polls = await res.json();

  document.getElementById("polls").innerHTML =
    polls.map(renderPoll).join("");
}
/* ------------------- THEME ------------------- */

function toggleTheme() {
  const body = document.body;
  const button = document.getElementById("theme-toggle");

  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");

    button.innerText = "🌙 Dark Mode";

    localStorage.setItem("theme", "light");

  } else {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");

    button.innerText = "☀️ Light Mode";

    localStorage.setItem("theme", "dark");
  }
}

/* Load saved theme */
function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  const button = document.getElementById("theme-toggle");

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    button.innerText = "🌙 Dark Mode";
  } else {
    document.body.classList.add("dark-mode");
    button.innerText = "☀️ Light Mode";
  }
}
