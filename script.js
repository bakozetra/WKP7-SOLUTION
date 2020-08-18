let books = [];

// add an element to the list with the form
// The element is added on the list
// reset the form after submission
// Not add an empty element
// delete an element
// edit the state of an element
// save new element to local storage
// save the new state of object in local storage
// form validation?
const tableList = document.querySelector('tbody');
const form = document.querySelector('form') 

const showBooks = () => {
    const html = books.map(book => {
        return `
        <tr>
            <td class ="left">${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td>${book.pages}</td>
            <td>
            <button value='${book.id}'
               class = "check" aria-label="Update read attribute ${book.title}">
              <img  ${book.read ? '' : 'hidden'}
                    src= "./assets/icons/checked.svg"
                alt =" the book ${book.title} is read"/>
              <img  ${book.read ? 'hidden' : '' }
                src= "./assets/icons/unchecked.svg" 
                alt = "the book ${book.title} is not read"/>
            </button>
            </td>
            <td>
            <button value='${book.id}' 
               class ="delete" aria-label ="Delete book ${book.title}">
               <img 
                    src= "./assets/icons/trash.svg" 
                    alt = "${book.title} from list"/>
            </button>
            </td>
        </tr>
        `
    })
    .join('');
    tableList.innerHTML= html;
};
showBooks();

const addBook = e => {
    e.preventDefault();
    console.log(e);
    const formEl = e.currentTarget;
    const newBook = {
        title : formEl.title.value,
        author : formEl.author.value,
        genre: formEl.genre.value,
        pages: formEl.pages.value,
        read: formEl.read.value ===  'true',
        id : Date.now(),
    };
    books.push(newBook);
    tableList.dispatchEvent(new CustomEvent('listUpdated'));
    formEl.reset();
};

const handleClick = e => { 
 console.log(e.target);
 const checkBtn = e.target.closest('button.check')
 if (checkBtn) {
     const id = Number(checkBtn.value);
     updateRead(id)
 
 }
  const deleteBtn = e.target.closest('button.delete')
    if (deleteBtn) {
        const id = Number(deleteBtn.value);
        deleteBook(id);
       }
};

const deleteBook = id => {
   books = books.filter(book => book.id !== id);
   tableList.dispatchEvent(new CustomEvent('listUpdated'))
};

const updateRead = id => {
    const bookToUpdate = books.find(book => book.id === id);
    bookToUpdate.read = !bookToUpdate.read;
    console.log(bookToUpdate);
    tableList.dispatchEvent(new CustomEvent('listUpdated'))
};
// when the look , we want to look the local storage and 
const initLocalStorage = () => { 
 const bookList = JSON.parse(localStorage.getItem('books'));
 if(bookList) {
    books = bookList;
 }
 tableList.dispatchEvent(new CustomEvent ('listUpdated'));
};

const updateLocalStorage = () => {
    localStorage.setItem('books', JSON.stringify(books));
};

form.addEventListener('submit', addBook);
tableList.addEventListener('listUpdated', showBooks);
tableList.addEventListener('listUpdated', updateLocalStorage)
window.addEventListener('DOMContentLoaded', showBooks); // call the function 
tableList.addEventListener('click', handleClick);
 initLocalStorage();