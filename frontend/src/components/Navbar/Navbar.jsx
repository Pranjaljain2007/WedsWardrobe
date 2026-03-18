import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SearchOverlay from '../SearchOverlay/SearchOverlay';
import CartDrawer from '../SideCart/CartDrawer';
import { CartContext } from '../CartContext/CartContext';
import { getAuth } from "firebase/auth";

const Navbar = () => {
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
        // else if (path === '/login') setShowCart(true);
        else navigate(path);
    };

    return (
        <>

            <div className="w-full bg-white/95 justify-between items-center px-16 py-3.5 shadow-md sticky top-0 z-[100] hidden lg:flex">
                <div className="text-[25px] font-['Times_New_Roman',_Times,_serif] font-bold text-[#603969]">
                    WedsWardrobe
                </div>

                <div className="flex gap-12">

                    {/* WomenWear */}
                    <div className="relative group">
                        <span className="text-[1.1rem] font-['Times_New_Roman',_Times,_serif] text-[#5d2e72] font-bold uppercase cursor-pointer">
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
                        <span className="text-[1.1rem] font-['Times_New_Roman',_Times,_serif] text-[#5d2e72] font-bold uppercase cursor-pointer">
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
                <div className="flex items-center gap-5 pr-[5vw] py-2">
                    <i className="fas fa-search text-[20px] text-[#5d356d] hover:text-[#888] cursor-pointer" onClick={() => handleRedirect('/search')} title="Search"></i>


                    <i
                        className="far fa-user text-[20px] text-[#5d356d] hover:text-[#888] cursor-pointer"
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
                        <i className="fas fa-shopping-bag text-[20px] text-[#5d356d] hover:text-[#888] cursor-pointer" title="Cart"></i>
                        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                    </Link>

                </div>



            </div>



            {/* Mobile Navbar - visible only on small screens */}
            <div className="w-full bg-white/95 flex justify-between items-center px-8 py-5 shadow-md sticky top-0 z-[100] lg:hidden">

                <i className="fas fa-bars text-xl text-[#5d356d] cursor-pointer" onClick={() => {
                    setMobileMenuOpen(true);
                    setMenuLevel('main');
                }}></i>

                {/* Brand Name */}
                <span className=" font-['Times_New_Roman',_Times,_serif] text-3xl font-bold text-[#603969]">
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
            </div>


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
                                className="font-['Times_New_Roman',_Times,_serif] text-3xl text-[#5d2e72] uppercase font-semibold cursor-pointer"
                                onClick={() => {
                                    setMenuLevel('wear');
                                    setSelectedWear('women');
                                }}
                            >
                                WomenWear
                            </p>
                            <p
                                className="font-['Times_New_Roman',_Times,_serif] text-3xl text-[#5d2e72] uppercase font-semibold cursor-pointer"
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
                            <h2 className="font-['Times_New_Roman',_Times,_serif] text-3xl font-semibold uppercase text-[#5c1d75] mb-4">Categories</h2>
                            {['clothing', 'accessories', 'occasion'].map((cat) => (
                                <p
                                    key={cat}
                                    className="text-2xl text-[#504f4f] uppercase cursor-pointer hover:text-[#63456f] hover:underline underline-offset-4"

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
                            <h3 className="text-3xl font-semibold text-[#5c1d75] mt-0 pt-0 mb-4 uppercase">
                                {selectedCategory}
                            </h3>

                            {(selectedWear === 'women' && selectedCategory === 'clothing') && (
                                <>
                                    <p
                                        className="cursor-pointer text-2xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]"
                                        onClick={() => handleRedirect('/women/clothing/anarkalis')}
                                    >
                                        Anarkalis
                                    </p>
                                    <p
                                        className="cursor-pointer text-2xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/women/clothing/gowns')} >
                                        Gowns
                                    </p>
                                    <p
                                        className="cursor-pointer text-2xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/women/clothing/indo-western')}  >
                                        Indo-Western
                                    </p>
                                    <p
                                        className="cursor-pointer text-2xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]"
                                        onClick={() => handleRedirect('/women/clothing/lehengas')}
                                    >
                                        Lehengas
                                    </p>
                                    <p
                                        className="cursor-pointer text-2xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/women/clothing/sarees-blouses')} >
                                        Sarees & Blouses
                                    </p>
                                </>

                            )}

                            {(selectedWear === 'women' && selectedCategory === 'accessories') && (
                                <>
                                    <p className="cursor-pointer text-2xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/women/accessories/bags')}>Bags</p>
                                    <p className="cursor-pointer text-2xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/women/accessories/banglesbracelets')}>Bangles & Bracelets</p>
                                    <p className="cursor-pointer text-2xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/women/accessories/earrings')}>Earrings</p>
                                    <p className="cursor-pointer text-2xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/women/accessories/necklaces')}>Necklaces</p>
                                    <p className="cursor-pointer text-2xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/women/accessories/rings')}>Rings</p>
                                </>
                            )}

                            {(selectedWear === 'women' && selectedCategory === 'occasion') && (
                                <>
                                    <p className="cursor-pointer text-2xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/women/occasion/engagement')}>Engagement</p>
                                    <p className="cursor-pointer text-2xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/women/occasion/mehendi')}>Mehendi</p>
                                    <p className="cursor-pointer text-2xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/women/occasion/haldi')}>Haldi</p>
                                    <p className="cursor-pointer text-2xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/women/occasion/sangeet')}>Sangeet</p>
                                    <p className="cursor-pointer text-2xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/women/occasion/cocktail')}>Cocktail</p>
                                    <p className="cursor-pointer text-2xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/women/occasion/wedding')}>Wedding</p>
                                    <p className="cursor-pointer text-2xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/women/occasion/reception')}>Reception</p>
                                </>
                            )}

                            {(selectedWear === 'men' && selectedCategory === 'clothing') && (
                                <>
                                    <p className="cursor-pointer text-2xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/men/clothing/bandhgalas')}>Bandhgalas</p>
                                    <p className="cursor-pointer text-2xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/men/clothing/kurtapajamas')}>Kurta Pajamas</p>
                                    <p className="cursor-pointer text-2xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/men/clothing/indowesterns')}>IndoWesterns</p>
                                    <p className="cursor-pointer text-2xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/men/clothing/suits')}>Suits</p>
                                </>
                            )}

                            {(selectedWear === 'men' && selectedCategory === 'accessories') && (
                                <>
                                    <p className="cursor-pointer text-2xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/men/accessories/ties-bowties')}>Ties & Bow Ties</p>
                                    <p className="cursor-pointer text-2xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/men/accessories/necklaces')}>Necklace</p>
                                </>
                            )}

                            {(selectedWear === 'men' && selectedCategory === 'occasion') && (
                                <>
                                    <p className="cursor-pointer text-2xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/men/occasion/engagement')}>Engagement</p>
                                    <p className="cursor-pointer text-2xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/men/occasion/mehendi')}>Mehendi</p>
                                    <p className="cursor-pointer text-2xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/men/occasion/haldi')}>Haldi</p>
                                    <p className="cursor-pointer text-2xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/men/occasion/sangeet')}>Sangeet</p>
                                    <p className="cursor-pointer text-2xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/men/occasion/cocktail')}>Cocktail</p>
                                    <p className="cursor-pointer text-2xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/men/occasion/wedding')}>Wedding</p>
                                    <p className="cursor-pointer text-2xl uppercase hover:underline underline-offset-4 text-[#504f4f] hover:text-[#63456f]" onClick={() => handleRedirect('/men/occasion/reception')}>Reception</p>
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

            {showSearch && <SearchOverlay onClose={() => setShowSearch(false)} />
            }
            {showCart && <CartDrawer onClose={() => setShowCart(false)} />}

        </>
    );
};

export default Navbar;


