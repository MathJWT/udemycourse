'use strict';
const bcrypt = require("bcrypt");
module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('users', 
        [   
            {
                "name": "12345",
                "email": "12345",
                "password": bcrypt.hashSync('12345', 8),
                "age": 18
            },
            {
            
                "name": "Rafael Fidelis",
                "email": "rafael.fidelis@amigoapp.com.br",
                "password": bcrypt.hashSync('12345', 8),
                "age": 18
            },
            {
                "name": "Marcos André",
                "email": "marcos.andre@amigoapp.com.br",
                "password": bcrypt.hashSync('12345', 8),
                "age": 18
            },
                {            
                "name": "Matheus Ribeiro",
                "email": "matheus.ribeiro@amigoapp.com.br",
                "password": bcrypt.hashSync('12345', 8),
                "age": 17
            },{            
                "name": "Fernando Rafael",
                "email": "fer.rafael@amigoapp.com.br",
                "password": bcrypt.hashSync('12345', 8),
                "age": 21
            }	
        ], 
      {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
