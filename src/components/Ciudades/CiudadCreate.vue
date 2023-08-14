<template>
  <div>
    <h1>Crear Ciudad</h1>
    <form @submit.prevent="createCiudad" class="needs-validation" novalidate>
      <div class="form-group">
        <label for="nombre">Nombre de la ciudad</label>
        <input v-model="nombre" type="text" class="form-control" id="nombre" required />
        <div class="invalid-feedback">El nombre de la ciudad es requerido.</div>
      </div>
      <div class="form-group">
        <label for="pais">País</label>
        <select v-model="paisId" class="form-control" id="pais" @change="updateDepartamentos" required>
          <option value="">Seleccione un país</option>
          <option v-for="pais in orderedPaises" :key="pais.id" :value="pais.id">{{ pais.nombre }}</option>
        </select>
        <div class="invalid-feedback">Debe seleccionar un país.</div>
      </div>
      <div class="form-group">
        <label for="cod_departamento">Departamento</label>
        <select v-model="departamentoId" class="form-control" id="cod_departamento" required>
          <option value="">Seleccione un departamento</option>
          <option v-for="departamento in orderedDepartamentos" :key="departamento.id" :value="departamento.id">{{ departamento.nombre }}</option>
        </select>
        <div class="invalid-feedback">Debe seleccionar un departamento.</div>
      </div>
      <br>
      <button type="submit" class="btn btn-primary">Crear Ciudad</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      nombre: '',
      paisId: '',
      departamentoId: '',
      paises: [],
      departamentos: []
    };
  },
  computed: {
    orderedPaises() {
      return this.paises.slice().sort((a, b) => a.nombre.localeCompare(b.nombre));
    },
    orderedDepartamentos() {
      return this.departamentos.slice().sort((a, b) => a.nombre.localeCompare(b.nombre));
    }
  },
  mounted() {
    this.fetchPaises();
  },
  methods: {
    fetchPaises() {
      axios.get('http://127.0.0.1:8000/api/paises')
        .then(response => {
          this.paises = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    updateDepartamentos() {
      if (this.paisId === '') {
        this.departamentoId = '';
        this.departamentos = [];
      } else {
        this.fetchDepartamentosPorPais();
      }
    },
    fetchDepartamentosPorPais() {
      axios.get(`http://127.0.0.1:8000/api/departamentos-por-pais/${this.paisId}`)
        .then(response => {
          this.departamentos = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    createCiudad() {
      axios.post('http://127.0.0.1:8000/api/ciudades', {
        nombre: this.nombre,
        cod_departamento: this.departamentoId
      })
        .then(response => {
          console.log(response.data.message);
          this.$router.push('/ciudades');
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

<style></style>
