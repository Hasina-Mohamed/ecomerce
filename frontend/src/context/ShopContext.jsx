import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    // Load from LocalStorage on mount (optional but nice for persistence)
    useEffect(() => {
        const storedUser = localStorage.getItem('luxe_user');
        const storedCart = localStorage.getItem('luxe_cart');
        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedCart) setCart(JSON.parse(storedCart));
    }, []);

    // Save to LocalStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('luxe_cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        if (user) {
            localStorage.setItem('luxe_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('luxe_user');
        }
    }, [user]);


    const login = async (email, password) => {
        try {
            const { data } = await api.post('/auth/login', { email, password });
            setUser(data);
            // Redirect based on user role
            if (data.isAdmin) {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error("Login failed", error);
            alert("Invalid email or password");
        }
    };

    const logout = () => {
        setUser(null);
        setCart([]); // innovative: clear cart on logout
        localStorage.removeItem('luxe_user');
        localStorage.removeItem('luxe_cart');
        navigate('/login');
    };

    const addToCart = (product, quantity = 1, size = 'M', color = 'green') => {
        if (!user) {
            alert("Please login to add items to cart.");
            navigate('/login');
            return;
        }
        setCart(prevCart => {
            // Check if item already exists with exact same options
            const existingItemIndex = prevCart.findIndex(item =>
                item.id === product.id && item.size === size && item.color === color
            );

            if (existingItemIndex > -1) {
                // Update quantity
                const newCart = [...prevCart];
                newCart[existingItemIndex].quantity += quantity;
                return newCart;
            } else {
                // Add new item
                return [...prevCart, { ...product, quantity, size, color }];
            }
        });
    };

    const removeFromCart = (itemId, size, color) => {
        setCart(prevCart => prevCart.filter(item => !(item.id === itemId && item.size === size && item.color === color)));
    }

    const getCartCount = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    }


    return (
        <ShopContext.Provider value={{ user, login, logout, cart, addToCart, removeFromCart, getCartCount }}>
            {children}
        </ShopContext.Provider>
    );
};
