<template>
  <div>
    <h1>Editar Ciudad</h1>
    <form @submit.prevent="updateCiudad" class="needs-validation" novalidate>
      <div class="form-group">
        <label for="nombre">Nombre de la ciudad</label>
        <input v-model="nombre" type="text" class="form-control" id="nombre" required />
        <div class="invalid-feedback" v-if="nombreInvalid">El nombre de la ciudad es requerido.</div>
      </div>
      <div class="form-group">
        <label for="pais">País</label>
        <select v-model="paisId" class="form-control" id="pais" @change="updateDepartamentos" required>
          <option value="">Seleccione un país</option>
          <option v-for="pais in orderedPaises" :key="pais.id" :value="pais.id">{{ pais.nombre }}</option>
        </select>
        <div class="invalid-feedback" v-if="paisInvalid">Debe seleccionar un país.</div>
      </div>
      <div class="form-group">
        <label for="departamento">Departamento</label>
        <select v-model="departamentoId" class="form-control" id="departamento" required>
          <option value="">Seleccione un departamento</option>
          <option v-for="departamento in orderedDepartamentos" :key="departamento.id" :value="departamento.id">{{ departamento.nombre }}</option>
        </select>
        <div class="invalid-feedback" v-if="departamentoInvalid">Debe seleccionar un departamento.</div>
      </div>
      <br>
      <button type="submit" class="btn btn-primary">Actualizar Ciudad</button>
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
    },
    nombreInvalid() {
      return !this.nombre;
    },
    paisInvalid() {
      return !this.paisId;
    },
    departamentoInvalid() {
      return !this.departamentoId;
    }
  },
  mounted() {
    this.fetchPaises();
    this.fetchCiudad();
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
    fetchCiudad() {
      const ciudadId = this.$route.params.id;
      axios.get(`http://127.0.0.1:8000/api/ciudades/${ciudadId}`)
        .then(response => {
          const ciudad = response.data;
          this.nombre = ciudad.nombre;
          this.paisId = ciudad.departamento.pais.id;
          this.departamentoId = ciudad.departamento.id;
          this.fetchDepartamentosPorPais();
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
    updateCiudad() {
      const ciudadId = this.$route.params.id;
      axios.put(`http://127.0.0.1:8000/api/ciudades/${ciudadId}`, {
        nombre: this.nombre,
        cod_departamento: this.departamentoId
      })
        .then(response => {
          console.log(response.data.message);
          this.$router.push('/ciudades');
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style></style>
