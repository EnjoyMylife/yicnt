<template>
  <div>
    <v-table :dataSource="tableData" :colModel="colModel"></v-table>
    <div slot="open">123</div>
  </div>
</template>

<script>
import '@/assets/styles/reset.css' // 引入公共样式
import vTable from '@/components/common/Tables'

export default {
  data () {
    return {
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }
      ],
      colModel: [
        { prop: 'date', label: '日期', width: '150', align: 'center', fixed: true, headerAlign: 'left' },
        { prop: 'name', label: '姓名', width: '150', align: 'center', fixed: false },
        { prop: 'province', label: '省份', align: 'center', fixed: false },
        { prop: 'city', label: '市区', width: '150', align: 'center', fixed: false },
        { prop: 'address', label: '地址', width: '250', align: 'center', fixed: false },
        { prop: 'zip', label: '邮编', width: '150', align: 'center', fixed: false },
        { prop: 'zip',
          label: '操作',
          width: '250px',
          align: 'center',
          fixed: 'right',
          render: (h, params) => {
            return h('v-tableCellOpen', {
              attrs: {
                cellData: params.row.zip
              }
            })
          }
        }
      ]
    }
  },
  components: {
    vTable
  },
  methods: {
  }
}
</script>
