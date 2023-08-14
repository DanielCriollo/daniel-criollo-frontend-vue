<template>
    <div>
        <main class="container-fluid mt-3">
            <div class="row">
                <div class="col-md-8">
                    <h2>Listado de Ciudades</h2>
                </div>
                <div class="col-md-4 text-end">
                    <router-link :to="{ name: 'createCiudad' }" class="btn btn-success">Nuevo</router-link>
                </div>
                <div class="col-md-12">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>País</th>
                                <th>Departamento</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="ciudad in ciudades" :key="ciudad.id">
                                <td>{{ ciudad.id }}</td>
                                <td>{{ ciudad.nombre }}</td>
                                <td>{{ ciudad.departamento.pais.nombre }}</td>
                                <td>{{ ciudad.departamento.nombre }}</td>
                                <td>
                                    <button @click="editCiudad(ciudad.id)" class="btn btn-primary btn-sm">Editar</button>
                                    &nbsp;
                                    <button @click="confirmDelete(ciudad.id)"
                                        class="btn btn-danger btn-sm">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>

        <confirm-modal :show-modal="showConfirmModal" title="Confirmar Eliminación"
            message="¿Estás seguro de que deseas eliminar esta ciudad?" @close="closeConfirmModal"
            @confirm="deleteCiudad" />
    </div>
</template>

<script>
import axios from 'axios';
import ConfirmModal from '@/components/ConfirmModal.vue';

export default {
    components: {
        ConfirmModal
    },
    data() {
        return {
            ciudades: [],
            showConfirmModal: false,
            ciudadToDelete: null
        };
    },
    mounted() {
        this.fetchCiudades();
    },
    methods: {
        fetchCiudades() {
            axios.get('http://127.0.0.1:8000/api/ciudades')
                .then(response => {
                    this.ciudades = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        editCiudad(ciudadId) {
            this.$router.push({ name: 'editCiudad', params: { id: ciudadId } });
        },
        confirmDelete(ciudadId) {
            this.ciudadToDelete = ciudadId;
            this.showConfirmModal = true;
        },
        closeConfirmModal() {
            this.showConfirmModal = false;
            this.ciudadToDelete = null;
        },
        deleteCiudad() {
            if (this.ciudadToDelete) {
                axios.delete(`http://127.0.0.1:8000/api/ciudades/${this.ciudadToDelete}`)
                    .then(response => {
                        console.log(response);
                        this.fetchCiudades();
                    })
                    .catch(error => {
                        console.error(error);
                    })
                    .finally(() => {
                        this.closeConfirmModal();
                    });
            }
        }
    }
};
</script>

<style></style>
