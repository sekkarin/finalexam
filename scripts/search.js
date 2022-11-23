const showALLBook = (dataAllBook) => {
    if(dataAllBook){
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
    }else{
        const div = document.createElement("div")
        
        const card = `<p>ไม่มีผลลัพธ์</p>`
        div.innerHTML = card
        const eleBook = document.querySelector('.row')
        eleBook.appendChild(div)
    }
   

}
async function main() {
    const URL_BOOK = "https://us-central1-webservices-314bf.cloudfunctions.net/bookstore/api/v1/"

    const url = new URL(document.location).searchParams
    const search = url.get("search");
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
    const result = []
    const dataAllBook = await res.json()
    const data = dataAllBook
    for (let index = 0; index < data.length; index++) {
        const dataBook = data[index];
        let title = dataBook["title"].toLowerCase()
        console.log(title);
        if(title.includes(search.toLowerCase())){
            result.push(data[index])
        }
    }
    result.slice(0,20).forEach(e=>{
        showALLBook(e)
    })
    
}
main()