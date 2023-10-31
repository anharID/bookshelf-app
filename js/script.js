document.addEventListener("DOMContentLoaded", function () {
  const formInput = document.getElementById("inputBook");
  const formSearch = document.getElementById("searchBook");
  const inputBookIsComplete = document.getElementById("inputBookIsComplete");

  formInput.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();

    document.getElementById("inputBookTitle").value = "";
    document.getElementById("inputBookAuthor").value = "";
    document.getElementById("inputBookYear").value = "";

    console.log(books);
  });

  formSearch.addEventListener("submit", function (event) {
    event.preventDefault();

    const inputSearch = document.getElementById("searchBookTitle").value;
    bookSearch(inputSearch);
  });

  inputBookIsComplete.addEventListener("input", function (event) {
    event.preventDefault();
    bookStatus();
  });

  if (isStorageSupported()) {
    fetchJson();
  }
});

document.addEventListener("onjsonfetched", function () {
  renderFromBooks();
});

document.addEventListener("ondatasaved", () => {
  console.log("Buku berhasil disimpan.");
});
