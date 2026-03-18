import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';



// General Pages
import Home from './pages/Home';
import ProductDisplay from './pages/ProductDisplay/ProductDisplay';
import GenderRedirect from './pages/GenderRedirect';
import MyAccount from './pages/UserDashboard/Dashboard';
import Profile from './pages/UserDashboard/Profile';
import Address from './pages/UserDashboard/Address';
import Orders from './pages/UserDashboard/Orders';


import ViewBag from './pages/ViewBag/ViewBag';
import OrderSummary from './pages/OrderSummary/OrderSummary';

// Men
// Men Accessories
import MenTiesBowTies from './pages/Men/Accessories/TiesBowTies';
import MenNecklace from './pages/Men/Accessories/Necklaces';

// Men clothing
import Bandhgalas from './pages/Men/Clothing/Bandhgalas';
import KurtaPajamas from './pages/Men/Clothing/KurtaPajamas';
import Suits from './pages/Men/Clothing/Suits';
import IndoWesterns from './pages/Men/Clothing/IndoWesterns';

// Men Occasions
import MenEngagement from './pages/Men/Occasions/Engagement';
import MenCocktail from './pages/Men/Occasions/Cocktail';
import MenHaldi from './pages/Men/Occasions/Haldi';
import MenMehendi from './pages/Men/Occasions/Mehendi';
import MenReception from './pages/Men/Occasions/Reception';
import MenSangeet from './pages/Men/Occasions/Sangeet';
import MenWedding from './pages/Men/Occasions/Wedding';


// Women
// Women Accessories
import WomenBags from './pages/Women/Accessories/Bags';
import WomenBanglesBracelets from './pages/Women/Accessories/BanglesBracelets'
import WomenEarrings from './pages/Women/Accessories/Earrings';
import WomenNecklaces from './pages/Women/Accessories/Necklaces';
import WomenRings from './pages/Women/Accessories/Rings';

// Women clothing
import WomenLehengas from './pages/Women/Clothing/Lehengas';
import WomenGowns from './pages/Women/Clothing/Gowns';
import WomenSareesBlouses from './pages/Women/Clothing/SareesBlouses';
import WomenIndoWestern from './pages/Women/Clothing/IndoWestern';
import WomenAnarkali from './pages/Women/Clothing/Anarkalis';


// Women Occasions
import WomenCocktail from './pages/Women/WomenOccasions/Cocktail';
import WomenEngagement from './pages/Women/WomenOccasions/Engagement';
import WomenHaldi from './pages/Women/WomenOccasions/Haldi';
import WomenMehendi from './pages/Women/WomenOccasions/Mehendi';
import WomenReception from './pages/Women/WomenOccasions/Reception';
import WomenSangeet from './pages/Women/WomenOccasions/Sangeet';
import WomenWedding from './pages/Women/WomenOccasions/Wedding';


//authentication
import LoginPage from './pages/LoginPage/Login';
import SignupPage from './pages/SignupPage/Signup';
import ResetPassword from './pages/ResetPassword';


//about us section
import CompanyProfile from './pages/FooterSection/CompanyProfile/CompanyProfile';
import ContactUs from './pages/FooterSection/ContactUs/Contactus';
import Faqs from './pages/FooterSection/Faqs/Faqs';
import PrivacyPolicies from './pages/FooterSection/PrivacyPolicies/PrivacyPolicies';
import TermsAndConditions from './pages/FooterSection/TermsAndConditions/TermsAndConditions';



const App = () => {

  return (
    <Routes>
      {/* General Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/productDisplay" element={<ProductDisplay />} />
      <Route path="/women" element={<GenderRedirect />} />
      <Route path="/men" element={<GenderRedirect />} />

      <Route path="/myaccount" element={<MyAccount />}>
        <Route path="profile" element={<Profile />} />
        <Route path="address" element={<Address />} />
        <Route path="orders" element={<Orders />} />
      </Route>


      <Route path='/viewbag' element={<ViewBag />} />
      <Route path='/ordersummary' element={<OrderSummary />} />



      {/* footer link */}
      <Route path='/companyprofile' element={<CompanyProfile />} />
      <Route path='/contactus' element={<ContactUs />} />
      <Route path='/faqs' element={<Faqs />} />
      <Route path='/privacypolicies' element={<PrivacyPolicies />} />
      <Route path='/termsandconditions' element={<TermsAndConditions />} />


      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/resetpassword' element={<ResetPassword />} />


      {/* Men's Routes */}
      {/* Men's clothing */}
      <Route path="/men/clothing/bandhgalas" element={<Bandhgalas />} />
      <Route path="/men/clothing/Kurtapajamas" element={<KurtaPajamas />} />
      <Route path="/men/clothing/suits" element={<Suits />} />
      <Route path='/men/clothing/indowesterns' element={<IndoWesterns />} />;


      {/* Men's Accessories */}
      <Route path="/men/accessories/ties-bowties" element={<MenTiesBowTies />} />
      <Route path="/men/accessories/necklaces" element={<MenNecklace />} />

      {/* Men's Occasions */}
      <Route path="/men/occasion/engagement" element={<MenEngagement />} />
      <Route path="/men/occasion/cocktail" element={<MenCocktail />} />
      <Route path="/men/occasion/haldi" element={<MenHaldi />} />
      <Route path="/men/occasion/mehendi" element={<MenMehendi />} />
      <Route path="/men/occasion/reception" element={<MenReception />} />
      <Route path="/men/occasion/sangeet" element={<MenSangeet />} />
      <Route path="/men/occasion/wedding" element={<MenWedding />} />


      {/* Women's Routes */}
      {/* Women's clothing */}
      <Route path="/women/clothing/lehengas" element={<WomenLehengas />} />
      <Route path="/women/clothing/gowns" element={<WomenGowns />} />
      <Route path="/women/clothing/sarees-blouses" element={<WomenSareesBlouses />} />
      <Route path="/women/clothing/indo-western" element={<WomenIndoWestern />} />
      <Route path="/women/clothing/anarkalis" element={<WomenAnarkali />} />


      {/* Women's Accessories */}
      <Route path="/women/accessories/bags" element={<WomenBags />} />
      <Route path="/women/accessories/banglesbracelets" element={<WomenBanglesBracelets />} />
      <Route path="/women/accessories/earrings" element={<WomenEarrings />} />
      <Route path="/women/accessories/necklaces" element={<WomenNecklaces />} />
      <Route path="/women/accessories/rings" element={<WomenRings />} />


      {/* Women's Occasions */}
      <Route path="/women/occasion/cocktail" element={<WomenCocktail />} />
      <Route path="/women/occasion/engagement" element={<WomenEngagement />} />
      <Route path="/women/occasion/haldi" element={<WomenHaldi />} />
      <Route path="/women/occasion/mehendi" element={<WomenMehendi />} />
      <Route path="/women/occasion/reception" element={<WomenReception />} />
      <Route path="/women/occasion/sangeet" element={<WomenSangeet />} />
      <Route path="/women/occasion/wedding" element={<WomenWedding />} />


    </Routes>
  );
}

export default App;