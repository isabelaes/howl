import { samplePosts } from "../01-directions/posts.js";

const postList = document.querySelector("[data-post-list]");
const composeDialog = document.querySelector(".compose-dialog");
const composeForm = document.querySelector("[data-compose-form]");
const postTextarea = document.querySelector("#compose-text");

function addPost({ author, location, text }) {
  const item = document.createElement("li");
  item.className = "post-row";

  const avatar = document.createElement("span");
  avatar.className = "post-avatar";
  avatar.setAttribute("aria-hidden", "true");
  avatar.textContent = author.slice(0, 1).toUpperCase();

  const content = document.createElement("div");
  content.className = "post-content";

  const byline = document.createElement("p");
  byline.className = "post-byline";
  const username = document.createElement("strong");
  username.textContent = `@${author}`;
  byline.append(username);
  if (location) {
    const place = document.createElement("span");
    place.className = "post-location";
    place.textContent = location;
    byline.append(" · ", place);
  }

  const message = document.createElement("p");
  message.className = "post-message";
  message.textContent = text;

  const actions = document.createElement("div");
  actions.className = "post-actions";
  for (const label of ["Reply", "Repost", "Like"]) {
    const action =
      label === "Like" ? document.createElement("button") : document.createElement("span");
    action.textContent = label;
    if (label === "Like") {
      action.type = "button";
      action.dataset.action = "like";
      action.setAttribute("aria-pressed", "false");
      action.addEventListener("click", () => {
        const liked = action.getAttribute("aria-pressed") !== "true";
        action.setAttribute("aria-pressed", String(liked));
      });
    }
    actions.append(action);
  }

  content.append(byline, message, actions);
  item.append(avatar, content);
  postList.append(item);
}

for (const post of samplePosts) {
  addPost(post);
}

document.querySelectorAll("[data-open-compose]").forEach((button) => {
  button.addEventListener("click", () => {
    composeDialog.showModal();
    postTextarea.focus();
  });
});

document.querySelector("[data-close-compose]").addEventListener("click", () => {
  composeDialog.close();
});

composeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = postTextarea.value.trim();
  if (!text) {
    postTextarea.focus();
    return;
  }

  addPost({ author: "you", location: "", text });
  composeForm.reset();
  composeDialog.close();
  postList.lastElementChild?.scrollIntoView({ block: "nearest" });
});
