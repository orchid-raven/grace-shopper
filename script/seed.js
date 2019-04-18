'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Product} = require('../server/db/models');
const {Order} = require('../server/db/models');
const {OrderProduct} = require('../server/db/models');

const encoding = "Passion Flower:1744:flower:TRUE:Passion-Flower.jpg/Gazania:1105:flower:TRUE:Gazania.jpg/Plumeria:842:flower:TRUE:Plumeria.jpg/Chrysanthemum:1722:flower:FALSE:Chrysanthemum.jpg/Dahlia:1721:flower:FALSE:Dahlia.jpg/Orchids:1869:flower:FALSE:Orchids.jpg/Lotus Flower:743:flower:FALSE:Lotus-Flower.jpg/Tulip:1054:flower:FALSE:Tulip.jpg/Magnolia:1968:flower:FALSE:Magnolia.jpg/Bird Of Paradise:524:flower:FALSE:Bird-Of-Paradise.jpg/Passion Flower:200:seed:FALSE:Seedling.jpg/Gazania:39:seed:FALSE:Seedling.jpg/Plumeria:198:seed:FALSE:Seedling.jpg/Chrysanthemum:196:seed:FALSE:Seedling.jpg/Dahlia:57:seed:FALSE:Seedling.jpg/Orchids:162:seed:FALSE:Seedling.jpg/Lotus Flower:146:seed:FALSE:Seedling.jpg/Tulip:44:seed:FALSE:Seedling.jpg/Magnolia:54:seed:FALSE:Seedling.jpg/Bird Of Paradise:159:seed:FALSE:Seedling.jpg/Flower Pot:909:pot:FALSE:Flower-Pot1.jpg/Onyx Flower Pot:479:pot:TRUE:Onyx-Flower-Pot.jpg/Gardening Hose:3920:gardening equipment:FALSE:Gardening-Hose.jpg/Gardening Gloves:2280:gardening equipment:FALSE:Gardening-Gloves.jpg/Tilling Set:1210:gardening equipment:TRUE:Tilling-Set.jpg/Shear:3611:gardening equipment:FALSE:Shear.jpeg/Wheel Barrel:2358:gardening equipment:FALSE:Wheel-Barrel.jpeg";

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ]);

  const loadProducts = Product.loadSeed(encoding);
  for(let i = 0; i < loadProducts.length; i++) {
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
