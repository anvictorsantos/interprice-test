<template>
  <div class="home">
    <TableComponent :data="items"/>
  </div>
</template>

<script>
import data from '../../data.json'
import TableComponent from '@/components/TableComponent.vue'

export default {
  name: 'HomeView',
  components: {
    TableComponent
  },
  data: () => {
    return {
      items: data.Items
    }
  }
}
</script>
