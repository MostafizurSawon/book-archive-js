const loadData = () => {
    const searchField = document.getElementById("searchField");
    const searchText = searchField.value;
    // console.log(searchtext);
    searchField.value = "";

//   api
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayBooks(data));
    //   .then((data) => console.log(data));
  };
  
  const displayBooks = books => {
    const mainContent = books.docs;
    // console.log(mainContent);
    const bookAll = document.getElementById("book-card");

    // Total result
    const showResult = books.numFound;

    if (showResult === 0) {
      const searchResult = document.getElementById("total-result");

      // clear field
      searchResult.textContent = "";
      const div = document.createElement("div");
      div.classList.add("h2");
      div.innerHTML = `<h2>Result : ${showResult}</h2> `;
      searchResult.appendChild(div);
    } else {
      const searchResult = document.getElementById("total-result");
      
      searchResult.textContent = "";
      const div = document.createElement("div");
      div.classList.add("h2");
      div.innerHTML = `<h3>Result : ${showResult}</h3> `;
      searchResult.appendChild(div);
    }
  
    // Error Handling
    if (mainContent.length === "" || mainContent.length === 0) {
      const errorMsg = document.getElementById("error-message");
      errorMsg.innerHTML = `
      <h1 class="text-center text-danger">No result Found!</h1>`;
    }
    
    else {
      bookAll.textContent = "";
      mainContent.forEach((book) => {
        const bookDiv = document.createElement("div");

        const image = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        console.log(image);

        bookDiv.classList.add("col");
        bookDiv.innerHTML = `
        <div class="card h-100 text-dark">
        <img class="img-fluid custom-img" src="${image}" class="card-img-top" alt="...">
          <div class="card-body">
              <h5 class="card-title">Book Name: ${book.title}</h5>
              <p class="card-text">Author Name: ${book.author_name}</p>
              <p class="card-text">Book Publisher: ${book.publisher}</p>
              <p class="card-text">First Publish Year: ${book.first_publish_year}</p>
          </div>
        </div>
        `;
        bookAll.appendChild(bookDiv);
      });
    }
  };