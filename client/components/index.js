/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as AllProducts} from './all-products'
export {default as SingleProduct} from './single-product'
export {default as AllProductsByType} from './all-products-by-type'
export {default as FeaturedProducts} from './featured';
export {default as Cart} from './cart';
export {default as Receipt} from './receipt';
