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
                "age": 17
            },
            {
                "name": "Marcos André",
                "email": "marcos.andre@amigoapp.com.br",
                "password": bcrypt.hashSync('12345', 8),
                "age": 6
            },
                {            
                "name": "Matheus Ribeiro",
                "email": "matheus.ribeiro@amigoapp.com.br",
                "password": bcrypt.hashSync('12345', 8),
                "age": 65
            },{            
                "name": "Marcos Rafael",
                "email": "fer.rafael@amigoapp.com.br",
                "password": bcrypt.hashSync('12345', 8),
                "age": 32
            }
            ,{            
                "name": "Alexandre Rafael",
                "email": "ake.rafael@amigoapp.com.br",
                "password": bcrypt.hashSync('12345', 8),
                "age": 11
            }	,{            
                "name": "Bob Rafael",
                "email": "bob.rafael@amigoapp.com.br",
                "password": bcrypt.hashSync('12345', 8),
                "age": 77
            }	,{            
                "name": "Heitor Rafael",
                "email": "heitor.rafael@amigoapp.com.br",
                "password": bcrypt.hashSync('12345', 8),
                "age": 3
            }	,{            
                "name": "luan Rafael",
                "email": "lu.rafael@amigoapp.com.br",
                "password": bcrypt.hashSync('12345', 8),
                "age": 11
            }	,{            
                "name": "lara Rafael",
                "email": "fer.rafael@amigoapp.com.br",
                "password": bcrypt.hashSync('12345', 8),
                "age": 55
            }	,{            
                "name": "Orlando Rafael",
                "email": "orlandorafael@amigoapp.com.br",
                "password": bcrypt.hashSync('12345', 8),
                "age": 21
            }	,{            
                "name": "Miniat Rafael",
                "email": "ni.rafael@amigoapp.com.br",
                "password": bcrypt.hashSync('12345', 8),
                "age": 23
            }	,{            
                "name": "Lo Mael",
                "email": "a.loel@amigoapp.com.br",
                "password": bcrypt.hashSync('12345', 8),
                "age": 2
            }	
        ], 
      {});
  },

  down: (queryInterface, Sequelize) => {
  
      return queryInterface.bulkDelete('users', null, {});
  }
};
