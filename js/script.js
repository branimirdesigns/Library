const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  return book;
}

function removeBookFromLibrary(id) {
  const index = myLibrary.findIndex((book) => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
  }
}

function createBookCard(book) {
  const card = document.createElement("div");
  card.classList.add("book-card");
  if (book.read) card.classList.add("read");
  card.dataset.id = book.id;

  const title = document.createElement("h3");
  title.textContent = book.title;

  const author = document.createElement("p");
  author.classList.add("author");
  author.textContent = `by ${book.author}`;

  const pages = document.createElement("p");
  pages.classList.add("pages");
  pages.textContent = `${book.pages} pages`;

  const actions = document.createElement("div");
  actions.classList.add("card-actions");

  const readBtn = document.createElement("button");
  readBtn.classList.add("btn-ghost", "read-toggle");
  readBtn.textContent = book.read ? "Read" : "Not read";
  readBtn.addEventListener("click", () => {
    book.toggleReadStatus();
    renderLibrary();
  });

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("btn-ghost", "remove-btn");
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", () => {
    removeBookFromLibrary(book.id);
    renderLibrary();
  });

  actions.append(readBtn, removeBtn);
  card.append(title, author, pages, actions);

  return card;
}

function renderLibrary() {
  const grid = document.getElementById("book-grid");
  grid.innerHTML = "";
  myLibrary.forEach((book) => {
    grid.appendChild(createBookCard(book));
  });
}

const dialog = document.getElementById("book-dialog");
const form = document.getElementById("book-form");
const newBookBtn = document.getElementById("new-book-btn");
const cancelBtn = document.getElementById("cancel-btn");

newBookBtn.addEventListener("click", () => {
  form.reset();
  dialog.showModal();
});

cancelBtn.addEventListener("click", () => {
  dialog.close();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const pages = Number(document.getElementById("pages").value);
  const read = document.getElementById("read").checked;

  addBookToLibrary(title, author, pages, read);
  renderLibrary();

  form.reset();
  dialog.close();
});

// Seed with a few books so the display has content on load.
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("Dune", "Frank Herbert", 412, false);
addBookToLibrary("1984", "George Orwell", 328, true);

renderLibrary();
