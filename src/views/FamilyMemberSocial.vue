<template>
  <div>
      <FamilyMember :loginInfo="loginInfo"></FamilyMember>
  </div>
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
