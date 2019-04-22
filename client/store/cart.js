import axios from 'axios'

const GET_CART_ITEMS = 'GET_CART_ITEMS'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

const getCartItems = cartItems => ({
  type: GET_CART_ITEMS,
  cartItems
})

export const getCartItemsThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cart')
    dispatch(getCartItems(data))
  } catch (error) {
    console.error(error)
  }
}

const initialState = {
  cart: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART_ITEMS:
      return {...state, cart: action.cartItems}
    default:
      return state
  }
}
