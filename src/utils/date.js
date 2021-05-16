import Vue from 'vue'
const format = 'YYYY-MM-DD'

export default {
  max_today: Vue.moment().format(format),
  today: [Vue.moment().format(format), Vue.moment().format(format)],
  yesterday: [Vue.moment().subtract(1, 'days').format(format), Vue.moment().subtract(1, 'days').format(format)],
  this_week: [Vue.moment().startOf('isoWeek').format(format), Vue.moment().format(format)],
  last_week: [Vue.moment().startOf('isoWeek').subtract(7, 'days').format(format), Vue.moment().startOf('isoWeek').subtract(1, 'days').format(format)],
  this_month: [Vue.moment().startOf('month').format(format), Vue.moment().format(format)],
  last_month: [Vue.moment().subtract(1, 'months').startOf('month').format(format), Vue.moment().subtract(1, 'months').endOf('month').format(format)]
}