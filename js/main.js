const myLibrary = [];

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