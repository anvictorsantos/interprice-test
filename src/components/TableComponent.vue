<template>
  <section>
    <div class="container">
      <div class="row wrapper">
        <div class="col-md-12">
          <div class="col-md-12 d-flex flex-row">
            <div class="d-block d-md-flex flex-row col-md-2">
              <input type="checkbox" class="btn-check" value="USD" v-model="currency" id="inlineCheckbox1" @change="filterCurrency" autocomplete="off">
              <label class="btn btn-outline-primary rounded-start" for="inlineCheckbox1">USD</label>
              <input type="checkbox" class="btn-check" value="EUR" v-model="currency" id="inlineCheckbox2" @change="filterCurrency" autocomplete="off">
              <label class="btn btn-outline-primary" for="inlineCheckbox2">EUR</label>
              <input type="checkbox" class="btn-check" value="CAD" v-model="currency" id="inlineCheckbox3" @change="filterCurrency" autocomplete="off">
              <label class="btn btn-outline-primary" for="inlineCheckbox3">CAD</label>
            </div>
            <div class="d-flex flex-row col-md-2">
              <input type="checkbox" class="btn-check" value="5" v-model="year" id="inlineCheckbox4" @change="filterYears" autocomplete="off">
              <label class="btn btn-outline-primary" for="inlineCheckbox4">5 YRS</label>
              <input type="checkbox" class="btn-check" value="10" v-model="year" id="inlineCheckbox5" @change="filterYears" autocomplete="off">
              <label class="btn btn-outline-primary" for="inlineCheckbox5">10 YRS</label>
              <input type="checkbox" class="btn-check" value="40" v-model="year" id="inlineCheckbox6" @change="filterYears" autocomplete="off">
              <label class="btn btn-outline-primary" for="inlineCheckbox6">40 YRS</label>
            </div>
            <div class="d-flex flex-row col-md-2 mx-5">
              <input type="checkbox" class="btn-check" value="Spread" v-model="spread" id="inlineCheckbox7" @change="filterSpreads" autocomplete="off">
              <label class="btn btn-outline-primary" for="inlineCheckbox7">Spread</label>
              <input type="checkbox" class="btn-check" value="Yield" v-model="spread" id="inlineCheckbox8" @change="filterSpreads" autocomplete="off">
              <label class="btn btn-outline-primary" for="inlineCheckbox8">Yield</label>
              <input type="checkbox" class="btn-check" value="3MLSpread" v-model="spread" id="inlineCheckbox9" @change="filterSpreads" autocomplete="off">
              <label class="btn btn-outline-primary" for="inlineCheckbox9">3MLSpread</label>
            </div>
          </div>
          <input class="float-start form-control form-control-sm my-4 w-25" type="search" v-model="filter" placeholder="Filter by company name ...">
          <table class="table table-bordered text-center">
            <thead class="border-bottom-0">
              <col>
              <colgroup span="2"></colgroup>
              <colgroup span="2"></colgroup>
              <tr>
                <td rowspan="2" class="border border-0"></td>
                <td rowspan="2" class="border border-0"></td>
                <th colspan="2" scope="colgroup" class="border-mx-transparency">5 YRS</th>
                <th colspan="2" scope="colgroup" class="border-mx-transparency">10 YRS</th>
                <th colspan="2" scope="colgroup" class="border-mx-transparency">40 YRS</th>
              </tr>
              <tr></tr>
              <tr>
                <th scope="col" class="w-25" @click="sortList('DateSent')">DATE SENT
                  <span v-if="sortedbyASC && sortKey === 'DateSent'" class="opacity-100">
                    <font-awesome-icon :icon="['fas', 'fa-caret-up']" />
                  </span>
                  <span v-else class="opacity-25">
                    <font-awesome-icon :icon="['fas', 'fa-caret-down']" />
                  </span>
                </th>
                <th scope="col" class="w-50" @click="sortList('Company')">COMPANY
                  <span v-if="sortedbyASC && sortKey === 'Company'" class="opacity-100">
                    <font-awesome-icon :icon="['fas', 'fa-caret-up']" />
                  </span>
                  <span v-else class="opacity-25">
                    <font-awesome-icon :icon="['fas', 'fa-caret-down']" />
                  </span>
                </th>
                <th scope="col">FIX</th>
                <th scope="col">FRN</th>
                <th scope="col">FIX</th>
                <th scope="col">FRN</th>
                <th scope="col">FIX</th>
                <th scope="col">FRN</th>
              </tr>
            </thead>
            <tbody v-for="item in sortedData" :key="item.Id">
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
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <template v-if="opened.includes(item.Id)">
                  <tr v-for="(value, index) in dataFiltered" :key="index">
                    <td></td>
                    <td>{{ index }} : {{ value }}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </template>
              </template>
              <template v-else>
                <tr>
                  <td>{{ item.DateSent }}</td>
                  <td>{{ item.Company }}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
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
      sortKey: '',
      sortedData: this.data,
      sortedbyASC: false,
      dataFiltered: [],
      currency: [],
      year: [],
      spread: []
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

      this.sortKey = sortBy
    },
    filterCurrency () {
      let sortedData = this.data

      if (this.currency.length !== 0) {
        sortedData = sortedData.filter((data) => {
          if (Array.isArray(data.Quote)) {
            for (let j = 0; j < data.Quote.length; j++) {
              for (let i = 0; i < this.currency.length; i++) {
                if (this.currency[i] === data.Quote[j].Currency) {
                  return data.Quote[j].Currency.includes(this.currency[i])
                }
              }
            }
          }
          return false
        })
      }

      this.sortedData = sortedData
    },
    filterYears () {
      let sortedData = this.data

      if (this.year.length !== 0) {
        sortedData = sortedData.filter((data) => {
          if (Array.isArray(data.Quote)) {
            for (let j = 0; j < data.Quote.length; j++) {
              for (let i = 0; i < this.year.length; i++) {
                if (this.year[i] === data.Quote[j].Years.toString()) {
                  return data.Quote[j].Years.toString().includes(this.year[i])
                }
              }
            }
          }
          return false
        })
      }

      this.sortedData = sortedData
    },
    filterSpreads () {
      let sortedData = this.data

      if (this.spread.length !== 0) {
        sortedData = sortedData.filter((data) => {
          if (Array.isArray(data.Quote)) {
            for (let j = 0; j < data.Quote.length; j++) {
              for (let i = 0; i < this.spread.length; i++) {
                if (data.Quote[j].Spread !== null && this.spread[i] === 'Spread') {
                  return data.Quote[j].Spread
                } else if (data.Quote[j].Yield !== null && this.spread[i] === 'Yield') {
                  return data.Quote[j].Yield
                } else if (this.spread[i] === '3MLSpread') {
                  return data.Quote[j]
                }
              }
            }
          }
          return false
        })
      }

      this.sortedData = sortedData
    },
    filteredData () {
      let sortedData = this.data
      if (this.filter !== '' && this.filter) {
        sortedData = sortedData.filter((item) => {
          return item.Company
            .toUpperCase()
            .includes(this.filter.toUpperCase())
        })
      }
      this.sortedData = sortedData
    }
  },
  created () {
    this.filteredData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin : 0;
  padding : 0;
}
tr > th {
  cursor: pointer;
}
.border-mx-transparency {
  border-right: 10px solid transparent;
  border-left: 10px solid transparent;
}
.wrapper {
  min-height : 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
