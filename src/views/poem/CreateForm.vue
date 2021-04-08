<template>
  <a-modal
    title="新增诗词"
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
        <a-form-item label="作者">
          <a-input placeholder="2-10个字之间，仅支持中文" v-decorator="['author', {rules: [{required: true, whitespace: true, pattern: /^[\u4E00-\u9FA5]{2,10}$/, message: '2-10个字之间，仅支持中文'}]}]" />
        </a-form-item>
        <a-form-item label="诗句">
          <a-input placeholder="2-20个字之间" v-decorator="['content', {rules: [{required: true, min: 2, max: 20, whitespace: true, message: '2-20个字之间'}]}]" />
        </a-form-item>
        <a-form-item label="朝代">
          <a-select v-decorator="['dynasty', {rules: [{required: true, message: '请选择朝代'}]}]">
            <a-select-option v-for="d in listDynasty" :key="d.index" :value="d.dynasty">
              {{ d.dynasty }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import pick from 'lodash.pick'
  import { mapGetters } from 'vuex'
  // 表单字段
  const fields = ['author', 'content', 'dynasty']
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
  }
</script>
