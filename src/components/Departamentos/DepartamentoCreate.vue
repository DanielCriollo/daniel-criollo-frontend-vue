<template>
    <div>
        <h1>Crear Departamento</h1>
        <form @submit.prevent="createDepartamento" class="needs-validation" novalidate>
            <div class="form-group">
                <label for="nombre">Nombre del departamento</label>
                <input v-model="nombre" type="text" class="form-control" id="nombre" required />
                <div class="invalid-feedback">El nombre del departamento es requerido.</div>
            </div>
            <div class="form-group">
                <label for="cod_pais">País</label>
                <select v-model="paisId" class="form-control" id="cod_pais" required>
                    <option v-for="pais in paises" :key="pais.id" :value="pais.id">{{ pais.nombre }}</option>
                </select>
                <div class="invalid-feedback">Debe seleccionar un país.</div>
            </div>
            <br>
            <button type="submit" class="btn btn-primary">Crear Departamento</button>
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
            paises: []
        };
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
        createDepartamento() {
            axios.post('http://127.0.0.1:8000/api/departamentos', {
                nombre: this.nombre,
                cod_pais: this.paisId
            })
                .then(response => {
                    console.log(response.data.message);
                    this.$router.push('/departamentos');
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
  