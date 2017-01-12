const routes = [
  {
    path: '/Login',
    name: 'LoginSocial',
    component: require('./views/LoginSocial')
  },
  {
    path: '/FamilyMember',
    name: 'familyMember',
    component: require('./views/FamilyMemberSocial')
  },
  {
    path: '/GeneQuestion',
    name: 'GeneQuestion',
    component: require('./views/GeneQuestion')
  },
  {
    path: '/EnvironmentQuestion',
    name: 'EnvironmentQuestion',
    component: require('./views/EnvironmentQuestion')
  },
  {
    path: '/FinishPage',
    name: 'FinishPage',
    component: require('./views/FinishPage')
  },
  {
    path: '/ResultShow',
    name: 'ResultShow',
    component: require('./views/ResultShow')
  },
  {
    path: '/Protocol',
    name: 'Protocol',
    component: require('./views/ProtocolSocial')
  },
  {
    path: '*',
    redirect: {
      name: 'LoginSocial'
    }
  }
];

module.exports = routes;

