<template>
  <FamilyMember :loginInfo="loginInfo"></FamilyMember>
</template>

<script>
    import FamilyMember from '../components/FamilyMember'
    export default {
      name: 'FamilyMemberSocial',
      data() {
          return {
            loginInfo: {
              type: 'social'
            }
          }
      },
      components: {FamilyMember}
    }
</script>
