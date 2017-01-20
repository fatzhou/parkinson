const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: require('./patientviews/Login')
  },
  {
    path: '/PatientInfo',
    name: 'patientInfo',
    component: require('./patientviews/PatientInfo')
  },
  {
    path: '/SickStatus',
    name: 'sickStatus',
    component: require('./patientviews/SickStatus')
  },
  {
    path: '/DrugStatus',
    name: 'drugStatus',
    component: require('./patientviews/DrugStatus')
  },
  {
    path: '/FamilyMember',
    name: 'familyMember',
    component: require('./patientviews/FamilyMember')
  },
  {
    path: '/GeneQuestion',
    name: 'GeneQuestion',
    component: require('./patientviews/GeneQuestion')
  },
  {
    path: '/GeneTested',
    name: 'GeneTested',
    component: require('./patientviews/GeneTested')
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
    component: require('./patientviews/Protocol')
  },
  {
    path: '/FamilyMemberAdd',
    name: 'FamilyMemberAdd',
    component: require('./patientviews/FamilyMemberAdd')
  },
  {
    path: '*',
    redirect: {
      name: 'Login'
    }
  }
];

module.exports = routes;

