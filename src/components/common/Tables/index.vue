<template>
  <el-table :data="dataSource" border>
    <el-table-column
      v-for="(item, key) in colModel"
      :key="key"
      :prop="item.prop"
      :label="item.label"
      :fixed="item.fixed"
      :sortable="item.sortable ? 'custom' : false"
      :filters="item.filters"
      :column-key="item.columnKey"
      :filtered-value="item.filteredValue"
      :filter-multiple="item.filterMultiple"
      :width="item.width"
      :align="item.align"
      :header-align="item.headerAlign"
    >
      <template slot-scope="scope">
        <ex-slot
          v-if="item.render"
          :render="item.render"
          :row="scope.row"
          :index="scope.$index"
          :column="item"
        />
        <span v-else>{{ scope.row[item.prop] || "-" }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import vTableCellOpen from '@/components/common/Tables/tableCellOpen'

var exSlot = {
  functional: true,
  props: {
    row: Object,
    render: Function,
    index: Number,
    column: {
      type: Object,
      default: null
    }
  },
  render: (h, data) => {
    const params = {
      row: data.props.row,
      index: data.props.index
    }
    if (data.props.column) params.column = data.props.column
    return data.props.render(h, params)
  }
}

export default {
  data() {
    return {
      myData: ''
    }
  },
  components: {
    exSlot,
    vTableCellOpen
  },
  props: {
    dataSource: {
      type: Array,
      default: function() {
        return []
      }
    },
    colModel: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  created() {
  },
  updated() {
  },
  methods: {
  }
}
</script>

<style></style>
