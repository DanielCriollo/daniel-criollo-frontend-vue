<template>
  <div>
    <h1>Crear Sector</h1>
    <form @submit.prevent="createSector" class="needs-validation" novalidate>
      <div class="form-group">
        <label for="nombre">Nombre del sector</label>
        <input v-model="nombre" type="text" class="form-control" id="nombre" required />
        <div class="invalid-feedback">El nombre del sector es requerido.</div>
      </div>
      <div class="form-group">
        <label for="cod_pais">País</label>
        <select v-model="paisId" class="form-control" id="cod_pais" @change="updateDepartamentos" required>
          <option value="">Seleccione un país</option>
          <option v-for="pais in orderedPaises" :key="pais.id" :value="pais.id">{{ pais.nombre }}</option>
        </select>
        <div class="invalid-feedback">Debe seleccionar un país.</div>
      </div>
      <div class="form-group">
        <label for="cod_departamento">Departamento</label>
        <select v-model="departamentoId" class="form-control" id="cod_departamento" @change="updateCiudades" required>
          <option value="">Seleccione un departamento</option>
          <option v-for="departamento in orderedDepartamentos" :key="departamento.id" :value="departamento.id">{{ departamento.nombre }}</option>
        </select>
        <div class="invalid-feedback">Debe seleccionar un departamento.</div>
      </div>
      <div class="form-group">
        <label for="cod_ciudad">Ciudad</label>
        <select v-model="ciudadId" class="form-control" id="cod_ciudad" required>
          <option value="">Seleccione una ciudad</option>
          <option v-for="ciudad in orderedCiudades" :key="ciudad.id" :value="ciudad.id">{{ ciudad.nombre }}</option>
        </select>
        <div class="invalid-feedback">Debe seleccionar una ciudad.</div>
      </div>
      <br>
      <button type="submit" class="btn btn-primary">Crear Sector</button>
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
      ciudadId: '',
      paises: [],
      departamentos: [],
      ciudades: []
    };
  },
  computed: {
    orderedPaises() {
      return this.paises.slice().sort((a, b) => a.nombre.localeCompare(b.nombre));
    },
    orderedDepartamentos() {
      return this.departamentos.slice().sort((a, b) => a.nombre.localeCompare(b.nombre));
    },
    orderedCiudades() {
      return this.ciudades.slice().sort((a, b) => a.nombre.localeCompare(b.nombre));
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
        this.ciudadId = '';
        this.departamentos = [];
        this.ciudades = [];
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
    updateCiudades() {
      if (this.departamentoId === '') {
        this.ciudadId = '';
        this.ciudades = [];
      } else {
        this.fetchCiudadesPorDepartamento();
      }
    },
    fetchCiudadesPorDepartamento() {
      axios.get(`http://127.0.0.1:8000/api/ciudades-por-departamento/${this.departamentoId}`)
        .then(response => {
          this.ciudades = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    createSector() {
      axios.post('http://127.0.0.1:8000/api/sectores', {
        nombre: this.nombre,
        cod_ciudad: this.ciudadId
      })
        .then(response => {
          console.log(response.data.message);
          this.$router.push('/sectores');
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
