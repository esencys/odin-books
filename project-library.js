function Book(title, author, numPages, hasRead) {

  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.hasRead = hasRead;

  this.info = () => {
    let nameInfo = `${title} by ${author}`;
    let pagesInfo = `${numPages} pages`;
    let readInfo = this.hasRead ? "read" : "not read yet";

    return `${nameInfo}, ${pagesInfo}, ${readInfo}`;
  };
};

const addBookToLibrary = (book, library) => {
  let newLib = library.filter((libBook) => {
    if (libBook.title === book.title) {
      return libBook;
    }
  });

  if (newLib.length > 0) return;

  return library.push(book);
};


const hobbit = new Book(
  title = "The Hobbit"
  , author = "J.R.R Tolkien"
  , numPages = 295
  , hasRead = false
);

const main = () => {
  const app = document.getElementById("app");
  const tableElement = createTableElement(state);
  const addBtn = createAddBookButton();
  const modal = createModalElement();
  const form = createFormElement();

  modal.appendChild(form);
  app.appendChild(modal);
  app.appendChild(tableElement);
  app.appendChild(addBtn);
}

const createAddBookButton = () => {
  const addBtn = document.createElement("button");

  addBtn.innerText = "ADD BOOK";
  addBtn.addEventListener('click', (e) => handleAddBook(e));

  return addBtn;
};

const handleAddBook = (e) => {
  e.stopPropagation();
  const modal = document.getElementById("modal");

  let display = toggleDisplay(modal.style.display);

  modal.style.display = display;
};

const toggleDisplay = (display) => {
  let output;
  if (display === "none") {
    output = "block";
  }
  else if (display === "block"){ 
    output = "none";
  }
  else {
    output = "";
  }

  return output;
};

const createModalElement = () => {
  const modalElement = document.createElement("div");

  modalElement.id = "modal";
  modalElement.style.display = "none";

  return modalElement;
};

const createFormElement = () => {
  const formElement = document.createElement("form");
  const titleInput = createFormInputContainer("title");
  const authorInput = createFormInputContainer("author");
  const numPagesInput = createFormInputContainer("num-pages");
  const hasReadInput = createFormCheckboxContainer("has-read");
  const formSubmitBtn = createFormSubmitContainer();

  formElement.id = "form";

  formElement.appendChild(titleInput);
  formElement.appendChild(authorInput);
  formElement.appendChild(numPagesInput);
  formElement.appendChild(hasReadInput);
  formElement.appendChild(formSubmitBtn);

  return formElement;
};

const createFormSubmitContainer = () => {
  const submitBtn = document.createElement("button");

  submitBtn.textContent = "submit";
  submitBtn.addEventListener('click', (e) => handleSubmitBtn(e, state));

  return submitBtn;
};

const handleSubmitBtn = (e, state) => {
  e.stopPropagation();
  e.preventDefault();

  let form = state.form;

  let isValidForm = validateForm(form);
  
  if (isValidForm) {
    addBookToStateLibrary(form);
    reRenderTableBody();
  } 
};

const validateForm = (form) => {
  console.log("validating...");
  return true;
};

const addBookToStateLibrary = (form) => {
  let newBook = new Book(
    form.title
    , form.author
    , parseInt(form["num-pages"])
    , form.hasRead
  ); 

  addBookToLibrary(newBook, state.library);
};

const createFormInputContainer = (name) => {
  const inputContainer = document.createElement("div");
  const inputElement = document.createElement("input");
  const inputLabel = document.createElement("label");

  inputElement.id = name;
  inputElement.addEventListener('change', (e) => handleInputEnter(e, state, name));

  inputLabel.htmlFor = name;
  inputLabel.textContent = name;

  inputContainer.appendChild(inputLabel);
  inputContainer.appendChild(inputElement);

  return inputContainer;
};

const handleInputEnter = (e, state, name) => {
  e.stopPropagation();

  state.form[name] = e.target.value;
};

const createFormCheckboxContainer = (name) => {
  const checkBoxContainer = document.createElement("div");
  const checkBoxElement = document.createElement("input");
  const inputLabel = document.createElement("label");

  checkBoxElement.id = name;
  checkBoxElement.type = "checkbox";
  checkBoxElement.addEventListener('click', (e) => handleCheckboxClick(e, state));

  inputLabel.htmlFor = name;
  inputLabel.textContent = name;

  checkBoxContainer.appendChild(inputLabel);
  checkBoxContainer.appendChild(checkBoxElement);

  return checkBoxContainer;

};

const handleCheckboxClick = (e, state) => {
  e.stopPropagation();

  state.form.hasRead = !state.form.hasRead;
};

const createTableElement = (state) => {
  const tableElement = document.createElement("table");
  const tableHeader = createTableHeaderRow();
  const tableBody = createRowBooks(state);

  tableElement.id = "bookTable";
  tableElement.appendChild(tableHeader);

  if (state.library.length <= 0) return tableElement;

  tableElement.appendChild(tableBody);

  return tableElement;
};

const createTableHeaderRow = () => {
  const tableHeaderRow = document.createElement("tr");

  const title = createTableHeaderElement("Title");
  const author = createTableHeaderElement("Author");
  const numPages = createTableHeaderElement("NumPages");
  const hasRead = createTableHeaderElement("HasRead");

  tableHeaderRow.appendChild(title);
  tableHeaderRow.appendChild(author);
  tableHeaderRow.appendChild(numPages);
  tableHeaderRow.appendChild(hasRead);

  return tableHeaderRow;
};

const createTableHeaderElement = (header) => {
  const tableHeaderElement = document.createElement("th");
  tableHeaderElement.textContent = header;

  return tableHeaderElement;
};

const createRowBooks = (state) => { 
  const rowBooks = document.createElement("tbody");
  rowBooks.id = "tableBody";

  state.library.forEach((libBook, index) => {
    const bookObj = JSON.parse(JSON.stringify(libBook));
    delete bookObj.info;

    let rowBook = createRowBook(bookObj);
    let deleteBtn = createDisplayBookBtn(index, handleDeleteBook, "DELETE BOOK"); 
    let toggleReadBtn = createDisplayBookBtn(index, handleChangeHasRead, "TOGGLE READ");

    rowBook.appendChild(deleteBtn);
    rowBook.appendChild(toggleReadBtn);
    rowBooks.appendChild(rowBook);
  })

  return rowBooks;
};

const createRowBook = (rowBook) => {
  const rowBookElement = document.createElement("tr");

  for (let key in rowBook) {
    let bookKeyElement = document.createElement("td");
    bookKeyElement.textContent = rowBook[key];

    rowBookElement.appendChild(bookKeyElement);
  }

  return rowBookElement;
};

const createDisplayBookBtn = (dataId, handleClick, innerText) => {
  const displayBookBtn = document.createElement("button");
  displayBookBtn.innerText = `${innerText}`;
  displayBookBtn.setAttribute("data-id", `${dataId}`);
  displayBookBtn.addEventListener('click', (e) => handleClick(e, state))

  return displayBookBtn;
};

const handleDeleteBook = (e, state) => {
  e.stopPropagation();
  let bookId = parseInt(e.target.dataset.id);

  deleteBookFromLibrary(bookId, state.library);
  reRenderTableBody();
};

const handleChangeHasRead = (e, state) => {
  e.stopPropagation();
  let bookId = parseInt(e.target.dataset.id);

  toggleHasRead(bookId, state.library);
  reRenderTableBody();
};

const toggleHasRead = (bookId, library) => {
  if (bookId > -1) {
    let hasRead = library[bookId].hasRead;
    library[bookId].hasRead = !hasRead;
  }
};

const deleteBookFromLibrary = (bookId, library) => {
  if (bookId > -1) {
    library.splice(bookId, 1);
  } 
};

const reRenderTableBody = () => {
  const tableElement = document.getElementById("bookTable");
  const tableBodyElement = document.getElementById("tableBody");
  const newTableBodyElement = createRowBooks(state);

  tableElement.appendChild(newTableBodyElement);

  if (!tableBodyElement) {
    return;
  }

  tableElement.removeChild(tableBodyElement);
};

const hobbit1 = {...hobbit, title: "hobbit1"};
const hobbit2 = {...hobbit, title: "hobbit2"};
let myLibrary = [hobbit, hobbit1, hobbit2];

const state = {
  library: myLibrary,
  // library: [],
  form: {
    hasRead: false
  }
};

main();

