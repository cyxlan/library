const myLibrary = [];
const bookTable = document.querySelector("#book-table");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    return `${title} by ${author}, ${pages} pages, ${read}`
  }
}

function addBookToLibrary() {
  const book = new Book(
    title = prompt("Title"),
    author = prompt("Author"),
    pages = prompt("Pages"),
    read = prompt("Read")
  );
  myLibrary.push(book);
}

// display books on page
function displayBooks() {
  const cols = ["title", "author", "pages", "read"];
  myLibrary.forEach((book) => {
    const row = document.createElement("tr");
    for (const i in cols) {
      const cell = document.createElement("td");
      const col = cols[i]
      if (col === "read") {
        // if true, map to "Yes", else "No"
        cell.textContent = book[col] ? "Yes" : "No";
      } else {
        cell.textContent = book[col];
      }
      row.appendChild(cell);
    }
    bookTable.appendChild(row);
  })
}

// books for testing
let theHobbit = new Book(
  title = "The Hobbit",
  author = "J.R.R. Tolkien",
  pages = 295,
  read = false
);
let jungleBook = new Book(
  title = "The Jungle Book",
  author = "Rudyard Kipling",
  pages = 277,
  read = true
);
let cuckoosNest = new Book(
  title = "One Flew Over the Cuckoo's Nest",
  author = "Ken Kesey",
  pages = 325,
  read = true
);
myLibrary.push(theHobbit);
myLibrary.push(jungleBook);
myLibrary.push(cuckoosNest);

displayBooks();