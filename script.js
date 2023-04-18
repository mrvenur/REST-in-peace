"use strict";
// Add event listener to load the app once the window has loaded
window.addEventListener("load", initApp);

const endpoint = "https://restinpeace-4a0bb-default-rtdb.firebaseio.com/";

// Function to initialize the app
//Call / fetch the json
async function initApp() {
  const allPosts = await getPosts(
    "https://restinpeace-4a0bb-default-rtdb.firebaseio.com/posts.json"
  );

  // Loop through each character in allposts array and call showposts function
  for (const posts of allPosts) {
    showPosts(posts);
  }
}

// Function to display a single character in the app UI
// Create HTML markup for displaying the character's image, name, and type
function showPosts(posts) {
  const postsHTML = /*html*/ `
    <article class="grid-item">
      <img src="${posts.image}" alt="${posts.name}">
      <h2>${posts.name}</h2>
      <p>${posts.type}</p>
    </article>
  `;
  document
    .querySelector("#posts")
    .insertAdjacentHTML("beforeend", postsHTML);

  document
    .querySelector("#posts article:last-child")
    .addEventListener("click", () => clickPosts(posts));
}

async function getPosts() {
  const res = await fetch(`${endpoint}/posts.json`);
  const data = await res.json();
  const posts = preparePostData(data);
  console.log(posts);
  return posts;
}

getPosts();


// javaScript version af hvad vi normalt ville ha skrevet inde i HTML: inde i article
//delen sætter vi senere ind den info der skal vises når man clicker på gravstenen

function clickPosts(posts) {
  const graveStoneInfoModal = document.querySelector("#graveStoneInfo");
  characterInfoModal.innerHTML = /*html*/ `
    <article id="graveStoneInfo">


       <button id="close-btn">Close</button>
    </article>
  `;
  graveStoneInfoModal.showModal();

  document.querySelector("#close-btn").addEventListener("click", function () {
    graveStoneInfoModal.close();
    graveStoneInfoModal.innerHTML = "";
  });
}

function preparePostData(dataObject) {
  const postArray = [];
  for (const key in dataObject) {
    const post = dataObject[key];
    post.id = key;
    console.log(post);
    postArray.push(post);
  }
  console.log(postArray);
  return postArray;
}

// === CREATE (POST) === //
async function createPost(title, image) {
  const newPost = { title, image };
  const postAsJson = JSON.stringify(newPost);

  const res = await fetch(`${endpoint}/posts.json`, {
    method: "POST",
    body: postAsJson,
  });
  const data = await res.json();
  console.log(data);
}

// test the function
createPost(
  "My First Post",
  "https://images.unsplash.com/photo-1641876749963-550554c7258d"
);

// === UPDATE (PUT) === //

async function updatePost(id, title, image) {
  const postToUpdate = { title, image };
  const postAsJson = JSON.stringify(postToUpdate);
  const url = `${endpoint}/posts/${id}.json`;
  const res = await fetch(url, { method: "PUT", body: postAsJson });
  const data = await res.json();
  console.log(data);
}

// test the function
updatePost(
  "5tl4jHHSRaKEB0UW9nQd",
  "My Second Post",
  "https://images.unsplash.com/photo-1641876749963-550554c7258d"
);
