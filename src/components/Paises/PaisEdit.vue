<template>
  <div>
    <h1>Editar País</h1>
    <form @submit.prevent="updatePais" class="needs-validation" novalidate>
      <div class="form-group">
        <label for="nombre">Nombre del país</label>
        <input
          v-model="nombre"
          type="text"
          class="form-control"
          id="nombre"
          required
          :class="{ 'is-invalid': nombreError }"
        />
        <div class="invalid-feedback">El nombre del país es requerido.</div>
        <div class="invalid-feedback" v-if="nombreError">{{ nombreError }}</div>
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
      nombreError: "",
    };
  },
  mounted() {
    this.fetchPais();
  },
  methods: {
    fetchPais() {
      axios
        .get(`http://127.0.0.1:8000/api/paises/${this.$route.params.id}`)
        .then((response) => {
          this.nombre = response.data.nombre;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    updatePais() {
      this.nombreError = "";

      if (!this.nombre) {
        this.nombreError = "El nombre del país es requerido.";
        return;
      }

      axios
        .put(`http://127.0.0.1:8000/api/paises/${this.$route.params.id}`, {
          nombre: this.nombre,
        })
        .then((response) => {
          console.log(response.data.message);
          this.$router.push("/paises");
        })
        .catch((error) => {
          if (error.response && error.response.data.errors) {
            const validationErrors = error.response.data.errors;
            for (const field in validationErrors) {
              this.nombreError = validationErrors[field][0];
            }
          } else {
            console.error(error);
          }
        });
    },
  },
};
</script>
