const host_url = "http://192.168.0.145:5001";
let submitButton = document.getElementById("login_submit");

async function postData(credentials) {
  const { username, password } = credentials;
  const response = await fetch(`${host_url}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });
  const jsonData = await response.json();
  return jsonData;
}

submitButton.addEventListener("click", async () => {
  let username = document.getElementById("usernameInput").value;
  let password = document.getElementById("passInput").value;

  //Logging the user in

  let response = await postData({ username, password });
  if (response.user_id && response.username) {
    localStorage.setItem("user_id", response.user_id);
    localStorage.setItem("username", response.username);
    document.getElementById("login_nav").innerText = response.username;
    window.location = "/";
    return;
  }
  //remove user from local storage, acts like logout
  localStorage.removeItem("user_id");
  localStorage.removeItem("username");
});
