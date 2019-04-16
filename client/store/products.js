import axios from 'axios'

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

const getAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
})

const getSingleProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  product
})

export const getAllProductsThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(getAllProducts(data))
  } catch (error) {
    console.error(error)
  }
}

export const getSingleProductThunk = (itemType, id) => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${itemType}/${id}`)
    dispatch(getSingleProduct(data))
  } catch (error) {
    console.error(error)
  }
}

const initialState = {
  products: [],
  singleProduct: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {...state, products: action.products}
    case GET_SINGLE_PRODUCT:
      return {...state, singleProduct: action.product}
    default:
      return state
  }
}
