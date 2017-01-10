<template>
  <div>
      <Login :loginInfo="loginInfo" :protocolName="protocolName" :nextStep="nextStep"></Login>
  </div>
</template>

<script>
    import Login from '../components/Login'
    export default {
      name: 'LoginSocial',
      data() {
          return {
            loginInfo: {
              type: 'social'
            },
            protocolName: '前驱期知情同意书',
            nextStep: 'FamilyMember'
          }
      },
      components: {Login}
    }
</script>
