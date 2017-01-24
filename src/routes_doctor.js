const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: require('./doctorviews/LoginDoctor')
  },
  {
    path: '/PatientAdmin',
    name: 'PatientAdmin',
    component: require('./doctorviews/PatientAdmin')
  },
  {
    path: '/PatientList',
    name: 'PatientList',
    component: require('./doctorviews/PatientList')
  },
  {
    path: '/PatientDetail',
    name: 'PatientDetail',
    component: require('./doctorviews/PatientDetail')
  },
  {
    path: '/PatientInfo',
    name: 'PatientInfo',
    component: require('./doctorviews/PatientInfo')
  },
  {
    path: '/SickStatus',
    name: 'SickStatus',
    component: require('./doctorviews/SickStatus')
  },
  {
    path: '/DrugStatus',
    name: 'DrugStatus',
    component: require('./doctorviews/DrugStatus')
  },
  {
    path: '/FamilyList',
    name: 'FamilyList',
    component: require('./doctorviews/FamilyList')
  },
  {
    path: '/FamilyMember',
    name: 'FamilyMember',
    component: require('./doctorviews/FamilyMember')
  },
  {
    path: '/EnvironmentQuiz',
    name: 'EnvironmentQuiz',
    component: require('./doctorviews/EnvironmentQuiz')
  },
  {
    path: '/GeneQuiz',
    name: 'GeneQuiz',
    component: require('./doctorviews/GeneQuiz')
  },
  {
    path: '*',
    redirect: {
      // name: 'Login'
    }
  }
];

module.exports = routes;

