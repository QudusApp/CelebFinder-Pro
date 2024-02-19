import React, { useState, useEffect } from "react";
import './App.css';
import ReactPaginate from 'react-paginate';

function App() {
    const [celebrity, setCelebrity] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = 4;

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            setCelebrity(data);
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        });
    }, []);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const filteredCelebrities = celebrity.filter(
        user => 
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const pageCount = Math.ceil(filteredCelebrities.length / itemsPerPage);
    const itemsDisplayed = filteredCelebrities.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    return (
        <div className="App">
            <h1>Amatip IT Celebrities List</h1>
            <div className="search-area">
                <input 
                    type="text" 
                    placeholder="Search..." 
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Something went wrong. Please try again later.</p>
            ) : (
                <>
                    <ul>
                        {itemsDisplayed.map(user => (
                            <li key={user.id}>
                                <h2>{user.name}</h2>
                                <p>{user.email}</p>
                                <p>{user.website}</p>
                                <p>{user.phone}</p>
                                <p>{user.address.city}</p>
                            </li>
                        ))}
                    </ul>
                    <ReactPaginate
                        previousLabel={"previous"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                    />
                </>
            )}
        </div>
    );
}

export default App;
