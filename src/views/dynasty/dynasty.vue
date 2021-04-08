<template>
  <page-container :title="false">
    <a-card :bordered="false">
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
      </div>
      <a-table :row-key="'index'" :columns="columns" :data-source="listDynasty" bordered>
        <template slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">修改</a>
          <a-divider type="vertical" />
          <a @click="handleDelete(record)">删除</a>
        </template>
      </a-table>
      <dynasty-form
        ref="createModal"
        :visible="visible"
        :loading="confirmLoading"
        :model="formData"
        @cancel="handleCancel"
        @ok="handleOk"
      />
    </a-card>
  </page-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  import DynastyForm from './DynastyForm'
  import cloneDeep from 'lodash.clonedeep'
  export default {
    name: 'Dynasty',
    components: {
      DynastyForm,
    },
    data () {
      return {
        columns: [
          {
            title: '#',
            dataIndex: 'index',
            width: '60px',
          },
          {
            title: '朝代名称',
            dataIndex: 'dynasty',
          },
          {
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
            width: '180px',
          },
        ],
        // create model
        visible: false,
        confirmLoading: false,
        formData: null,
        type: 'add',
      }
    },
    computed: {
      ...mapGetters(['listDynasty', 'listPoem']),
    },
    methods: {
      handleAdd () {
        this.type = 'add'
        this.formData = null
        this.visible = true
      },
      handleEdit (record) {
        this.type = 'edit'
        this.formData = { ...record }
        this.visible = true
      },
      handleDelete (record) {
        this.$confirm({
          title: '警告',
          content: '删除该项会同时删除所有引用该项的诗句，确定删除吗？',
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            let list = cloneDeep(this.listDynasty)
            const index = list.findIndex(o => o.index === record.index)
            list.splice(index, 1)
            // eslint-disable-next-line no-return-assign
            list.forEach((o, i) => o.index = i + 1)
            this.$store.commit('SET_DYNASTY', list)
            // 删除诗词
            let poems = cloneDeep(this.listPoem)
            poems = poems.filter(o => o.dynasty !== record.dynasty)
            this.$store.commit('SET_POEM', poems)
            this.$message.info('删除成功')
          },
          onCancel () {
            console.log('Cancel')
          },
        })
      },
      handleOk () {
        const form = this.$refs.createModal.form
        this.confirmLoading = true
        form.validateFields((errors, values) => {
          if (!errors) {
            console.log('values', values)
            this.visible = false
            this.confirmLoading = false
            // 重置表单数据
            form.resetFields()
            if (this.type === 'edit') {
              // 修改
              let list = cloneDeep(this.listDynasty)
              const formData = { ...cloneDeep(this.formData), ...values }
              const index = list.findIndex(o => o.index === formData.index)
              list[index] = formData
              console.log(list)
              this.$store.commit('SET_DYNASTY', list)
              // 修改诗词
              console.log(this.listPoem)
              console.log(this.formData)
              let poems = cloneDeep(this.listPoem)
              poems.forEach(o => {
                if (o.dynasty === this.formData.dynasty) {
                  o.dynasty = values.dynasty
                }
              })
              this.$store.commit('SET_POEM', poems)
              this.$message.info('修改成功')
            } else {
              // 新增
              let list = cloneDeep(this.listDynasty)
              list.unshift(values)
              // eslint-disable-next-line no-return-assign
              list.forEach((o, i) => o.index = i + 1)
              this.$store.commit('SET_DYNASTY', list)
              this.$message.info('新增成功')
            }
          } else {
            this.confirmLoading = false
          }
        })
      },
      handleCancel () {
        this.visible = false
        const form = this.$refs.createModal.form
        form.resetFields()
      },
    },
  }
</script>
<style lang="less" scoped>
  .table-operator {
    display: flex;
    justify-content: flex-end;
  }
</style>
