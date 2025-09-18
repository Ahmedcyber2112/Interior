"use client";
import { createContext, useContext, useReducer, useEffect } from "react";

// Context للعربة
const CartContext = createContext();

// Context للمصادقة
const AuthContext = createContext();

// Context للقائمة المفضلة
const WishlistContext = createContext();

// Actions للعربة
const CART_ACTIONS = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  CLEAR_CART: "CLEAR_CART",
};

// Actions للمصادقة
const AUTH_ACTIONS = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  SET_USER: "SET_USER",
};

// Actions للقائمة المفضلة
const WISHLIST_ACTIONS = {
  ADD_TO_WISHLIST: "ADD_TO_WISHLIST",
  REMOVE_FROM_WISHLIST: "REMOVE_FROM_WISHLIST",
  CLEAR_WISHLIST: "CLEAR_WISHLIST",
};

// Cart Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_TO_CART:
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }],
      };

    case CART_ACTIONS.REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };

    case CART_ACTIONS.UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
};

// Auth Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

// Wishlist Reducer
const wishlistReducer = (state, action) => {
  switch (action.type) {
    case WISHLIST_ACTIONS.ADD_TO_WISHLIST:
      const existingWishItem = state.items.find(item => item.id === action.payload.id);
      if (existingWishItem) {
        return state;
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case WISHLIST_ACTIONS.REMOVE_FROM_WISHLIST:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };

    case WISHLIST_ACTIONS.CLEAR_WISHLIST:
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
};

// Provider Component
export const AppProvider = ({ children }) => {
  // حالة العربة
  const [cartState, cartDispatch] = useReducer(cartReducer, {
    items: [],
  });

  // حالة المصادقة
  const [authState, authDispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    user: null,
  });

  // حالة القائمة المفضلة
  const [wishlistState, wishlistDispatch] = useReducer(wishlistReducer, {
    items: [],
  });

  // تحميل البيانات من localStorage عند بدء التطبيق
  useEffect(() => {
    // تحميل بيانات العربة
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const cartData = JSON.parse(savedCart);
      cartData.items.forEach(item => {
        cartDispatch({ type: CART_ACTIONS.ADD_TO_CART, payload: item });
      });
    }

    // تحميل بيانات المصادقة
    const savedAuth = localStorage.getItem("auth");
    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      if (authData.isAuthenticated) {
        authDispatch({ type: AUTH_ACTIONS.LOGIN, payload: authData.user });
      }
    }

    // تحميل بيانات القائمة المفضلة
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      const wishlistData = JSON.parse(savedWishlist);
      wishlistData.items.forEach(item => {
        wishlistDispatch({ type: WISHLIST_ACTIONS.ADD_TO_WISHLIST, payload: item });
      });
    }
  }, []);

  // حفظ البيانات في localStorage عند تغيير الحالة
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartState));
  }, [cartState]);

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(authState));
  }, [authState]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistState));
  }, [wishlistState]);

  // Cart Functions
  const addToCart = (product) => {
    cartDispatch({ type: CART_ACTIONS.ADD_TO_CART, payload: product });
  };

  const removeFromCart = (productId) => {
    cartDispatch({ type: CART_ACTIONS.REMOVE_FROM_CART, payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      cartDispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id: productId, quantity } });
    }
  };

  const clearCart = () => {
    cartDispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const getCartTotal = () => {
    return cartState.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cartState.items.reduce((total, item) => total + item.quantity, 0);
  };

  // Auth Functions
  const login = (userData) => {
    authDispatch({ type: AUTH_ACTIONS.LOGIN, payload: userData });
  };

  const logout = () => {
    authDispatch({ type: AUTH_ACTIONS.LOGOUT });
    clearCart();
    clearWishlist();
  };

  // Wishlist Functions
  const addToWishlist = (product) => {
    wishlistDispatch({ type: WISHLIST_ACTIONS.ADD_TO_WISHLIST, payload: product });
  };

  const removeFromWishlist = (productId) => {
    wishlistDispatch({ type: WISHLIST_ACTIONS.REMOVE_FROM_WISHLIST, payload: productId });
  };

  const clearWishlist = () => {
    wishlistDispatch({ type: WISHLIST_ACTIONS.CLEAR_WISHLIST });
  };

  const isInWishlist = (productId) => {
    return wishlistState.items.some(item => item.id === productId);
  };

  const cartValue = {
    ...cartState,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
  };

  const authValue = {
    ...authState,
    login,
    logout,
  };

  const wishlistValue = {
    ...wishlistState,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
  };

  return (
    <AuthContext.Provider value={authValue}>
      <CartContext.Provider value={cartValue}>
        <WishlistContext.Provider value={wishlistValue}>
          {children}
        </WishlistContext.Provider>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
};

// Custom Hooks
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within an AppProvider");
  }
  return context;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AppProvider");
  }
  return context;
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within an AppProvider");
  }
  return context;
};