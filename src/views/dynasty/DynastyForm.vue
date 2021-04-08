<template>
  <a-modal
    title="新增朝代"
    :width="540"
    :visible="visible"
    :confirm-loading="loading"
    :cancel-text="'取消'"
    :ok-text="'保存'"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <a-form-item label="朝代名">
          <a-input v-decorator="['dynasty', {rules: [{required: true, pattern: /^[\u4E00-\u9FA5]{1,10}$/, message: '1-10个字之间，仅支持中文', whitespace: true}, { validator: checkUnique}]}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import pick from 'lodash.pick'
  import { mapGetters } from 'vuex'
  // 表单字段
  const fields = ['dynasty']
  export default {
    props: {
      visible: {
        type: Boolean,
        required: true,
      },
      loading: {
        type: Boolean,
        default: () => false,
      },
      model: {
        type: Object,
        default: () => null,
      },
    },
    computed: {
      ...mapGetters(['listDynasty']),
    },
    data () {
      return {
        form: this.$form.createForm(this),
        formLayout: {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 7 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 13 },
          },
        },
      }
    },
    created () {
      fields.forEach(v => this.form.getFieldDecorator(v))
      this.$watch('model', () => {
        this.model && this.form.setFieldsValue(pick(this.model, fields))
      })
    },
    methods: {
      checkUnique (rule, value, callback) {
        const dynasty = this.listDynasty.map(o => o.dynasty)
        // edit
        if (this.model) {
          if (value && (value !== this.model.dynasty) && dynasty.includes(value)) {
            // eslint-disable-next-line standard/no-callback-literal
            callback('朝代名称不能重复')
          } else {
            callback()
          }
        }
        if (value && dynasty.includes(value)) {
          // eslint-disable-next-line standard/no-callback-literal
          callback('朝代名称不能重复')
        } else {
          callback()
        }
      },
    },
  }
</script>
