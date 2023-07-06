const user_id = localStorage.getItem("user_id");
const username = localStorage.getItem("username");
const host_url = "http://localhost:5001";
let submit = document.getElementById("create_button");

if (!user_id || !username) {
  window.location = "/login";
}

document.getElementById("main_nav_login").innerText = username;

fetchNotes(user_id);

async function fetchNotes(user_id) {
  let response = await fetch(`${host_url}/api/notes/all`);
  const allNotes = await response.json();
  response = await fetch(`${host_url}/api/notes/user/${user_id}`);
  const userNotes = await response.json();

  let myNotesContainer = document.querySelector(".mynotes");
  let allNotesContainer = document.querySelector(".allnotes");

  myNotesContainer.innerHTML = "";
  allNotesContainer.innerHTML = "";

  userNotes.forEach((note) => {
    let cardHtml = ` <div class="card m-1" style="width: 18rem" >
    <div class="card-body" id="card_${note.note_id}">
      <h6 class="card-subtitle mb-2 text-body-secondary">${new Date(
        note.createdAt
      ).toLocaleString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        hour12: false,
        minute: "2-digit",
      })}</h6>
      <h3 class="card-title">${note.title}</h3>
      <p class="card-text">${note.content}</p>
      </div>
    </div>`;
    myNotesContainer.innerHTML += cardHtml;
  });

  allNotes.forEach((note) => {
    let cardHtml = ` <div class="card m-1" style="width: 18rem">
    <div class="card-body">
      <h6 class="card-subtitle mb-2 text-body-secondary">${new Date(
        note.createdAt
      ).toLocaleString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        hour12: false,
        minute: "2-digit",
      })}</h6>  
      <h3 class="card-title">${note.title}</h3>
      <p class="card-text">${note.content}</p>
      <h6 class="card-subtitle mb-2 text-body-secondary">${
        note.user.username
      }</h6>
    </div>
  </div>`;
    allNotesContainer.innerHTML += cardHtml;
  });
}

submit.addEventListener("click", async () => {
  let title = document.getElementById("titleInput").value;
  let description = document.getElementById("descInput").value;
  await postData({ title, description, user_id });
  fetchNotes(user_id);
});

async function postData(data) {
  const { title, description, user_id } = data;
  const response = await fetch(`${host_url}/api/notes/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id, title, content: description }),
  });
  const jsonData = await response.json();
  return jsonData;
}
