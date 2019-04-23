/* global describe beforeEach afterEach it */
import {expect} from 'chai'
import {getCartItemsThunk} from './cart'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe(' Cart thunk creators', () => {
  let store
  let mockAxios

  const initialState = {cart: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getCartItemsThunk', () => {
    it('eventually dispatches the GET CART ITEMS action', async () => {
      const fakeCart = [
        {
          id: 11,
          name: 'Passion Flower Seeds',
          price: 111,
          imgUrl: '/images/product/seedling.jpg'
        }
      ]
      mockAxios.onGet('/api/cart').replyOnce(200, fakeCart)
      await store.dispatch(getCartItemsThunk())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_CART_ITEMS')
      expect(actions[0].cartItems).to.be.deep.equal(fakeCart)
    })
  })
})
