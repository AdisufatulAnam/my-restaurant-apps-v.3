/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
const assert = require('assert');

// eslint-disable-next-line no-undef
Feature('Liking Restaurants');

// eslint-disable-next-line no-undef
Before(({
  I,
}) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({
  I,
}) => {
  I.see('Tidak ada restaurants untuk ditampilkan', '.movie-item__not__found');
});

Scenario('liking one restaurants', async ({
  I,
}) => {
  I.see('Tidak ada restaurants untuk ditampilkan', '.movie-item__not__found');

  I.amOnPage('/');

  I.seeElement('.movie__title a');

  const firstRestaurant = locate('.movie__title a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.movie-item');
  const likedRestaurantTitle = await I.grabTextFrom('.movie__title');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

// Scenario('searching movies', async ({ I }) => {
//   I.see('Tidak ada film untuk ditampilkan', '.movie-item__not__found');

//   I.amOnPage('/');

//   I.seeElement('.movie__title a');

//   const titles = [];

//   for (let i = 1; i <= 3; i++) {
//     I.click(locate('.movie__title a').at(i));
//     I.seeElement('#likeButton');
//     I.click('#likeButton');
//     titles.push(await I.grabTextFrom('.movie__title'));
//     I.amOnPage('/');
//   }

//   I.amOnPage('/#/like');
//   I.seeElement('#query');

//   const searchQuery = titles[1].substring(1, 3);
//   const matchingMovies = titles.filter((title) => title.indexOf(searchQuery) !== -1);

//   I.fillField('#query', searchQuery);
//   I.pressKey('Enter');

//   const visibleLikedMovies = await I.grabNumberOfVisibleElements('.movie-item');
//   assert.strictEqual(matchingMovies.length, visibleLikedMovies);

//   matchingMovies.forEach(async (title, index) => {
//     const visibleTitle = await I.grabTextFrom(locate('.movie__title').at(index + 1));
//     assert.strictEqual(title, visibleTitle);
//   });
// });