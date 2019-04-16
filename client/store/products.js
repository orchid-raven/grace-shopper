import axios from 'axios'

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const GET_ALL_PRODUCTS_BY_TYPE = 'GET_ALL_PRODUCTS_BY_TYPE'
const GET_FEATURED_PRODUCTS = 'GET_FEATURED_PRODUCTS'

const getAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
})

const getAllProductsByType = products => ({
  type: GET_ALL_PRODUCTS_BY_TYPE,
  products
})

const getFeaturedProducts = products => ({
  type: GET_FEATURED_PRODUCTS,
  products
})

export const getAllProductsThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(getAllProducts(data))
  } catch (error) {
    console.error(error)
  }
}

export const getAllProductsByTypeThunk = itemType => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${itemType}`)
    dispatch(getAllProductsByType(data))
  } catch (error) {
    console.error(error)
  }
}

export const getFeaturedProductsThunk  = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products/featured');
    dispatch(getFeaturedProducts(data));
  } catch (error) {
    console.error(error);
  }
}

const initialState = {
  products: [],
  productsByType: [],
  featuredProducts: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {...state, products: action.products}
    case GET_ALL_PRODUCTS_BY_TYPE:
      return {...state, productsByType: action.products}
    case GET_FEATURED_PRODUCTS:
      return {...state, featuredProducts: action.products}
    default:
      return state
  }
}
