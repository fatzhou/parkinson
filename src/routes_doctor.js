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
    path: '*',
    redirect: {
      name: 'Login'
    }
  }
];

module.exports = routes;

