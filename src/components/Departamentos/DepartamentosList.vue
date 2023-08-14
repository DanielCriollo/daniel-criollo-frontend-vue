<template>
    <div>
        <main class="container-fluid mt-3">
            <div class="row">
                <div class="col-md-8">
                    <h2>Listado de Departamentos</h2>
                </div>
                <div class="col-md-4 text-end">
                    <router-link :to="{ name: 'createDepartamento' }" class="btn btn-success">Nuevo</router-link>
                </div>
                <div class="col-md-12">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>País</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="departamento in departamentos" :key="departamento.id">
                                <td>{{ departamento.id }}</td>
                                <td>{{ departamento.nombre }}</td>
                                <td>{{ departamento.pais.nombre }}</td>
                                <td>
                                    <button @click="editDepartamento(departamento.id)" class="btn btn-primary btn-sm">Editar</button>
                                    &nbsp;
                                    <button @click="confirmDelete(departamento.id)" class="btn btn-danger btn-sm">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>

        <confirm-modal :show-modal="showConfirmModal" title="Confirmar Eliminación"
            message="¿Estás seguro de que deseas eliminar este departamento?" @close="closeConfirmModal" @confirm="deleteDepartamento" />
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
            departamentos: [],
            showConfirmModal: false,
            departamentoToDelete: null
        };
    },
    mounted() {
        this.fetchDepartamentos();
    },
    methods: {
        fetchDepartamentos() {
            axios.get('http://127.0.0.1:8000/api/departamentos')
                .then(response => {
                    this.departamentos = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        editDepartamento(departamentoId) {
            this.$router.push({ name: 'editDepartamento', params: { id: departamentoId } });
        },
        confirmDelete(departamentoId) {
            this.departamentoToDelete = departamentoId;
            this.showConfirmModal = true;
        },
        closeConfirmModal() {
            this.showConfirmModal = false;
            this.departamentoToDelete = null;
        },
        deleteDepartamento() {
            if (this.departamentoToDelete) {
                axios.delete(`http://127.0.0.1:8000/api/departamentos/${this.departamentoToDelete}`)
                    .then(response => {
                        console.log(response);
                        this.fetchDepartamentos();
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

<style>

</style>
