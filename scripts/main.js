console.log("scripts run");
const URL_BOOK = "https://us-central1-webservices-314bf.cloudfunctions.net/bookstore/api/v1/"

async function getAll() {
    const res = await fetch(URL_BOOK + "books",
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
    const dataAllBook = await res.json()
    const data = dataAllBook.slice(0,20)
    // console.log(dataAllBook);
    data.forEach(element => {
        showALLBook(element)
    });
}

const showALLBook = (dataAllBook) => {
    console.log("show all book");
    // console.log(dataAllBook);
    const div = document.createElement("div")
    div.className = 'col-3 gap-1'
    const card = `
        <div class="card mt-3" style="width: 20rem;">
            <img src="${dataAllBook.thumbnailUrl}" class="card-img-top" alt="...">
            <div class="card-body">
            <p class="card-text">${dataAllBook.shortDescription}</p>
            <a href="../pages/detailbook.html?isbn=${dataAllBook.isbn}" class="btn btn-primary ">ดูรายละเอียดหนังสือ</a>
            <a href="../pages/edit.html?isbn=${dataAllBook.isbn}" class="btn btn-warning ">แก้ใข</a>
            <a href="/" onclick="deleteBook(${dataAllBook.isbn})" class="btn btn-danger ">ลบ</a>
        </div>`
    div.innerHTML = card
    const eleBook = document.querySelector('.row')
    eleBook.appendChild(div)

}

const deleteBook = async (isbn) => {
    const _isbn = isbn.toString()
    console.log(_isbn);
    // console.log(`https://us-central1-webservices-314bf.cloudfunctions.net/bookstore/api/v1/books/${_isbn}`);
    await fetch(`https://us-central1-webservices-314bf.cloudfunctions.net/bookstore/api/v1/books/${_isbn}`,
        {
            method: 'DELETE',   
            mode: "cors",
            // cache: "no-cache",
            // credentials: "same-origin",
            // headers: {
            //     "Content-Type": "application/json",
            // },
        })
        .then((result) => {
            alert(`Restaurant ID: ${_isbn} ${result} is deleted`);
            location.reload();
        }).catch(
            (err) => {
                alert(err)
                console.log(err);
            }
        )
}

function main() {
    
    getAll()
}

main()