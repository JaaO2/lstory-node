'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Groups', [
      {
        name: "Użytkownik",
        color: "000000",
        order: 100,
      },
      {
        name: "Administrator Główny",
        color: "ff0000",
        order: 1
      },
      {
        name: "Administrator, Developer",
        color: "ff6348",
        order: 2,
      },
      {
        name: "Administrator, Develop Manager",
        color: "ff6348",
        order: 3,
      },
      {
        name: "Administrator, Marketing Manager",
        color: "ff6348",
        order: 4,
      },
      {
        name: "Administrator, Community Manager",
        color: "ff6348",
        order: 5,
      },
      {
        name: "Develop Consultant",
        color: "8a1484",
        order: 6,
      },
      {
        name: "Młodszy Administrator",
        color: "eccc68",
        order: 7,
      }, 
      {
        name: "Starszy Moderator",
        color: "0088cc",
        order: 8,
      },
      {
        name: "Moderator",
        color: "00cc00",
        order: 9
      }, 
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
