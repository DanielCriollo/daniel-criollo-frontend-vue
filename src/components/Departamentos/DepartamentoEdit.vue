<template>
    <div>
      <h1>Editar Departamento</h1>
      <form @submit.prevent="updateDepartamento" class="needs-validation" novalidate>
        <div class="form-group">
          <label for="nombre">Nombre del departamento</label>
          <input
            v-model="nombre"
            type="text"
            class="form-control"
            id="nombre"
            required
            :class="{ 'is-invalid': nombreError }"
          />
          <div class="invalid-feedback">El nombre del departamento es requerido.</div>
          <div class="invalid-feedback" v-if="nombreError">{{ nombreError }}</div>
        </div>
        <div class="form-group">
          <label for="cod_pais">País</label>
          <select v-model="codPais" class="form-control" id="cod_pais" required>
            <option value="" disabled>Seleccione un país</option>
            <option v-for="pais in paises" :key="pais.id" :value="pais.id">{{ pais.nombre }}</option>
          </select>
          <div class="invalid-feedback">Debe seleccionar un país.</div>
        </div>
        <br>
        <button type="submit" class="btn btn-primary">Actualizar</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    props: ["id"],
    data() {
      return {
        nombre: "",
        codPais: "",
        nombreError: "",
        codPaisError: "",
        paises: [],
      };
    },
    mounted() {
      this.fetchDepartamento();
      this.fetchPaises();
    },
    methods: {
      fetchDepartamento() {
        axios
          .get(`http://127.0.0.1:8000/api/departamentos/${this.$route.params.id}`)
          .then((response) => {
            this.nombre = response.data.nombre;
            this.codPais = response.data.cod_pais;
          })
          .catch((error) => {
            console.error(error);
          });
      },
      fetchPaises() {
        axios
          .get(`http://127.0.0.1:8000/api/paises`)
          .then((response) => {
            this.paises = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
      },
      updateDepartamento() {
        this.nombreError = "";
        this.codPaisError = "";
  
        if (!this.nombre) {
          this.nombreError = "El nombre del departamento es requerido.";
        }
        if (!this.codPais) {
          this.codPaisError = "Debe seleccionar un país.";
        }
  
        if (this.nombreError || this.codPaisError) {
          return;
        }
  
        axios
          .put(`http://127.0.0.1:8000/api/departamentos/${this.$route.params.id}`, {
            nombre: this.nombre,
            cod_pais: this.codPais,
          })
          .then((response) => {
            console.log(response.data.message);
            this.$router.push("/departamentos");
          })
          .catch((error) => {
            if (error.response && error.response.data.errors) {
              const validationErrors = error.response.data.errors;
              for (const field in validationErrors) {
                if (field === "nombre") {
                  this.nombreError = validationErrors[field][0];
                } else if (field === "cod_pais") {
                  this.codPaisError = validationErrors[field][0];
                }
              }
            } else {
              console.error(error);
            }
          });
      },
    },
  };
  </script>
  