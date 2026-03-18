import React, { useState, useEffect, useRef, useContext } from 'react';
import img from '../../assets/headerimg.jpg';
import { useNavigate, Link } from 'react-router-dom';
import SearchOverlay from '../SearchOverlay/SearchOverlay';
import CartDrawer from '../SideCart/CartDrawer';
import { CartContext } from '../CartContext/CartContext';
import { getAuth } from "firebase/auth";



const Header = () => {

    const [showSearch, setShowSearch] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [menuLevel, setMenuLevel] = useState('main'); // 'main', 'women', 'men', 'category'
    const [selectedCategory, setSelectedCategory] = useState(null); // 'clothing', 'accessories', etc.
    const [selectedWear, setSelectedWear] = useState(null); // 'women' or 'men'


    const { cartItems } = useContext(CartContext);
    const cartCount = JSON.parse(localStorage.getItem("cart"))?.length || 0;

    const navigate = useNavigate();

    const handleRedirect = (path) => {
        if (path === '/search') setShowSearch(true);
        else if (path === '/cart') setShowCart(true);
        else navigate(path);
    };

    return (
        <>


            <div className="hidden lg:flex w-full bg-white/95 absolute top-0 left-0 z-10 px-12 py-6 items-center justify-between text-[#603969]">

                <div className="m-0 pl-[5vw] font-['Times_New_Roman',_Times,_serif] font-bolder cursor-pointer text-[35px] text-[#5a2371f6]">
                    WedsWardrobe
                </div>

                <div className=" mt-4 flex gap-12">

                    {/* WomenWear */}
                    <div className="relative group">
                        <span className=" font-['Times_New_Roman',_Times,_serif] text-[rgba(85,38,105,0.834)] text-[1.7rem] font-bold cursor-pointer">
                            WomenWear
                        </span>

                        <div className="absolute top-full left-0 bg-white/95 pt-[2rem] pb-[3rem] px-[4rem] shadow-[0_4px_12px_rgba(0,0,0,0.1)] z-50 min-w-[300px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-row gap-[4rem] -translate-x-[40%]">
                            <div className="flex flex-col gap-[0.3rem]">
                                <h4 className="text-[1.2rem] mb-[0.6rem] font-semibold text-[#5c1d75] uppercase">Clothing</h4>
                                <p className="text-[1rem] text-[#504f4f] my-[5px] cursor-pointer hover:text-[#63456f] hover:font-bold" onClick={() => handleRedirect('/women/clothing/anarkalis')}>Anarkalis</p>
                                <p className="text-[1rem] text-[#504f4f] my-[5px] cursor-pointer hover:text-[#63456f] hover:font-bold" onClick={() => handleRedirect('/women/clothing/gowns')}>Gowns</p>
                                <p className="text-[1rem] text-[#504f4f] my-[5px] cursor-pointer hover:text-[#63456f] hover:font-bold" onClick={() => handleRedirect('/women/clothing/indo-western')}>Indo-Western</p>
                                <p className="text-[1rem] text-[#504f4f] my-[5px] cursor-pointer hover:text-[#63456f] hover:font-bold" onClick={() => handleRedirect('/women/clothing/lehengas')}>Lehengas</p>
                                <p className="text-[1rem] text-[#504f4f] my-[5px] cursor-pointer hover:text-[#63456f] hover:font-bold" onClick={() => handleRedirect('/women/clothing/sarees-blouses')}>Sarees & Blouses</p>
                            </div>

                            <div className="flex flex-col gap-[0.3rem]">
                                <h4 className="text-[1.2rem] mb-[0.6rem] font-semibold text-[#5c1d75] uppercase">ACCESSORIES</h4>
                                <p className="text-[1rem] text-[#504f4f] my-[5px] cursor-pointer hover:text-[#63456f] hover:font-bold" onClick={() => handleRedirect('/women/accessories/bags')}>Bags</p>
                                <p className="text-[1rem] text-[#504f4f] my-[5px] cursor-pointer hover:text-[#63456f] hover:font-bold" onClick={() => handleRedirect('/women/accessories/banglesbracelets')}>Bangles & Bracelets</p>
                                <p className="text-[1rem] text-[#504f4f] my-[5px] cursor-pointer hover:text-[#63456f] hover:font-bold" onClick={() => handleRedirect('/women/accessories/earrings')}>Earrings</p>
                                <p className="text-[1rem] text-[#504f4f] my-[5px] cursor-pointer hover:text-[#63456f] hover:font-bold" onClick={() => handleRedirect('/women/accessories/necklaces')}>Necklaces</p>
                                <p className="text-[1rem] text-[#504f4f] my-[5px] cursor-pointer hover:text-[#63456f] hover:font-bold" onClick={() => handleRedirect('/women/accessories/rings')}>Rings</p>
                            </div>

                            <div className="flex flex-col gap-[0.3rem]">
                                <h4 className="text-[1.2rem] mb-[0.6rem] font-semibold text-[#5c1d75] uppercase">OCCASIONS</h4>
                                <p className="text-[1rem] text-[#504f4f] my-[5px] cursor-pointer hover:text-[#63456f] hover:font-bold" onClick={() => handleRedirect('/women/occasion/engagement')}>Engagement</p>
                                <p className="text-[1rem] text-[#504f4f] my-[5px] cursor-pointer hover:text-[#63456f] hover:font-bold" onClick={() => handleRedirect('/women/occasion/mehendi')}>Mehendi</p>
                                <p className="text-[1rem] text-[#504f4f] my-[5px] cursor-pointer hover:text-[#63456f] hover:font-bold" onClick={() => handleRedirect('/women/occasion/haldi')}>Haldi</p>
                                <p className="text-[1rem] text-[#504f4f] my-[5px] cursor-pointer hover:text-[#63456f] hover:font-bold" onClick={() => handleRedirect('/women/occasion/sangeet')}>Sangeet</p>
                                <p className="text-[1rem] text-[#504f4f] my-[5px] cursor-pointer hover:text-[#63456f] hover:font-bold" onClick={() => handleRedirect('/women/occasion/cocktail')}>Cocktail</p>
                                <p className="text-[1rem] text-[#504f4f] my-[5px] cursor-pointer hover:text-[#63456f] hover:font-bold" onClick={() => handleRedirect('/women/occasion/wedding')}>Wedding</p>
                                <p className="text-[1rem] text-[#504f4f] my-[5px] cursor-pointer hover:text-[#63456f] hover:font-bold" onClick={() => handleRedirect('/women/occasion/reception')}>Reception</p>
                            </div>


                        </div>
                    </div>

                    {/* MenWear */}
                    <div className="relative group">
                        <span className=" font-['Times_New_Roman',_Times,_serif] text-[rgba(85,38,105,0.834)] text-[1.7rem] font-bold cursor-pointer">
                            MenWear
                        </span>

                        <div className="absolute top-full left-0 bg-white/95 pt-[2rem] pb-[3rem] px-[4rem] shadow-[0_4px_12px_rgba(0,0,0,0.1)] z-50 min-w-[300px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-row gap-[4rem] -translate-x-[40%]">
                            <div className="flex flex-col gap-[0.2rem]">
                                <h4 className="text-[1.2rem] mb-[0.6rem] font-semibold text-[#5c1d75] uppercase">Clothing</h4>
                                <p className="text-[1rem] text-[#504f4f] my-[5px] cursor-pointer hover:text-[#63456f] hover:font-bold" onClick={() => handleRedirect('/men/clothing/bandhgalas')}>Bandhgalas</p>
                                <p className="text-[1rem] text-[#504f4f] my-[5px] cursor-pointer hover:text-[#63456f] hover:font-bold" onClick={() => handleRedirect('/men/clothing/kurtapajamas')}>Kurta Pajamas</p>
                                <p className="text-[1rem] text-[#504f4f] my-[5px] cursor-pointer hover:text-[#63456f] hover:font-bold" onClick={() => handleRedirect('/men/clothing/indowesterns')}>IndoWesterns</p>
                                <p className="text-[1rem] text-[#504f4f] my-[5px] cursor-pointer hover:text-[#63456f] hover:font-bold" onClick={() => handleRedirect('/men/clothing/suits')}>Suits</p>
                            </div>

                            <div className="flex flex-col gap-[0.3rem]">
                                <h4 className="text-[1.2rem] mb-[0.6rem] font-semibold text-[#5c1d75] uppercase">ACCESSORIES</h4>
                                <p className="text-[1rem] text-[#504f4f] my-[5px] cursor-pointer hover:text-[#63456f] hover:font-bold" onClick={() => handleRedirect('/men/accessories/ties-bowties')}>Ties & Bow Ties</p>
                                <p className="text-[1rem] text-[#504f4f] my-[5px] cursor-pointer hover:text-[#63456f] hover:font-bold" onClick={() => handleRedirect('/men/accessories/necklaces')}>Necklace</p>
                            </div>

                            <div className="flex flex-col gap-[0.3rem]">
                                <h4 className="text-[1.2rem] mb-[0.6rem] font-semibold text-[#5c1d75] uppercase">OCCASIONS</h4>
                                <p className="text-[1rem] text-[#504f4f] my-[5px] cursor-pointer hover:text-[#63456f] hover:font-bold" onClick={() => handleRedirect('/men/occasion/engagement')}>Engagement</p>
                                <p className="text-[1rem] text-[#504f4f] my-[5px] cursor-pointer hover:text-[#63456f] hover:font-bold" onClick={() => handleRedirect('/men/occasion/mehendi')}>Mehendi</p>
                                <p className="text-[1rem] text-[#504f4f] my-[5px] cursor-pointer hover:text-[#63456f] hover:font-bold" onClick={() => handleRedirect('/men/occasion/haldi')}>Haldi</p>
                                <p className="text-[1rem] text-[#504f4f] my-[5px] cursor-pointer hover:text-[#63456f] hover:font-bold" onClick={() => handleRedirect('/men/occasion/sangeet')}>Sangeet</p>
                                <p className="text-[1rem] text-[#504f4f] my-[5px] cursor-pointer hover:text-[#63456f] hover:font-bold" onClick={() => handleRedirect('/men/occasion/cocktail')}>Cocktail</p>
                                <p className="text-[1rem] text-[#504f4f] my-[5px] cursor-pointer hover:text-[#63456f] hover:font-bold" onClick={() => handleRedirect('/men/occasion/wedding')}>Wedding</p>
                                <p className="text-[1rem] text-[#504f4f] my-[5px] cursor-pointer hover:text-[#63456f] hover:font-bold" onClick={() => handleRedirect('/men/occasion/reception')}>Reception</p>
                            </div>
                        </div>

                    </div>
                </div>


                {/* Icons */}
                <div className="flex gap-[25px] mt-[20px] pr-[6vw]">
                    <i className="fas fa-search text-[24px] cursor-pointer text-[rgba(85,38,105,0.834)] hover:scale-110 transition-transform duration-200" onClick={() => handleRedirect('/search')} title="Search"></i>


                    <i
                        className="far fa-user text-[24px] cursor-pointer text-[rgba(85,38,105,0.834)] hover:scale-110 transition-transform duration-200"
                        title="My Account"
                        onClick={() => {
                            const auth = getAuth();
                            const user = auth.currentUser;
                            if (user) {
                                navigate("/myaccount");
                            } else {
                                navigate("/login");
                            }
                        }}
                    ></i>

                    <Link to="#" className="cart-icon" onClick={() => setShowCart(true)}>
                        <i className="fas fa-shopping-bag text-[24px] cursor-pointer text-[rgba(85,38,105,0.834)] hover:scale-110 transition-transform duration-200" title="Cart"></i>
                        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                    </Link>

                </div>



            </div >



            {/* Mobile Navbar - visible only on small screens */}
            < div className="w-full bg-white/95 flex justify-between items-center px-8 py-5 mt-5  top-0 z-[100] lg:hidden" >

                <i className="fas fa-bars text-4xl text-[#5d356d] cursor-pointer" onClick={() => {
                    setMobileMenuOpen(true);
                    setMenuLevel('main');
                }}></i>

                {/* Brand Name */}
                <span className="font-['Times_New_Roman',_Times,_serif] text-5xl font-semibold text-[#603969]">
                    WedsWardrobe
                </span>


                <div className="flex items-center gap-5">
                    <i className="fas fa-search text-4xl cursor-pointer text-[rgba(85,38,105,0.834)] hover:scale-110 transition-transform duration-200" onClick={() => handleRedirect('/search')} title="Search"></i>

                    <i
                        className="far fa-user text-4xl text-[#5d356d] hover:text-[#888] cursor-pointer"
                        title="My Account"
                        onClick={() => {
                            const auth = getAuth();
                            const user = auth.currentUser;
                            if (user) {
                                navigate("/myaccount");
                            } else {
                                navigate("/login");
                            }
                        }}
                    ></i>

                    <Link to="#" className="cart-icon" onClick={() => setShowCart(true)}>
                        <i className="fas fa-shopping-bag text-4xl text-[#5d356d] hover:text-[#888] cursor-pointer" title="Cart"></i>
                        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                    </Link>


                </div>
            </div >


            {mobileMenuOpen && (
                <div className="fixed inset-0 bg-white z-[999] flex flex-col  justify-center items-center text-center px-6 pb-50 ">

                    <button
                        className="absolute top-4 right-4 text-8xl pr-15 pt-10 text-[#5d356d]"
                        onClick={() => {
                            setMobileMenuOpen(false);
                            setMenuLevel('main');
                            setSelectedCategory(null);
                            setSelectedWear(null);
                        }}
                    >
                        &times;
                    </button>

                    {/* LEVEL 1 - Main Menu */}
                    {menuLevel === 'main' && (
                        <div className="flex flex-col gap-6">
                            <p
                                className="font-['Times_New_Roman',_Times,_serif] text-5xl text-[#5d2e72] uppercase font-semibold cursor-pointer"
                                onClick={() => {
                                    setMenuLevel('wear');
                                    setSelectedWear('women');
                                }}
                            >
                                WomenWear
                            </p>
                            <p
                                className="font-['Times_New_Roman',_Times,_serif] text-5xl text-[#5d2e72] uppercase font-semibold cursor-pointer"
                                onClick={() => {
                                    setMenuLevel('wear');
                                    setSelectedWear('men');
                                }}
                            >
                                MenWear
                            </p>
                        </div>
                    )}

                    {/* LEVEL 2 - Wear -> Category */}
                    {menuLevel === 'wear' && (
                        <div className="flex flex-col gap-6">
                            <h2 className="font-['Times_New_Roman',_Times,_serif] text-4xl font-semibold uppercase text-[#5c1d75] mb-4">Categories</h2>
                            {['clothing', 'accessories', 'occasion'].map((cat) => (
                                <p
                                    key={cat}
                                    className="text-3xl text-[#504f4f] uppercase cursor-pointer hover:underline underline-offset-4"

                                    onClick={() => {
                                        setSelectedCategory(cat);
                                        setMenuLevel('category');
                                    }}
                                >
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </p>
                            ))}
                            <button
                                className="mt-6 text-sm text-gray-500 underline"
                                onClick={() => setMenuLevel('main')}
                            >
                                ← Back
                            </button>
                        </div>
                    )}

                    {/* LEVEL 3 - Category -> Items */}
                    {menuLevel === 'category' && (
                        <div className="flex flex-col gap-4 ">
                            <h3 className="font-['Times_New_Roman',_Times,_serif] text-4xl font-semibold text-[#5c1d75] mt-0 pt-0 mb-4 uppercase">
                                {selectedCategory}
                            </h3>

                            {(selectedWear === 'women' && selectedCategory === 'clothing') && (
                                <>
                                    <p
                                        className="cursor-pointer text-3xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]"
                                        onClick={() => handleRedirect('/women/clothing/anarkalis')}
                                    >
                                        Anarkalis
                                    </p>
                                    <p
                                        className="cursor-pointer text-3xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]"
                                        onClick={() => handleRedirect('/women/clothing/gowns')}
                                    >
                                        Gowns
                                    </p>
                                    <p
                                        className="cursor-pointer text-3xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]"
                                        onClick={() => handleRedirect('/women/clothing/indo-western')}
                                    >
                                        Indo-Western
                                    </p>
                                    <p
                                        className="cursor-pointer text-3xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]"
                                        onClick={() => handleRedirect('/women/clothing/lehengas')}
                                    >
                                        Lehengas
                                    </p>
                                    <p
                                        className="cursor-pointer text-3xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]"
                                        onClick={() => handleRedirect('/women/clothing/sarees-blouses')}
                                    >
                                        Sarees & Blouses
                                    </p>
                                </>

                            )}

                            {(selectedWear === 'women' && selectedCategory === 'accessories') && (
                                <>
                                    <p className="cursor-pointer text-3xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/women/accessories/bags')}>Bags</p>
                                    <p className="cursor-pointer text-3xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/women/accessories/banglesbracelets')}>Bangles & Bracelets</p>
                                    <p className="cursor-pointer text-3xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/women/accessories/earrings')}>Earrings</p>
                                    <p className="cursor-pointer text-3xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/women/accessories/necklaces')}>Necklaces</p>
                                    <p className="cursor-pointer text-3xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/women/accessories/rings')}>Rings</p>
                                </>
                            )}

                            {(selectedWear === 'women' && selectedCategory === 'occasion') && (
                                <>
                                    <p className="cursor-pointer text-3xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/women/occasion/engagement')}>Engagement</p>
                                    <p className="cursor-pointer text-3xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/women/occasion/mehendi')}>Mehendi</p>
                                    <p className="cursor-pointer text-3xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/women/occasion/haldi')}>Haldi</p>
                                    <p className="cursor-pointer text-3xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('women/occasion/sangeet')}>Sangeet</p>
                                    <p className="cursor-pointer text-3xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('women/occasion/cocktail')}>Cocktail</p>
                                    <p className="cursor-pointer text-3xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('women/occasion/wedding')}>Wedding</p>
                                    <p className="cursor-pointer text-3xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('women/occasion/reception')}>Reception</p>
                                </>)}

                            {(selectedWear === 'men' && selectedCategory === 'clothing') && (
                                <>
                                    <p className="cursor-pointer text-3xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('men/clothing/bandhgalas')}>Bandhgalas</p>
                                    <p className="cursor-pointer text-3xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('men/clothing/kurtapajamas')}>Kurta Pajamas</p>
                                    <p className="cursor-pointer text-3xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('men/clothing/indowesterns')}>IndoWesterns</p>
                                    <p className="cursor-pointer text-3xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('men/clothing/suits')}>Suits</p>
                                </>)}

                            {(selectedWear === 'men' && selectedCategory === 'accessories') && (
                                <>
                                    <p className="cursor-pointer text-3xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/men/accessories/ties-bowties')}>Ties & Bow Ties</p>
                                    <p className="cursor-pointer text-3xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/men/accessories/necklaces')}>Necklace</p>
                                </>
                            )}

                            {(selectedWear === 'men' && selectedCategory === 'occasion') && (
                                <>
                                    <p className="cursor-pointer text-3xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/men/occasion/engagement')}>Engagement</p>
                                    <p className="cursor-pointer text-3xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/men/occasion/mehendi')}>Mehendi</p>
                                    <p className="cursor-pointer text-3xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/men/occasion/haldi')}>Haldi</p>
                                    <p className="cursor-pointer text-3xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/men/occasion/sangeet')}>Sangeet</p>
                                    <p className="cursor-pointer text-3xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/men/occasion/cocktail')}>Cocktail</p>
                                    <p className="cursor-pointer text-3xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/men/occasion/wedding')}>Wedding</p>
                                    <p className="cursor-pointer text-3xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/men/occasion/reception')}>Reception</p>
                                </>
                            )}

                            <button
                                className="mt-6 text-sm text-gray-500 underline"
                                onClick={() => setMenuLevel('wear')}
                            >
                                ← Back
                            </button>
                        </div>
                    )}
                </div>
            )}


            <div className="hidden lg:block relative w-full h-[70vh]">
                <img
                    src={img}
                    alt="Wedding Banner"
                    className="w-[90%] h-auto mt-40 pl-40"
                />
                <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-white/85 px-25 py-6 rounded-[10px]">
                    <h1 className="font-['Times_New_Roman',_Times,_serif] text-[2.8rem] font-bold tracking-[0.2rem] text-[#705578] m-0">
                        WedsWardrobe
                    </h1>
                    <p className="text-[1.4rem] font-medium tracking-[0.1rem] mt-2 text-[#444444]">
                        Style. Smile. Send Back.
                    </p>
                </div>
            </div>


            <div className="block lg:hidden relative w-full h-auto  ">
                <img
                    src={img}
                    alt="Header Background"
                    className="w-[95%] pl-9 mt-14"
                />
                <div className="absolute bottom-8 left-6 right-6 px-6 py-4 text-center bg-white/85 rounded-[10px] ">
                    <h1 className="text-[1.5rem] font-serif font-bold text-[#705578]">
                        WedsWardrobe
                    </h1>
                    <p className=" text-[1.2rem] mt-2 text-[#444444]">
                        Style. Smile. Send Back.
                    </p>
                </div>
            </div>

            {showSearch && <SearchOverlay onClose={() => setShowSearch(false)} />
            }
            {showCart && <CartDrawer onClose={() => setShowCart(false)} />}



        </>
    )
}

export default Header
