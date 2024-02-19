import React, {useState, useEffect} from "react";
import './App.css';

function App(){
    const [celebrity, setCelebrity] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(Response => Response.json())
        .then(data => {
            setCelebrity(data);
            setLoading(false);
        })
        .catch(error => {
            console.error('There is an error in fetching the celebrity data for you', error);
        });
    }, []);

    return(
        <div className="App">
            <h1>Welcome to Amatip IT CelebFinder Pro</h1>
            { loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {celebrity.map(user => (
                        <li>
                            <h2>{user.name}</h2>
                            <p>{user.email}</p>
                            <p>{user.website}</p>
                            <p>{user.phone}</p>
                            <p>{user.address.city}</p>

                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default App;