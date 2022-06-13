<template>
<div>
  <Dashboard/>
</div>
  

</template>

<script>
import Dashboard from '@/components/Dashboard.vue'

export default {
  name: 'app',
  beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background:#E9EDC9')
  },
  components: {
    Dashboard
  }  
}
</script>

