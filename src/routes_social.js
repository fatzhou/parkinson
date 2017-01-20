const routes = [
  {
    path: '/Login',
    name: 'LoginSocial',
    component: require('./socialviews/LoginSocial')
  },
  {
    path: '/FamilyMember',
    name: 'familyMember',
    component: require('./socialviews/FamilyMemberSocial')
  },
  {
    path: '/GeneTested',
    name: 'GeneTested',
    component: require('./patientviews/GeneTested')
  },
  {
    path: '/GeneQuestion',
    name: 'GeneQuestion',
    component: require('./patientviews/GeneQuestion')
  },
  {
    path: '/EnvironmentQuestion',
    name: 'EnvironmentQuestion',
    component: require('./patientviews/EnvironmentQuestion')
  },
  {
    path: '/FinishPage',
    name: 'FinishPage',
    component: require('./patientviews/FinishPage')
  },
  {
    path: '/ResultShow',
    name: 'ResultShow',
    component: require('./patientviews/ResultShow')
  },
  {
    path: '/Protocol',
    name: 'Protocol',
    component: require('./socialviews/ProtocolSocial')
  },
  {
    path: '*',
    redirect: {
      name: 'LoginSocial'
    }
  }
];

module.exports = routes;

