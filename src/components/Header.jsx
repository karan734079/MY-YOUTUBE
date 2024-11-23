import React, { useEffect, useState } from 'react'
import youtubeLogo from '../images/360_F_507468479_HfrpT7CIoYTBZSGRQi7RcWgo98wo3vb7-removebg-preview.png'
import userIcon from '../images/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8-removebg-preview.png'
import searchIcon from '../images/images-removebg-preview.png'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../utils/appSlice'
import axios from 'axios'
import { cacheResults } from '../utils/searchSlice'
import { useNavigate } from 'react-router-dom'
import conf from '../utils/conf'

const Header = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const searchCache = useSelector((state) => state.search);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchCache[searchQuery]) {
                setSuggestions(searchCache[searchQuery]);
            } else {
                getSearchSuggestions();
            }
        }, 200);

        return () => {
            clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery]);

    const getSearchSuggestions = async () => {
        try {
            const url = conf.youtubeSearchApi + encodeURIComponent(searchQuery);
            const response = await axios.get(url);
            setSuggestions(response.data[1]);

            dispatch(cacheResults({
                [searchQuery]: response.data[1],
            }));
        } catch (error) {
            console.error("Error fetching search suggestions:", error);
        }
    };


    const toggleMenuHandler = () => {
        dispatch(toggleMenu());
    }

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion);
        navigate(`/search?q=${suggestion}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (searchQuery) {
            navigate(`/search?q=${searchQuery}`)
        }
    }

    return (
        <div className='grid grid-flow-col p-4 m-2 shadow-lg bg-white text-black'>
            <div className='flex col-span-1 space-x-4'>
                <img
                    className='h-8 cursor-pointer'
                    onClick={() => toggleMenuHandler()}
                    src="https://cdn.iconscout.com/icon/free/png-256/free-hamburger-menu-icon-download-in-svg-png-gif-file-formats--crispy-user-interface-pack-icons-462145.png?f=webp&w=256"
                    alt="menu"
                />
                <a href="/"><img className='h-8' src={youtubeLogo} alt="youtube-logo" /></a>
            </div>
            <div className='col-span-10 px-10 flex flex-col relative'>
                <form onSubmit={handleSubmit} className='flex'>
                    <input
                        className='w-1/2 border border-gray-400 p-1 rounded-l-full'
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setShowSuggestions(false)}
                        placeholder="Search..."
                    />
                    <button
                        type="submit"
                        className='border border-gray-400 p-1 px-2 rounded-r-full focus:border focus:border-black'
                        style={{ height: '100%' }}
                    >
                        <img className='h-5' src={searchIcon} alt="search" />
                    </button>
                </form>
                {showSuggestions && (
                    <div className='mt-10 absolute z-10 bg-white border rounded-xl shadow-lg w-1/2'>
                        <ul className='max-h-48 overflow-y-auto scrollbar-hidden'>
                            {suggestions.map((s) => (
                                <li className='p-2 my-1 rounded hover:bg-gray-200 flex space-x-1' key={s}
                                    onMouseDown={() => handleSuggestionClick(s)}>
                                    <img className='h-5' src={searchIcon} alt="search" />
                                    <p className='text-sm'>{s}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div>
                <img className='h-8' src={userIcon} alt="user" />
            </div>
        </div>
    )
}

export default Header
