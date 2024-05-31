// prevent Chrome showing confirm form resubmission prompt on refresh
if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}

const library = {
  "books": [],
  "table": document.querySelector("#book-table tbody"),
  "addBook": function([title, author, pages, read, id]) {
    const book = new Book(
      title = title,
      author = author,
      pages = pages,
      read = read,
      id = id
    );
    this.books.push(book);
  },
  "deleteBook": function(id) {
    // get index of book to delete based on id
    const index = this.books.findIndex((book) => {
      return book.id === id;
    })
    this.books.splice(index, 1);
  } 
}

// update book table on page
function updateBookTable() {
  function addTableRow(book, id) {
    const cols = ["title", "author", "pages", "read", "delete"];
    const row = document.createElement("tr");
    row.setAttribute("book-id", id);
    for (const i in cols) {
      const cell = document.createElement("td");
      const col = cols[i]
      if (col === "read") {
        // if true, map to "Yes", else "No"
        cell.textContent = book[col] ? "Yes" : "No";
      } else if (col === "delete") {
        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "Delete";
        cell.appendChild(deleteBtn);
        deleteBtn.addEventListener("click", function() {
          library.deleteBook(id);
          library.table.removeChild(row);
        })
      } else {
        cell.textContent = book[col];
      }
      row.appendChild(cell);
    }
    library.table.appendChild(row);
  }

  // if table is empty, populate with all books
  if (library.table.childNodes.length === 0) {
    library.books.forEach((book, i) => {
      addTableRow(book, i);
    })
  } else {
    // append latest book
    addTableRow(library.books.at(-1), library.books.length - 1);
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
    library.addBook(newBook.getFormValues());
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
  read = false,
  id = 0
);
let jungleBook = new Book(
  title = "The Jungle Book",
  author = "Rudyard Kipling",
  pages = 277,
  read = true,
  id = 1
);
let cuckoosNest = new Book(
  title = "One Flew Over the Cuckoo's Nest",
  author = "Ken Kesey",
  pages = 325,
  read = true,
  id = 2
);
library.books.push(theHobbit);
library.books.push(jungleBook);
library.books.push(cuckoosNest);

updateBookTable();