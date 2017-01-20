<template>
  <FamilyMember :loginInfo="loginInfo"></FamilyMember>
</template>

<script>
    import FamilyMember from '../components/FamilyMember'
    export default {
      name: 'FamilyMemberPatient',
      data() {
          return {
            loginInfo: {
              type: 'patient'
            }
          }
      },
      components: {FamilyMember}
    }
</script>
