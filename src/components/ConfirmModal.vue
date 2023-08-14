<template>
  <div class="modal" tabindex="-1" role="dialog" :style="{ display: showModal ? 'block' : 'none' }">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          {{ message }}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Cancelar</button>
          <button type="button" class="btn btn-danger" @click="confirmAction">Confirmar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showModal: Boolean,
    title: String,
    message: String
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    confirmAction() {
      this.$emit('confirm');
    }
  }
};
</script>

<style>
</style>