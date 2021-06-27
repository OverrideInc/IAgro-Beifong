const User = require('../../models/User');
const resources = require('../../constants/resources');
const actions = require('../../constants/actions');

const rolePermissionsMapping = {
  [`${User.validUserTypes.ADMIN}`]: {
    [`${resources.USERS}`]: Object.values(actions),
    [`${resources.CUSTOMERS}`]: Object.values(actions),
  },
  [`${User.validUserTypes.MANAGER}`]: {
    [`${resources.USERS}`]: Object.values(actions).filter(
      (action) => action !== actions.DELETE
    ),
  },
  [`${User.validUserTypes.TERRA}`]: {
    [`${resources.USERS}`]: [actions.LOGIN],
  },
};

module.exports = (role, resource, action) => {
  const resourceActionMapping = rolePermissionsMapping[role][resource];

  return (resourceActionMapping || []).includes(action);
};
