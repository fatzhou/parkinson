const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: require('./views/Login')
  },
  {
    path: '/PatientInfo',
    name: 'patientInfo',
    component: require('./views/PatientInfo')
  },
  {
    path: '/SickStatus',
    name: 'sickStatus',
    component: require('./views/SickStatus')
  },
  {
    path: '/DrugStatus',
    name: 'drugStatus',
    component: require('./views/DrugStatus')
  },
  {
    path: '/FamilyMember',
    name: 'familyMember',
    component: require('./views/FamilyMember')
  },
  {
    path: '/GeneQuestion',
    name: 'GeneQuestion',
    component: require('./views/GeneQuestion')
  },
  {
    path: '/GeneTested',
    name: 'GeneTested',
    component: require('./views/GeneTested')
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
    component: require('./views/Protocol')
  },
  {
    path: '/FamilyMemberAdd',
    name: 'FamilyMemberAdd',
    component: require('./views/FamilyMemberAdd')
  },
  {
    path: '*',
    redirect: {
      name: 'Login'
    }
  }
];

module.exports = routes;

