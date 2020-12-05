let cors = require('cors')
const csv = require('csv-parser');
const express = require('express');
const app = express()

app.use(cors());
// Create Express app
const fs = require('fs');
let authors = [];
let books = [];
let magazines = [];
let authors_all_Data = {};

fs.createReadStream('./data/authors.csv').pipe(csv({ separator: ';' })).on('data', (row) => {
  let tempRow = {};
  Object.keys(row).forEach(key => {
    let newKey = key.split('﻿').join('');
    tempRow[newKey] = row[key];
  })
  authors.push(tempRow);
}).on('end', () => {
  fs.createReadStream('./data/books.csv').pipe(csv({ separator: ';' })).on('data', (row) => {
    books.push(row);
  }).on('end', () => {
    fs.createReadStream('./data/magazines.csv').pipe(csv({ separator: ';' })).on('data', (row) => {
      magazines.push(row);
    }).on('end', () => {
      authors.forEach(author => {
        authors_all_Data[author.email] = author;
      })
      books.forEach(book => {
        let authors = book.authors.split(',');
        authors.forEach(author => {
          if(authors_all_Data[author]) {
            if (authors_all_Data[author]['books']){
              authors_all_Data[author]['books'].push(book);
            }
            else {
              authors_all_Data[author]['books'] = [];
              authors_all_Data[author]['books'].push(book);
            }
          }
        })
      })

      magazines.forEach(magazine => {
        let authors = magazine.authors.split(',');
        authors.forEach(author => {
          if(authors_all_Data[author]) {
            if (authors_all_Data[author]['magazines']){
              authors_all_Data[author]['magazines'].push(magazine);
            }
            else {
              authors_all_Data[author]['magazines'] = [];
              authors_all_Data[author]['magazines'].push(magazine);
            }
          }
        })
      })
    });
  });
});

// A sample route
app.get('/authors', (req, res) => {
  return res.send(authors);
})

app.get('/books', (req, res) => {
  return res.send(books);
})

app.get('/magazines', (req, res) => {
  return res.send(magazines);
})

app.get('/allData', (req, res) => {
  return res.send(authors_all_Data);
})

// Start the Express server
app.listen(3000, () => console.log('Server running on port 3000!'))
