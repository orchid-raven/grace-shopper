'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Product} = require('../server/db/models');

const encoding = "Passion Flower:14.85:flower:TRUE:Passion-Flower.jpg/Gazania:19.33:flower:TRUE:Gazania.jpg/Plumeria:16.79:flower:TRUE:Plumeria.jpg/Chrysanthemum:7.67:flower:FALSE:Chrysanthemum.jpg/Dahlia:18.45:flower:FALSE:Dahlia.jpg/Orchids:16.28:flower:FALSE:Orchids.jpg/Lotus Flower:4.57:flower:FALSE:Lotus-Flower.jpg/Tulip:5.68:flower:FALSE:Tulip.jpg/Magnolia:9.28:flower:FALSE:Magnolia.jpg/Bird Of Paradise:9:flower:FALSE:Bird-Of-Paradise.jpg/Passion Flower:1.12:seed:FALSE:Seedling.jpg/Gazania:1.43:seed:FALSE:Seedling.jpg/Plumeria:1.01:seed:FALSE:Seedling.jpg/Chrysanthemum:1.39:seed:FALSE:Seedling.jpg/Dahlia:1.48:seed:FALSE:Seedling.jpg/Orchids:0.91:seed:FALSE:Seedling.jpg/Lotus Flower:1.03:seed:FALSE:Seedling.jpg/Tulip:1.91:seed:FALSE:Seedling.jpg/Magnolia:1.87:seed:FALSE:Seedling.jpg/Bird Of Paradise:1.68:seed:FALSE:Seedling.jpg/Flower Pot:8.16:pot:FALSE:Flower-Pot1.jpg/Onyx Flower Pot:9.66:pot:TRUE:Onyx-Flower-Pot.jpg/Gardening Hose:11.63:gardening equipment:FALSE:Gardening-Hose.jpg/Gardening Gloves:23.95:gardening equipment:FALSE:Gardening-Gloves.jpg/Tilling Set:16.96:gardening equipment:TRUE:Tilling-Set.jpg/Shear:12.18:gardening equipment:FALSE:Shear.jpg/Wheel Barrel:17.71:gardening equipment:FALSE:Wheel-Barrel.jpg";

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ]);

  const loadProducts = Product.loadSeed(encoding);
  for(let i = 0; i < loadProducts.length; i++) {
    // console.log(`NAME: ${loadProducts[i].name} PRICE: ${loadProducts[i].price} PRODUCT-TYPE: ${loadProducts[i].productType} FEATURED: ${loadProducts[i].featured} IMGURL: ${loadProducts[i].imgUrl}`);
    await Product.create(loadProducts[i]);
  };

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
