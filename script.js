
let books = [
    {
        date: "17 Jun 2026",
        reader: "Eleanor",
        book: "The Silent Patient",
        genre: "Fiction",
        issued: false
    },
    {
        date: "19 Jun 2026",
        reader: "Marcus",
        book: "Clean Code",
        genre: "Programming",
        issued: false
    },
    {
        date: "18 Jun 2026",
        reader: "Sophia",
        book: "Salt, Fat, Acid, Heat",
        genre: "Cooking",
        issued: false
    }
];

function displayBooks(data = books) {

    let output = "";

    data.forEach((b, index) => {

        output += `
        <tr>
            <td>${index + 1}</td>
            <td>${b.date}</td>
            <td>${b.reader}</td>
            <td>📕 ${b.book}</td>
            <td>${b.genre}</td>

            <td>
                <button class="action-btn"
                onclick="issueBook(${books.indexOf(b)})">
                ${b.issued ? "Return" : "Issue"}
                </button>

                <button class="action-btn delete"
                onclick="deleteBook(${books.indexOf(b)})">
                Delete
                </button>
            </td>
        </tr>`;
    });

    document.getElementById("bookList").innerHTML = output;
    document.getElementById("count").innerText =
        books.length + " books";
}

function addBook() {

    let reader = document.getElementById("reader").value;
    let book = document.getElementById("book").value;

    let genre = document.querySelector(
        'input[name="genre"]:checked'
    ).value;

    if (reader.trim() === "" || book.trim() === "") {
        alert("Please enter Reader and Book name");
        return;
    }

    let today = new Date().toLocaleDateString(
        "en-GB",
        { day: "2-digit", month: "short", year: "numeric" }
    );

    books.push({
        date: today,
        reader: reader,
        book: book,
        genre: genre,
        issued: false
    });

    document.getElementById("reader").value = "";
    document.getElementById("book").value = "";

    displayBooks();
}

function issueBook(index) {

    books[index].issued = !books[index].issued;

    displayBooks();
}

function deleteBook(index) {

    if (confirm("Are you sure you want to delete?")) {
        books.splice(index, 1);
        displayBooks();
    }
}

function searchBook() {

    let value = document.getElementById("search")
        .value.toLowerCase();

    let result = books.filter(b =>
        b.book.toLowerCase().includes(value) ||
        b.reader.toLowerCase().includes(value)
    );

    displayBooks(result);
}

displayBooks();