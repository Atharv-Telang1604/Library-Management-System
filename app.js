const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000;

// Sample Book Data
let books = [
    {
        bookName: "Rudest Book Ever",
        bookAuthor: "Shwetabh Gangwar",
        bookPages: 200,
        bookPrice: 240,
        bookState: "Available"
    },
    {
        bookName: "Do Epic Shit",
        bookAuthor: "Ankur Warikoo",
        bookPages: 200,
        bookPrice: 240,
        bookState: "Available"
    }
];

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Home Route
app.get("/", (req, res) => {
    res.render("home", { data: books });
});

//Book Route
app.post("/", (req, res) => {
    const newBook = {
        bookName: req.body.bookName,
        bookAuthor: req.body.bookAuthor,
        bookPages: req.body.bookPages,
        bookPrice: req.body.bookPrice,
        bookState: "Available"
    };

    books.push(newBook);
    res.render("home", { data: books });
});

//  Issue Book
app.post("/issue", (req, res) => {
    const requestedBookName = req.body.bookName;

    const bookFound = books.some(book => {
        if (book.bookName === requestedBookName) {
            book.bookState = "Issued";
            return true;
        }
    });

    res.render("home", { data: books });
});

//Return Book
app.post("/return", (req, res) => {
    const requestedBookName = req.body.bookName;

    const bookFound = books.some(book => {
        if (book.bookName === requestedBookName) {
            book.bookState = "Available";
            return true;
        }
    });

    res.render("home", { data: books });
});

//Delete Book
app.post("/delete", (req, res) => {
    const requestedBookName = req.body.bookName;

    books = books.filter(book => book.bookName !== requestedBookName);

    res.render("home", { data: books });
});

//Start Server
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
