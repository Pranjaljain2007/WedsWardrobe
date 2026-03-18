import React, { useState, useRef, useEffect } from 'react';
import './SearchOverlay.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchOverlay = ({ onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const inputRef = useRef(null);

    useEffect(() => {
        // Auto-focus input on mount
        inputRef.current.focus();
    }, []);


    const handleSearch = async (searchTerm) => {
        try {
            const [womenRes, menRes] = await Promise.all([
                axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/wear/women`),
                axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/wear/men`),
            ]);

            const allProducts = [...womenRes.data, ...menRes.data];


            const filtered = allProducts.filter((item) => {
                const nameMatch = item.name?.toLowerCase().includes(searchTerm.toLowerCase());
                const subcategoryMatch = item.subcategory?.toLowerCase().includes(searchTerm.toLowerCase());
                return nameMatch || subcategoryMatch;
            });


            setResults(filtered);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="search-overlay">
            <div className="search-bar">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        handleSearch(e.target.value);
                    }}

                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button onClick={onClose} className="close-btn">✖</button>
            </div>

            <div className="search-results">
                {query && results.length === 0 && (
                    <p className="not-found">
                        Woah! Looks like the weddingwear just ghosted you! <br />
                        Try searching again.
                    </p>
                )}

                {results.map((item, index) => (
                    <div
                        key={index}
                        className="result-card"
                        onClick={() => navigate('/productDisplay', { state: { product: item } })}>
                        <img src={`${import.meta.env.VITE_BACKEND_URL}/images/${item.imageUrl}`} alt={item.name} />
                        <h4>{item.name}</h4>
                        <p>{item.ownerName}</p>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchOverlay;
