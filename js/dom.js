function addBook() {
  const bookID = +new Date();
  const incompleteBookshelfList = document.getElementById("incompleteBookshelfList");
  const completeBookshelfList = document.getElementById("completeBookshelfList");
  const bookTitle = document.getElementById("inputBookTitle").value;
  const bookAuthor = document.getElementById("inputBookAuthor").value;
  const bookYear = document.getElementById("inputBookYear").value;
  const isComplete = document.getElementById("inputBookIsComplete").checked;

  const book = makeBook(bookID, bookTitle, `Penulis: ${bookAuthor}`, `Tahun: ${bookYear}`, isComplete);
  const bookObject = generateBookObject(bookID, bookTitle, bookAuthor, bookYear, isComplete);

  books.push(bookObject);

  if (isComplete) {
    completeBookshelfList.append(book);
  } else {
    incompleteBookshelfList.append(book);
  }
  updateJson();
}

function makeBook(bookID, bookTitle, bookAuthor, bookYear, isComplete) {
  const textTitle = document.createElement("h3");
  textTitle.innerText = bookTitle;

  const textAuthor = document.createElement("p");
  textAuthor.innerText = bookAuthor;

  const textYear = document.createElement("p");
  textYear.innerText = bookYear;

  const action = addAction(isComplete, bookID);

  const article = document.createElement("article");
  article.setAttribute("id", bookID);
  article.classList.add("book_item");
  article.append(textTitle, textAuthor, textYear, action);

  const span = document.querySelector("span");
  if (inputBookIsComplete.checked) {
    span.innerText = "Selesai dibaca";
  } else {
    span.innerText = "Belum selesai dibaca";
  }

  return article;
}

function addAction(isComplete, bookID) {
  const action = document.createElement("div");
  action.classList.add("action");

  const actionDelete = createActionDelete(bookID);
  const actionRead = createActionRead(bookID);
  const actionUnread = createActionUnread(bookID);

  if (isComplete) {
    action.append(actionUnread);
  } else {
    action.append(actionRead);
  }
  action.append(actionDelete);

  return action;
}

function createActionDelete(bookID) {
  const actionDelete = document.createElement("button");
  actionDelete.classList.add("red");
  actionDelete.innerHTML = "Hapus buku";

  actionDelete.addEventListener("click", function () {
    let confirmation = confirm("apakah anda yakin ingin menghapus buku?");

    if (confirmation) {
      const bookItem = document.getElementById(bookID);
      bookItem.addEventListener("eventDelete", function (event) {
        event.target.remove();
      });
      bookItem.dispatchEvent(new Event("eventDelete"));

      deleteBookFromJson(bookID);
      updateJson();
    }
  });

  return actionDelete;
}

function createActionRead(bookID) {
  const actionRead = document.createElement("button");
  actionRead.classList.add("green");
  actionRead.innerText = "Selesai dibaca";

  actionRead.addEventListener("click", function () {
    const bookItem = document.getElementById(bookID);

    const bookTitle = bookItem.querySelector("h3").innerText;
    const bookAuthor = bookItem.querySelectorAll("p")[0].innerText;
    const bookYear = bookItem.querySelectorAll("p")[1].innerText;

    bookItem.remove();

    const book = makeBook(bookID, bookTitle, bookAuthor, bookYear, true);
    document.getElementById("completeBookshelfList").append(book);

    for (let arrayPosition = 0; arrayPosition < books.length; arrayPosition++) {
      if (books[arrayPosition].id == bookID) {
        books[arrayPosition].isComplete = true;
        console.log(books[arrayPosition]);
      }
    }
    updateJson();
  });

  return actionRead;
}

function createActionUnread(bookID) {
  const actionUnread = document.createElement("button");
  actionUnread.classList.add("green");
  actionUnread.innerHTML = "Belum selesai dibaca";

  actionUnread.addEventListener("click", function () {
    const bookItem = document.getElementById(bookID);

    const bookTitle = bookItem.querySelector("h3").innerText;
    const bookAuthor = bookItem.querySelectorAll("p")[0].innerText;
    const bookYear = bookItem.querySelectorAll("p")[1].innerText;

    bookItem.remove();
    const book = makeBook(bookID, bookTitle, bookAuthor, bookYear, false);
    document.getElementById("incompleteBookshelfList").append(book);

    for (let arrayPosition = 0; arrayPosition < books.length; arrayPosition++) {
      if (books[arrayPosition].id == bookID) {
        books[arrayPosition].isComplete = false;
        console.log(books[arrayPosition]);
      }
    }
    updateJson();
  });

  return actionUnread;
}

function bookSearch() {
  const bookSearch = document.getElementById("searchBookTitle");
  const filter = bookSearch.value.toUpperCase();
  const book = document.querySelectorAll(".book_item");

  for (let i = 0; i < book.length; i++) {
    const bookTitle = book[i].textContent || book[i].innerText;

    if (bookTitle.toUpperCase().indexOf(filter) > -1) {
      book[i].style.display = "";
    } else {
      book[i].style.display = "none";
    }
  }
}

function bookStatus() {
  const span = document.querySelector("span");
  if (inputBookIsComplete.checked) {
    span.innerText = "Selesai dibaca";
  } else {
    span.innerText = "Belum selesai dibaca";
  }
}
