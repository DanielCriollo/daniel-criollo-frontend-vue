<template>
    <div>
        <main class="container-fluid mt-3">
            <div class="row">
                <div class="col-md-8">
                    <h2>Listado de Paises</h2>
                </div>
                <div class="col-md-4 text-end">
                    <router-link :to="{ name: 'createPais' }" class="btn btn-success">Nuevo</router-link>
                </div>
                <div class="col-md-12">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="pais in paises" :key="pais.id">
                                <td>{{ pais.id }}</td>
                                <td>{{ pais.nombre }}</td>
                                <td>
                                    <button @click="editPais(pais.id)" class="btn btn-primary btn-sm">Editar</button>
                                    &nbsp;
                                    <button @click="confirmDelete(pais.id)" class="btn btn-danger btn-sm">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>

        <confirm-modal :show-modal="showConfirmModal" title="Confirmar Eliminación"
            message="¿Estás seguro de que deseas eliminar este país?" @close="closeConfirmModal" @confirm="deletePais" />
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
            paises: [],
            menuLinks: [
                { path: '/paises', label: 'Paises' },
            ],
            showConfirmModal: false,
            paisToDelete: null
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
        editPais(paisId) {
            this.$router.push({ name: 'editPais', params: { id: paisId } });
        },
        confirmDelete(paisId) {
            this.paisToDelete = paisId;
            this.showConfirmModal = true;
        },
        closeConfirmModal() {
            this.showConfirmModal = false;
            this.paisToDelete = null;
        },
        deletePais() {
            if (this.paisToDelete) {
                axios.delete(`http://127.0.0.1:8000/api/paises/${this.paisToDelete}`)
                    .then(response => {
                        console.log(response)
                        this.fetchPaises();
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
