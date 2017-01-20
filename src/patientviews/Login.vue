<template>
  <div>
      <Login :loginInfo="loginInfo" :protocolName="protocolName" :nextStep="nextStep"></Login>
  </div>
</template>

<script>
    import Login from '../components/Login'
    export default {
      name: 'LoginPatient',
      data() {
          return {
            loginInfo: {
              type: 'patient'
            },
            protocolName: 'PD患者知情同意书',
            nextStep: 'PatientInfo'
          }
      },
      components: {Login}
    }
</script>
