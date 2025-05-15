function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const message = document.getElementById('message');

  if (!username || !password) {
    message.textContent = "Please fill in both fields.";
    message.style.color = "red";
    return;
  }

  let users = JSON.parse(localStorage.getItem('users')) || [];
  const existingUser = users.find(u => u.name === username);

  if (existingUser) {
    if (existingUser.password === password) {
      // Success
      localStorage.setItem('loggedInUser', username);
      window.location.href = 'game.html';
    } else {
      message.textContent = "Incorrect password.";
      message.style.color = "red";
    }
  } else {
    // New user
    users.push({ name: username, password: password, score: 0 });
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('loggedInUser', username);
    window.location.href = 'game.html';
  }
}

function logout() {
  localStorage.removeItem('loggedInUser');
  document.getElementById('userInfo').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('message').textContent = '';
}

function restartGame() {
  window.location.href = 'game.html';
}

function loadLeaderboard() {
  const leaderboardList = document.getElementById('leaderboardList');
  leaderboardList.innerHTML = "";

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const sorted = users.sort((a, b) => b.score - a.score);

  sorted.forEach(user => {
    const li = document.createElement('li');
    li.textContent = `${user.name}: ${user.score}`;
    leaderboardList.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const user = localStorage.getItem('loggedInUser');
  if (user) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = users.find(u => u.name === user);
    const score = currentUser?.score || 0;

    document.getElementById('welcomeMessage').textContent = `${user}, your last score: ${score}`;
    document.getElementById('userInfo').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
  }

  showSection('home');
});
