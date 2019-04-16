import axios from 'axios'

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const GET_ALL_PRODUCTS_BY_TYPE = 'GET_ALL_PRODUCTS_BY_TYPE'

const getAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
})

const getSingleProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  product
})
const getAllProductsByType = products => ({
  type: GET_ALL_PRODUCTS_BY_TYPE,
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

export const getSingleProductThunk = (itemType, id) => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${itemType}/${id}`)
    dispatch(getSingleProduct(data))
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

const initialState = {
  products: [],
  singleProduct: {},
  productsByType: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {...state, products: action.products}
    case GET_SINGLE_PRODUCT:
      return {...state, singleProduct: action.product}
    case GET_ALL_PRODUCTS_BY_TYPE:
      return {...state, productsByType: action.products}
    default:
      return state
  }
}
