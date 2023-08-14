<template>
  <div>
    <main class="container-fluid mt-3">
      <div class="row">
        <div class="col-md-8">
          <h2>Listado de Sectores</h2>
        </div>
        <div class="col-md-4 text-end">
          <router-link :to="{ name: 'createSector' }" class="btn btn-success">Nuevo</router-link>
        </div>
        <div class="col-md-12">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Ciudad</th>
                  <th>Departamento</th>
                  <th>País</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="sector in sectores" :key="sector.id">
                  <td>{{ sector.id }}</td>
                  <td>{{ sector.nombre }}</td>
                  <td>{{ sector.ciudad.nombre }}</td>
                  <td>{{ sector.ciudad.departamento.nombre }}</td>
                  <td>{{ sector.ciudad.departamento.pais.nombre }}</td>
                  <td>
                    <button @click="editSector(sector.id)" class="btn btn-primary btn-sm">Editar</button>
                    &nbsp;
                    <button @click="confirmDelete(sector.id)" class="btn btn-danger btn-sm">Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <confirm-modal :show-modal="showConfirmModal" title="Confirmar Eliminación"
      message="¿Estás seguro de que deseas eliminar este sector?" @close="closeConfirmModal" @confirm="deleteSector" />
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
      sectores: [],
      showConfirmModal: false,
      sectorToDelete: null
    };
  },
  mounted() {
    this.fetchSectores();
  },
  methods: {
    fetchSectores() {
      axios.get('http://127.0.0.1:8000/api/sectores')
        .then(response => {
          this.sectores = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    editSector(sectorId) {
      this.$router.push({ name: 'editSector', params: { id: sectorId } });
    },
    confirmDelete(sectorId) {
      this.sectorToDelete = sectorId;
      this.showConfirmModal = true;
    },
    closeConfirmModal() {
      this.showConfirmModal = false;
      this.sectorToDelete = null;
    },
    deleteSector() {
      if (this.sectorToDelete) {
        axios.delete(`http://127.0.0.1:8000/api/sectores/${this.sectorToDelete}`)
          .then(response => {
            console.log(response);
            this.fetchSectores();
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
