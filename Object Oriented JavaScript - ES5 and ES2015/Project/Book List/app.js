class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class Table {
  addBookToTable(book) {
    const bookList = document.getElementById("bookList");
    const row = document.createElement("tr");
    row.innerHTML = `<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href=# class="delete"><i class="fa fa-remove"></i></a></td>`;
    bookList.appendChild(row);
  }

  deleteBook(target) {
    if (target.className === "fa fa-remove") {
      target.parentElement.parentElement.parentElement.remove();
      Store.removeBook(target.parentElement.parentElement.parentElement);
    }
  }
}

class Store {
  static getBooks() {
    return localStorage.getItem("books") === null
      ? []
      : JSON.parse(localStorage.getItem("books"));
  }

  static addBook(book) {
    let books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static displayBooks() {
    let books = Store.getBooks();
    books.forEach((book) => {
      let table = new Table();
      table.addBookToTable(book);
    });
  }

  static removeBook(row) {
    let title  = row.children[0].textContent;
    let author = row.children[1].textContent;
    let isbn   = row.children[2].textContent;
    let books  = Store.getBooks();
    books.forEach((book, index) => {
      if (
        book.title === title &&
        book.author === author &&
        book.isbn === isbn
      ) {
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books));
      }
    });
  }
}

// Event Listeners

// DOM Load Event
document.addEventListener("DOMContentLoaded", Store.displayBooks);
const btn = document.getElementById("book-form");

// Event listener for add Book
btn.addEventListener("submit", checkFields);

// Event listener for DeleteBook

let deleteTheBook = document.getElementById("bookList");
deleteTheBook.addEventListener("click", function (e) {
  if (confirm("Are you sure ?")) {
    let table = new Table();
    table.deleteBook(e.target);
    showError("alert alert-primary", "Book Removed Successfully");
  }
});

document
  .getElementById("delete_button")
  .addEventListener("click", function (e) {
    if (confirm("Are you sure ?")) {
      let list = document.getElementById("bookList");
      while (list.firstChild) {
        list.removeChild(list.firstChild);
      }
      localStorage.clear();
      showError("alert alert-primary", "Books List Removed Successfully");
    }
  });

// Functions

function checkFields(e) {
  // Get form values
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const isbn = document.getElementById("isbn").value.trim();
  if (title == "" || author == "" || isbn == "") {
    showError("alert alert-danger", "Enter the Deatils Correctly");
  } else {
    const book = new Book(title, author, isbn);
    const table = new Table();
    table.addBookToTable(book);
    Store.addBook(book);
    showError("alert alert-success", "Book Added Successfully");
  }
  e.preventDefault();
}

// Show Alert Box
function showError(className, message) {
  let popUp = document.getElementById("alert");
  popUp.className = className;
  popUp.textContent = message;
  popUp.style.display = "block";

  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";

  setTimeout(function () {
    popUp.style.display = "none";
  }, 2000);
}
