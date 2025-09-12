'use client'

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Book, DefaultEmptyBook } from './Book';
import Link from 'next/link';

function UpdateBookInfo() {
  const [book, setBook] = useState<Book>(DefaultEmptyBook);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBook(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await fetch(`http://localhost:8082/api/books/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book)
      });
      
      if (!response.ok) throw new Error('Failed to update book');
      router.push(`/show-book/${id}`);
    } catch (error) {
      console.error('Error updating book:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="UpdateBookInfo">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
            <Link href="/" className="btn btn-outline-warning float-left">
              Show Book List
            </Link>
          </div>
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Edit Book</h1>
            <p className="lead text-center">Update Book's Info</p>
          </div>
        </div>

        <div className="col-md-8 m-auto">
          <form noValidate onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                placeholder="Title of the Book"
                name="title"
                className="form-control"
                value={book.title || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="isbn">ISBN</label>
              <input
                type="text"
                placeholder="ISBN"
                name="isbn"
                className="form-control"
                value={book.isbn || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                placeholder="Author"
                name="author"
                className="form-control"
                value={book.author || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                placeholder="Description of the Book"
                name="description"
                className="form-control"
                value={book.description || ''}
                onChange={handleInputChange}
                rows={4}
              />
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="published_date">Published Date</label>
              <input
                type="date"
                name="published_date"
                className="form-control"
                value={book.published_date?.toString().split('T')[0] || ''}
                onChange={handleInputChange}
              />
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="publisher">Publisher</label>
              <input
                type="text"
                placeholder="Publisher of the Book"
                name="publisher"
                className="form-control"
                value={book.publisher || ''}
                onChange={handleInputChange}
              />
            </div>
            <br />

            <button
              type="submit"
              className="btn btn-outline-info btn-lg btn-block"
              disabled={loading || submitting}
            >
              {submitting ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  {' Updating...'}
                </>
              ) : (
                'Update Book'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateBookInfo;