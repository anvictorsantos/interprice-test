<template>
  <section>
    <div class="container">
      <div class="row wrapper">
        <div class="col-md-12">
          <input class="float-start form-control form-control-sm my-4 w-25" type="search" v-model="filter" placeholder="Filter by company name ...">
          <table class="table">
            <thead class="border-bottom-0">
              <tr>
                <th scope="col" class="w-25" @click="sortList('DateSent')">DATE SENT
                  <span v-if="sortedbyASC">
                    <font-awesome-icon :icon="['fas', 'fa-caret-up']" />
                  </span>
                  <span v-else>
                    <font-awesome-icon :icon="['fas', 'fa-caret-down']" />
                  </span>
                </th>
                <th scope="col" class="w-50">COMPANY</th>
              </tr>
            </thead>
            <tbody v-for="item in filteredRecipes" :key="item.Id">
              <template v-if="Array.isArray(item.Quote)">
                <tr @click="toggle(item.Id)">
                  <td>
                    <span v-if="opened.includes(item.Id)">
                      <font-awesome-icon :icon="['fas', 'angle-down']" />
                    </span>
                    <span v-else>
                      <font-awesome-icon :icon="['fas', 'angle-right']" />
                    </span>
                    {{ item.DateSent }}
                  </td>
                  <td v-html="highlightMatches(item.Company)"></td>
                </tr>
                <template v-if="opened.includes(item.Id)">
                  <tr v-for="(quote, index) in item.Quote" :key="index">
                    <td></td>
                    <td>{{ quote.Yield }}</td>
                  </tr>
                </template>
              </template>
              <template v-else>
                <tr>
                  <td>{{ item.DateSent }}</td>
                  <td>{{ item.Company }}</td>
                </tr>
              </template>
            </tbody>
            <tfoot class="border border-dark">
              <tr>
                <td></td>
                <td>Average by</td>
              </tr>
            </tfoot>
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
      opened: [],
      filter: '',
      sortedData: this.data,
      sortedbyASC: false
    }
  },
  methods: {
    toggle (id) {
      const index = this.opened.indexOf(id)
      if (index > -1) {
        this.opened.splice(index, 1)
      } else {
        this.opened.push(id)
      }
    },
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
