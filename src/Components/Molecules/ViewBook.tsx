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

const ViewBooks: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]); // State to hold the books data
  const [loading, setLoading] = useState<boolean>(true); // State to handle loading
  const storedUserId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("https://localhost:5000/api/books"); // Api call for fetching all books
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false); // Set loading to false once the fetch is done
      }
    };

    if (storedUserId) {
      //console.log("Retrieved User ID:", storedUserId); // Log the retrieved user ID(optional)
    } else {
      console.log("No User ID found in localStorage.");
    }
    fetchBooks(); // Call the fetch function
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while fetching
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
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.reviewId}>
                  <td>{book.bookname}</td>
                  <td>{book.author}</td>
                  <td>{book.rating}</td>
                  <td>{book.textreview}</td>
                  <td>{book.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewBooks;
