import axios from 'axios'

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const GET_ALL_PRODUCTS_BY_TYPE = 'GET_ALL_PRODUCTS_BY_TYPE'

const getAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
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

export const getAllProductsByTypeThunk = itemType => async dispatch => {
  try {
    console.log('REDUX ITEM TYPE: ', `${itemType}`)
    const {data} = await axios.get(`/api/products/${itemType}`)
    console.log('DATA: ', data)
    dispatch(getAllProductsByType(data))
  } catch (error) {
    console.error(error)
  }
}

const initialState = {
  products: [],
  productsByType: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {...state, products: action.products}
    case GET_ALL_PRODUCTS_BY_TYPE:
      return {...state, productsByType: action.products}
    default:
      return state
  }
}
