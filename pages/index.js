const host_url = "http://loaclhost:5001";

const user_id = localStorage.getItem("user_id");
const username = localStorage.getItem("username");

let submit = document.getElementById("create_button");
let allNotesContainer = document.getElementById("allnotes");
let myNotesContainer = document.getElementById("mynotes");
let login_button = document.getElementById("main_nav_login");
let createForm = document.getElementById("create-form");

const socket = io();

if (!user_id || !username) {
  window.location = "/login";
}

login_button.addEventListener("click", () => {
  localStorage.removeItem("user_id");
  localStorage.removeItem("username");
});

document.getElementById("main_nav_login").innerText = username;

//Fetch all notes
socket.emit("fetch-notes");
socket.on("return-notes", (data) => {
  allNotesContainer.innerHTML = "";
  data?.forEach((note) => {
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
});

//Fetch user notes
socket.emit("fetch-user-notes", user_id);
socket.on("return-user-notes", (data) => {
  console.log("data", data);
  myNotesContainer.innerHTML = "";

  data?.forEach((note) => {
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
});
socket.on("submit-success", () => {
  socket.emit("fetch-user-notes", user_id); //refresh list of notes on successful creation of new note
  socket.emit("fetch-notes");
});

submit.addEventListener("click", async () => {
  let title = document.getElementById("titleInput").value;
  let description = document.getElementById("descInput").value;

  socket.emit("submit-new-note", { user_id, title, content: description });
});
createForm.addEventListener("submit", (e) => {
  e.preventDefault();
});
