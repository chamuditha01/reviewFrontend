import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { MdLocalLibrary } from "react-icons/md";

interface AddBookProps {
  onAddBook: (book: {
    bookname: string;
    author: string;
    rating: string;
    textreview: string;
  }) => void;
}

const AddBook: React.FC<AddBookProps> = ({ onAddBook }) => {
  const [bookname, setBookname] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState("");
  const [textreview, setTextreview] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState<boolean>(false); // Manage loading state
  const [error, setError] = useState<string>(""); // Manage error state
  const [successMessage, setSuccessMessage] = useState<string>(""); // Manage success message

  // Get userId from localStorage and convert to number
  const storedUserId = localStorage.getItem("userId");
  const userId = storedUserId ? parseInt(storedUserId, 10) : null; // Convert to number if available, else null

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure userId is a valid number before submitting
    if (userId === null) {
      setError("User ID is missing or invalid.");
      return;
    }

    const bookData = {
      bookname, // Should be a non-empty string
      author, // Should be a non-empty string
      rating, // Should be a non-empty string
      textreview, // Ensure userId is an integer,
      date
    };

    console.log("Submitting book:", bookData);
    setLoading(true); // Set loading to true
    setSuccessMessage(""); // Clear previous success message
    setError(""); // Clear previous error message

    try {
      const response = await fetch("https://localhost:5000/api/books", {
        // API call for adding a book
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData), // Convert bookData to JSON string before sending
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle successful response...
      onAddBook(bookData); // Optional: Call onAddBook prop if you want to update the parent component state

      // Clear input fields
      setBookname("");
      setAuthor("");
      setRating("");
      setTextreview("");
      setDate("");

      // Set success message
      setSuccessMessage("Book added successfully!");
    } catch (error) {
      console.error("Error submitting book:", error);
      setError("Failed to add book. Please try again."); // Set error message
    } finally {
      setLoading(false); // Set loading back to false
    }
  };

  return (
    <div>
      
      <MdLocalLibrary size={140} color="#54473F"/>  
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <label htmlFor="bookname" style={{color:'black'}}>
          Book Name:
          <input
            type="text"
            id="bookname"
            value={bookname}
            onChange={(e) => setBookname(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </label>
        <label htmlFor="author" style={{color:'black'}}>
          Author:
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </label>
        <label htmlFor="author" style={{color:'black'}}>
          Rating /5:
          <input
            type="text"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </label>
        <label htmlFor="description" style={{color:'black'}}>
          Text-Review:
          <textarea
            id="textreview"
            value={textreview}
            onChange={(e) => setTextreview(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </label>
        <button
          type="submit"
          disabled={loading || !bookname || !author || !rating}
          style={{
            padding: "10px",
            backgroundColor: "#54473F",
            color: "white",
            cursor: "pointer",
            border: "none",
            borderRadius: "4px",
          }}
        >
          {loading ? "Adding..." : "Add Review"}
        </button>
        {error && <div className="text-danger">{error}</div>}{" "}
        {/* Display error message */}
        {successMessage && (
          <div className="text-success">{successMessage}</div> 
        )}{" "}
        {/* Display success message */}
      </form>
    </div>
  );
};

export default AddBook;
