import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GenderRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/', { replace: true }); // Redirect to Home
    }, [navigate]);

    return null;
};

export default GenderRedirect;
