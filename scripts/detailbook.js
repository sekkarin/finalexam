console.log("scripts run");
const URL_BOOK = "https://us-central1-webservices-314bf.cloudfunctions.net/bookstore/api/v1/"

async function getAll() {
    const url = new URL(document.location).searchParams
    const isbn = url.get("isbn");
    const res = await fetch(URL_BOOK + `books/${isbn}`,
        {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    const bookdetail = await res.json()
    showALLBook(bookdetail)
}

const showALLBook = (bookdetail) => {
    console.log("show all book");
    // console.log(dataAllBook);
    let date = bookdetail.publishedDate
 
    const div = document.createElement("div")
    div.className = 'col-12'
    const card = `
    <div class="row g-0 bg-light position-relative">
    <div class="col-md-6 mb-md-0 p-md-4">
      <img src="${bookdetail.thumbnailUrl}" class="w-100" alt="...">
    </div>
    <div class="col-md-6 p-4 ps-md-0">
      <h2 class="mt-0">${bookdetail.title}</h2>
      <h5 class="mt-0">Description</h5>
      <p>${bookdetail.shortDescription}</p>
      <h5 class="mt-0">PageCount</h5>
      <p>${bookdetail.pageCount} page</p>
      <h5 class="mt-0">Published Date</h5>
      <p>${Object.values(date)}</p>
      <h5 class="mt-0">status</h5>
      <p>${bookdetail.status} page</p>
      <h5 class="mt-0">authors</h5>
      <p>${bookdetail.authors} page</p>
      <h5 class="mt-0">categories</h5>
      <p>${bookdetail.categories} page</p>
      <h5 class="mt-0">longDescription</h5>
      <p>${bookdetail.longDescription} page</p>
    </div>
  </div>`
    div.innerHTML = card
    const eleBook = document.querySelector('.row')
    eleBook.appendChild(div)

}

function main() {
    getAll()
}

main()