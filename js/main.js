const myLibrary = [];
const bookTable = document.querySelector("#book-table tbody");

// prevent Chrome showing confirm form resubmission prompt on refresh
if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    return `${title} by ${author}, ${pages} pages, ${read}`
  }
}

function addBookToLibrary([title, author, pages, read]) {
  const book = new Book(
    title = title,
    author = author,
    pages = pages,
    read = read
  );
  myLibrary.push(book);
}

// update book table on page
function updateBookTable() {
  function addTableRow(book) {
    const cols = ["title", "author", "pages", "read"];
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
  }
  
  // if table is empty, populate with all books
  if (bookTable.childNodes.length === 0) {
    myLibrary.forEach((book) => {
      addTableRow(book);
    })
  }
  // else, append latest book
  else {
    addTableRow(myLibrary.at(-1));
  }
}

const newBook = {
  "btn": document.querySelector('#new-book-btn'),
  "modal": document.querySelector('#new-book-modal'),
  "form": document.querySelector('#new-book-form'),
  "cancelBtn": document.querySelector('#new-book-form .cancel-btn'),
  "submitBtn": document.querySelector('#new-book-form button[type="submit"]'),
  "getFormValues": function() {
    return [
      document.querySelector('#book-title').value,
      document.querySelector('#book-author').value,
      document.querySelector('#book-pages').value,
      document.querySelector('#book-read').checked
    ]
  }
};

newBook.btn.addEventListener('click', () => {
  newBook.modal.showModal();
})
newBook.cancelBtn.addEventListener('click', () => {
  newBook.modal.close();
})

// on form submit, get new book info and add to library
newBook.submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  // if form inputs are valid
  if (newBook.form.reportValidity()) {
    addBookToLibrary(newBook.getFormValues());
    newBook.form.reset();
    updateBookTable();
    newBook.modal.close();
  }
})

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

updateBookTable();