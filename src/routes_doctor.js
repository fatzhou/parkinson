const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: require('./views/LoginDoctor')
  },
  {
    path: '/PatientAdmin',
    name: 'PatientAdmin',
    component: require('./views/PatientAdmin')
  },
  {
    path: '/PatientList',
    name: 'PatientList',
    component: require('./views/PatientList')
  },
  {
    path: '*',
    redirect: {
      name: 'Login'
    }
  }
];

module.exports = routes;

