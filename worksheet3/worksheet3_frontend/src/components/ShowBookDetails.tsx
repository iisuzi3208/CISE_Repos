'use client'

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Book, DefaultEmptyBook } from './Book';
import Link from 'next/link';

function ShowBookDetails() {
  const [book, setBook] = useState<Book>(DefaultEmptyBook);
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:8082/api/books/${id}`);
        if (!response.ok) throw new Error('Failed to fetch book');
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8082/api/books/${book._id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete book');
      router.push('/');
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="ShowBookDetails">
      <div className="container">
        <div className="row">
          <div className="col-md-10 m-auto">
            <br /><br />
            <Link href="/" className="btn btn-outline-warning float-left">
              Show Book List
            </Link>
          </div>
          
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Book's Record</h1>
            <p className="lead text-center">View Book's Info</p>
            <hr /><br />
          </div>
          
          <div className="col-md-10 m-auto">
            <div>
              <table className="table table-hover table-dark table-striped table-bordered">
                <tbody>
                  <tr><th scope="row">1</th><td>Title</td><td>{book.title}</td></tr>
                  <tr><th scope="row">2</th><td>Author</td><td>{book.author}</td></tr>
                  <tr><th scope="row">3</th><td>ISBN</td><td>{book.isbn}</td></tr>
                  <tr><th scope="row">4</th><td>Publisher</td><td>{book.publisher}</td></tr>
                  <tr><th scope="row">5</th><td>Published Date</td><td>{book.published_date?.toString()}</td></tr>
                  <tr><th scope="row">6</th><td>Description</td><td>{book.description}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="col-md-6 m-auto">
            <button
              type="button"
              className="btn btn-outline-danger btn-lg btn-block"
              onClick={handleDelete}
              disabled={!book._id}
            >
              Delete Book
            </button>
          </div>
          
          <div className="col-md-6 m-auto">
            <Link
              href={`/edit-book/${book._id}`}
              className="btn btn-outline-info btn-lg btn-block"
              style={{ pointerEvents: !book._id ? 'none' : 'auto' }}
            >
              Edit Book
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowBookDetails;