<template>
  <div>
    <h1>Editar Inmueble</h1>
    <form @submit.prevent="updateInmueble" class="needs-validation" novalidate>
      <div class="form-group">
        <label for="nombre_propietario">Nombre del propietario</label>
        <input v-model="nombrePropietario" type="text" class="form-control" id="nombre_propietario" required />
        <div class="invalid-feedback">El nombre del propietario es requerido.</div>
      </div>
      <div class="form-group">
        <label for="email_propietario">Email del propietario</label>
        <input v-model="emailPropietario" type="email" class="form-control" id="email_propietario" required />
        <div class="invalid-feedback">El email del propietario es requerido.</div>
      </div>
      <div class="form-group">
        <label for="conjunto">Conjunto</label>
        <input v-model="conjunto" type="text" class="form-control" id="conjunto" required />
        <div class="invalid-feedback">El conjunto es requerido.</div>
      </div>
      <div class="form-group">
        <label for="torre">Torre</label>
        <input v-model="torre" type="text" class="form-control" id="torre" required />
        <div class="invalid-feedback">La torre es requerida.</div>
      </div>
      <div class="form-group">
        <label for="apto">Apartamento</label>
        <input v-model="apto" type="text" class="form-control" id="apto" required />
        <div class="invalid-feedback">El apartamento es requerido.</div>
      </div>
      <div class="form-group">
        <label for="direccion">Dirección</label>
        <input v-model="direccion" type="text" class="form-control" id="direccion" required />
        <div class="invalid-feedback">La dirección es requerida.</div>
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
        <select v-model="ciudadId" class="form-control" id="cod_ciudad" @change="updateSectores" required>
          <option value="">Seleccione una ciudad</option>
          <option v-for="ciudad in orderedCiudades" :key="ciudad.id" :value="ciudad.id">{{ ciudad.nombre }}</option>
        </select>
        <div class="invalid-feedback">Debe seleccionar una ciudad.</div>
      </div>
      <div class="form-group">
        <label for="cod_barrio">Sector</label>
        <select v-model="sectorId" class="form-control" id="cod_barrio" required>
          <option value="">Seleccione un sector</option>
          <option v-for="sector in orderedSectores" :key="sector.id" :value="sector.id">{{ sector.nombre }}</option>
        </select>
        <div class="invalid-feedback">Debe seleccionar un sector.</div>
      </div>
      <br>
      <button type="submit" class="btn btn-primary">Actualizar Inmueble</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      id: '',
      nombrePropietario: '',
      emailPropietario: '',
      conjunto: '',
      torre: '',
      apto: '',
      direccion: '',
      paisId: '',
      departamentoId: '',
      ciudadId: '',
      sectorId: '',
      paises: [],
      departamentos: [],
      ciudades: [],
      sectores: []
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
    },
    orderedSectores() {
      return this.sectores.slice().sort((a, b) => a.nombre.localeCompare(b.nombre));
    }
  },
  mounted() {
    this.fetchPaises();
    this.fetchInmueble();
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
    fetchInmueble() {
      const inmuebleId = this.$route.params.id;
      axios.get(`http://127.0.0.1:8000/api/inmuebles/${inmuebleId}`)
        .then(response => {
          const inmueble = response.data;
          this.id = inmueble.id;
          this.nombrePropietario = inmueble.nombre_propietario;
          this.emailPropietario = inmueble.email_propietario;
          this.conjunto = inmueble.conjunto;
          this.torre = inmueble.torre;
          this.apto = inmueble.apto;
          this.direccion = inmueble.direccion;
          this.paisId = inmueble.sector.ciudad.departamento.pais.id;
          this.departamentoId = inmueble.sector.ciudad.departamento.id;
          this.ciudadId = inmueble.sector.ciudad.id;
          this.sectorId = inmueble.cod_barrio;
          this.fetchDepartamentosPorPais();
          this.fetchCiudadesPorDepartamento();
          this.fetchSectoresPorCiudad();
        })
        .catch(error => {
          console.error(error);
        });
    },
    updateDepartamentos() {
      if (this.paisId === '') {
        this.departamentoId = '';
        this.ciudadId = '';
        this.sectorId = '';
        this.departamentos = [];
        this.ciudades = [];
        this.sectores = [];
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
      this.sectorId = '';
      this.ciudades = [];
        this.sectores = [];
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
    updateSectores() {
    if (this.ciudadId === '') {
        this.sectorId = '';
        this.sectores = [];
      } else {
        this.fetchSectoresPorCiudad();
      }
    },
    fetchSectoresPorCiudad() {
      axios.get(`http://127.0.0.1:8000/api/sectores-por-ciudad/${this.ciudadId}`)
        .then(response => {
          this.sectores = response.data;
          console.log(this.sectores)
        })
        .catch(error => {
          console.error(error);
        });
    },
    updateInmueble() {
      axios.put(`http://127.0.0.1:8000/api/inmuebles/${this.id}`, {
        nombre_propietario: this.nombrePropietario,
        email_propietario: this.emailPropietario,
        conjunto: this.conjunto,
        torre: this.torre,
        apto: this.apto,
        direccion: this.direccion,
        cod_barrio: this.sectorId
      })
        .then(response => {
          console.log(response.data.message);
          this.$router.push('/inmuebles');
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
