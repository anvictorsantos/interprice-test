<template>
  <section>
    <div class="container">
      <div class="row wrapper">
        <div class="col-md-12">
          <input class="float-start form-control form-control-sm my-4 w-25" type="search" v-model="filter" placeholder="Filter by company name ...">
          <table class="table">
            <thead>
              <tr>
                <th scope="col" @click="sortList('DateSent')">DATE SENT
                  <span v-if="sortedbyASC">
                    <font-awesome-icon :icon="['fas', 'fa-caret-up']" />
                  </span>
                  <span v-else>
                    <font-awesome-icon :icon="['fas', 'fa-caret-down']" />
                  </span>
                </th>
                <th scope="col">COMPANY</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredRecipes" :key="item.Id">
                <td>{{ item.DateSent }}</td>
                <td colspan="2" v-html="highlightMatches(item.Company)"></td>
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
      filter: '',
      sortedData: this.data,
      sortedbyASC: false
    }
  },
  methods: {
    highlightMatches (text) {
      const matchExists = text?.toLowerCase().includes(this.filter?.toLowerCase())
      if (!matchExists) return text

      const re = new RegExp(this.filter, 'ig')
      return text.replace(re, matchedText => `<strong>${matchedText}</strong>`)
    },
    sortList (sortBy) {
      if (this.sortedbyASC) {
        this.sortedData.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1))
        this.sortedbyASC = false
      } else {
        this.sortedData.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1))
        this.sortedbyASC = true
      }
    }
  },
  computed: {
    filteredRecipes () {
      let sortedData = this.data
      if (this.filter !== '' && this.filter) {
        sortedData = sortedData.filter((item) => {
          return item.Company
            .toUpperCase()
            .includes(this.filter.toUpperCase())
        })
      }
      return sortedData
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin : 0;
  padding : 0;
}

.wrapper {
  min-height : 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
