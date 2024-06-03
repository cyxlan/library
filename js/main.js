// prevent Chrome showing confirm form resubmission prompt on refresh
if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}

function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
  this.toggleRead = function() {
    this.read = !this.read;
  }
}

const library = {
  "books": [],
  "table": document.querySelector("#book-table tbody"),
  "addBook": function(title, author, pages, read, id) {
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
  function addTableRow(book) {
    const cols = ["title", "author", "pages", "read", "delete"];
    const row = document.createElement("tr");
    row.setAttribute("book-id", book.id);
    for (const i in cols) {
      const cell = document.createElement("td");
      const col = cols[i]
      if (col === "read") {
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("aria-labelledby", "read-header");
        // if true, set checkbox to checked
        if (book[col]) {
          checkbox.setAttribute("checked", "checked")
        }
        cell.appendChild(checkbox);
        checkbox.addEventListener("click", function() {
          book.toggleRead();
        })
      } else if (col === "delete") {
        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerHTML = 
          `<svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
          </svg>
          <span>Delete</span>`
        cell.appendChild(deleteBtn);
        deleteBtn.addEventListener("click", function() {
          library.deleteBook(book.id);
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
    addTableRow(library.books.at(-1));
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
    library.addBook(...newBook.getFormValues(), library.books.at(-1).id + 1);
    newBook.form.reset();
    updateBookTable();
    newBook.modal.close();
  }
})

// load sample books
const sampleBooks = [
  ["The Hobbit", "J.R.R. Tolkien", 295, false],
  ["The Jungle Book", "Rudyard Kipling", 277, true],
  ["One Flew Over the Cuckoo's Nest", "Ken Kesey", 325, true]
]
sampleBooks.forEach((bookInfo, i) => {
  library.addBook(...bookInfo, i);
})

updateBookTable();