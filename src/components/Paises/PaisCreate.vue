<template>
  <div>
    <h1>Crear País</h1>
    <form @submit.prevent="createPais" class="needs-validation" novalidate>
      <div class="form-group">
        <label for="nombre">Nombre del país</label>
        <input v-model="nombre" type="text" class="form-control" id="nombre" required />
        <div class="invalid-feedback">El nombre del país es requerido.</div>
      </div>
      <br>
      <button type="submit" class="btn btn-primary">Crear País</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      nombre: ''
    };
  },
  methods: {
    createPais() {
      axios.post('http://127.0.0.1:8000/api/paises', { nombre: this.nombre })
        .then(response => {
          console.log(response.data.message);
          this.$router.push('/paises');
        })
        .catch(error => {
          if (error.response && error.response.data.errors) {
            const validationErrors = error.response.data.errors;
            for (const field in validationErrors) {
              const errorMessage = validationErrors[field][0];
              const inputElement = document.getElementById(field);
              inputElement.classList.add('is-invalid');
              inputElement.nextElementSibling.textContent = errorMessage;
            }
          } else {
            console.error(error);
          }
        });
    }
  }
};
</script>

<style>
</style>
