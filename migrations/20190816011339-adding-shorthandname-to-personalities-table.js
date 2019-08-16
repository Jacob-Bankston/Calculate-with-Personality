'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'Personalities',
        'shorthandname', { 
            type: Sequelize.STRING 
        }
    )
}, 

down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
        'Personalities', 
        'shorthandname'
    )
}
};
