const BOOKS_KEY = "BOOKSHELF_APPS";

let books = [];

function isStorageSupported() {
  if (typeof Storage === "undefined") {
    alert("browser anda tidak mendukung web storage!");
    return false;
  } else {
    return true;
  }
}

function updateJson() {
  if (isStorageSupported()) {
    localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
    document.dispatchEvent(new Event("ondatasaved"));
  }
}

function fetchJson() {
  let data = JSON.parse(localStorage.getItem(BOOKS_KEY));

  if (data !== null) {
    books = data;
  }

  document.dispatchEvent(new Event("onjsonfetched"));
}

function generateBookObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete,
  };
}

function renderFromBooks() {
  for (book of books) {
    const newBook = makeBook(book.id, book.title, `Penulis: ${book.author}`, `Tahun: ${book.year}`, book.isComplete);

    if (book.isComplete) {
      document.getElementById("completeBookshelfList").append(newBook);
    } else {
      document.getElementById("incompleteBookshelfList").append(newBook);
    }
  }
}

function deleteBookFromJson(bookID) {
  for (let arrayPosition = 0; arrayPosition < books.length; arrayPosition++) {
    if (books[arrayPosition].id == bookID) {
      books.splice(arrayPosition, 1);
      break;
    }
  }
}
