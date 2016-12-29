const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: require('./components/Login')
  },
  {
    path: '/Admin',
    name: 'Admin',
    component: require('./components/Admin')
  },
  {
    path: '/PatientInfo',
    name: 'patientInfo',
    component: require('./components/PatientInfo')
  },
  {
    path: '/SickStatus',
    name: 'sickStatus',
    component: require('./components/SickStatus')
  },
  {
    path: '/DrugStatus',
    name: 'drugStatus',
    component: require('./components/DrugStatus')
  },
  {
    path: '/FamilyMember',
    name: 'familyMember',
    component: require('./components/FamilyMember')
  },
  {
    path: '/GeneQuestion',
    name: 'GeneQuestion',
    component: require('./components/GeneQuestion')
  },
  {
    path: '/EnvironmentQuestion',
    name: 'EnvironmentQuestion',
    component: require('./components/EnvironmentQuestion')
  },
  {
    path: '/FinishPage',
    name: 'FinishPage',
    component: require('./components/FinishPage')
  },
  {
    path: '/ResultShow',
    name: 'ResultShow',
    component: require('./components/ResultShow')
  },
  {
    path: '/PatientAdmin',
    name: 'PatientAdmin',
    component: require('./components/PatientAdmin')
  },
  {
    path: '/PatientList',
    name: 'PatientList',
    component: require('./components/PatientList')
  },
  {
    path: '*',
    redirect: {
      name: 'Login'
    }
  }
];

module.exports = routes;

