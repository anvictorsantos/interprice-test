<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">DATE SENT</th>
                <th scope="col">COMPANY</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.Id">
                <td scope="row">{{ item.DateSent }}</td>
                <td scope="row">{{ item.Company }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TableComponent',
  props: ['data'],
  data () {
    return {
      items: this.data
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
