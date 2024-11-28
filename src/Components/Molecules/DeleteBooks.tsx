import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";

interface Book {
 reviewId:number;
  bookname: string;
  author: string;
  rating: string;
  textreview: string;
  date:string;
}

const DeleteBooks: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("https://localhost:5000/api/books"); // API call to fetch books
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks(); // Call the fetch function
  }, []);

  const handleDeleteClick = async (bookId: number) => {
    try {
      const response = await fetch(
        `https://localhost:5000/api/books/${bookId}`,
        {
          // API call to delete a book by ID
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete book");
      }

      // Remove the book from local state
      setBooks((prevBooks) =>
        prevBooks.filter((book) => book.reviewId !== bookId)
      );
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="center-table-content">
        <div className="table-responsive">
          <table
            className="table table-bordered table-hover"
            style={{ margin: "0 auto" }}
          >
            <thead className="thead-dark">
              <tr>
              <th id="th1">Book Name</th>
                <th id="th1">Author</th>
                <th id="th1">Rating</th>
                <th id="th1">Text-Rating</th>
                <th id="th1">Date</th>
                <th id="th1">Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map(
                (
                  book // Map through the books array get from the API
                ) => (
                  <tr key={book.reviewId}>
                    <td>{book.bookname}</td>
                    <td>{book.author}</td>
                    <td>{book.rating}</td>
                    <td>{book.textreview}</td>
                    <td>
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic radio toggle button group"
                      >
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleDeleteClick(book.reviewId)} // Call handleDeleteClick function with bookId as argument
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeleteBooks;
