<template>
  <div>
    <main class="container-fluid mt-3">
      <div class="row">
        <div class="col-md-8">
          <h2>Listado de Inmuebles</h2>
        </div>
        <div class="col-md-4 text-end">
          <router-link :to="{ name: 'createInmueble' }" class="btn btn-success">Nuevo</router-link>
        </div>
        <div class="col-md-12">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre Propietario</th>
                  <th>Email Propietario</th>
                  <th>Conjunto</th>
                  <th>Torre</th>
                  <th>Apto</th>
                  <th>Dirección</th>
                  <th>Sector</th>
                  <th>Ciudad</th>
                  <th>Departamento</th>
                  <th>País</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="inmueble in inmuebles" :key="inmueble.id">
                  <td>{{ inmueble.id }}</td>
                  <td>{{ inmueble.nombre_propietario }}</td>
                  <td>{{ inmueble.email_propietario }}</td>
                  <td>{{ inmueble.conjunto }}</td>
                  <td>{{ inmueble.torre }}</td>
                  <td>{{ inmueble.apto }}</td>
                  <td>{{ inmueble.direccion }}</td>
                  <td>{{ inmueble.sector.nombre }}</td>
                  <td>{{ inmueble.sector.ciudad.nombre }}</td>
                  <td>{{ inmueble.sector.ciudad.departamento.nombre }}</td>
                  <td>{{ inmueble.sector.ciudad.departamento.pais.nombre }}</td>
                  <td>
                    <button @click="editInmueble(inmueble.id)" class="btn btn-primary btn-sm">Editar</button>
                    &nbsp;
                    <button @click="confirmDelete(inmueble.id)" class="btn btn-danger btn-sm">Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <confirm-modal :show-modal="showConfirmModal" title="Confirmar Eliminación"
      message="¿Estás seguro de que deseas eliminar este inmueble?" @close="closeConfirmModal" @confirm="deleteInmueble" />
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
      inmuebles: [],
      showConfirmModal: false,
      inmuebleToDelete: null
    };
  },
  mounted() {
    this.fetchInmuebles();
  },
  methods: {
    fetchInmuebles() {
      axios.get('http://127.0.0.1:8000/api/inmuebles')
        .then(response => {
          this.inmuebles = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    editInmueble(inmuebleId) {
      this.$router.push({ name: 'editInmueble', params: { id: inmuebleId } });
    },
    confirmDelete(inmuebleId) {
      this.inmuebleToDelete = inmuebleId;
      this.showConfirmModal = true;
    },
    closeConfirmModal() {
      this.showConfirmModal = false;
      this.inmuebleToDelete = null;
    },
    deleteInmueble() {
      if (this.inmuebleToDelete) {
        axios.delete(`http://127.0.0.1:8000/api/inmuebles/${this.inmuebleToDelete}`)
          .then(response => {
            console.log(response);
            this.fetchInmuebles();
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
