import fictionRaw from './fiction.js';
import nonfictionRaw from './nonfiction.js';
import { parse } from '@vanillaes/csv';

const booksParsed = {
  fiction: parse(fictionRaw),
  nonfiction: parse(nonfictionRaw)
}

function processBooks(genre) {
  const booksUnprocessed = booksParsed[genre];
  const books = [];
  for (let i = 1; i < booksUnprocessed.length; i++) {
      books.push({
          rank: parseInt(booksUnprocessed[i][0]),
          title: booksUnprocessed[i][1],
          author: booksUnprocessed[i][2],
          year: parseInt(booksUnprocessed[i][3]),
      })
  }
  return books;
}

export const books = {
  fiction: processBooks('fiction'),
  nonfiction: processBooks('nonfiction')
}

function processAuthors(genre) {
  const authors = [];
  for (let book of books[genre]) {
    let unmatched = true;
    for (let author of authors) {
        if (book.author === author.name) {
            unmatched = false;
            if (book.year < author.startYear) {
                author.year = book.year;
            }
            if (book.rank < author.rank) {
                author.rank = book.rank;
            }
            author.books.push(book.title);
        }
    }
    if (unmatched) {
        authors.push({
            name: book.author,
            year: book.year,
            rank: book.rank,
            books: [book.title],
        })
    }
  }
  return authors;
}

export const authors = {
  fiction: processAuthors('fiction'),
  nonfiction: processAuthors('nonfiction'),
}
