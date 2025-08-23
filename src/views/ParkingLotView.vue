<template>
  <div class="container">
    <p>
      <button type="button" class="btn btn-primary" @click="goToNew()">
        Nuevo
      </button>
    </p>
    <div class="mb-3">
      <div class="input-group">
        <span class="input-group-text" id="basic-addon3"
          >Filtrar por tipo de vehículo</span
        >
        <select v-model="vehicleFilter" class="form-select">
          <option value="all">Todo tipo</option>
          <option value="Automóvil">Automóvil</option>
          <option value="Motocicleta">Motocicleta</option>
        </select>
      </div>
    </div>

    <div class="mb-3">
      <div class="input-group">
        <span class="input-group-text" id="basic-addon3"
          >Buscar por nombres y apellidos</span
        >
        <input type="search" v-model="searchByFullName" class="form-control" />
      </div>
    </div>
    <table class="table table-bordered border-primary">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Primer Nombre</th>
          <th scope="col">Segundo Nombre</th>
          <th scope="col">Primer Apellido</th>
          <th scope="col">Segundo Apellido</th>
          <th scope="col">Área</th>
          <th scope="col">Vehículo</th>
          <th scope="col">Número de placa</th>
          <th scope="col">Color</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in searchedItems" :key="item.id">
          <th scope="row">{{ item.id }}</th>
          <td>{{ item.firstName }}</td>
          <td>{{ item.middleName }}</td>
          <td>{{ item.firstLastName }}</td>
          <td>{{ item.secondLastName }}</td>
          <td>{{ item.area }}</td>
          <td>{{ item.vehicle }}</td>
          <td>{{ item.plateNumber }}</td>
          <td>{{ item.color }}</td>
          <td>
            <button type="button" class="btn btn-primary">Editar</button>
            <button type="button" class="btn btn-danger">eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="modal fade" tabindex="-1" ref="modalRef">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ modalMode === "crear" ? "Crear" : "Editar" }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <div class="modal-body">
          <NewEmployee
            v-if="modalMode == 'crear'"
            @created="addNew($event)"
          ></NewEmployee>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Modal } from "bootstrap";
import NewEmployee from "@/components/NewEmployee.vue";

export default {
  name: "EmployeesList",
  data() {
    return {
      title: "Estacionamiento",
      items: [],
      searchByFullName: "",
      vehicleFilter: "all",
      modalBootstrapInstance: null,
      modalMode: "crear",
    };
  },
  components: {
    NewEmployee,
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.modalRef) {
        this.modalBootstrapInstance = new Modal(this.$refs.modalRef, {});
        console.log("Modal initialized");
      } else {
        console.error("No se encontró el ref modalRef");
      }
    });
    this.getItems();
  },
  updated() {},
  destroyed() {},
  methods: {
    goToNew() {
      this.modalMode = "crear";
      if (this.modalBootstrapInstance) {
        this.modalBootstrapInstance.show();
      } else {
        console.error("modalBootstrapInstance no está inicializado");
      }
    },
    getItems() {
      axios
        .get(process.env.VUE_APP_API_URL + "/employee")
        .then((response) => {
          this.items = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    addNew($event) {
      axios
        .post(process.env.VUE_APP_API_URL + "/employee", $event)
        .then((response) => {
          this.getItems();
          this.new = null;
        })
        .catch((error) => {
          console.error(error);
        });
      console.log($event);
      this.cerrarModal();
    },
    cerrarModal() {
      if (this.modalBootstrapInstance) {
        this.modalBootstrapInstance.hide();
      }
    },
  },
  computed: {
    searchedItems() {
      const search = this.searchByFullName.toLowerCase().trim();

      return this.items.filter((item) => {
        const fullName = [
          item.firstName,
          item.middleName,
          item.firstLastName,
          item.secondLastName,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        const matchesName = !search || fullName.includes(search);

        const matchesVehicle =
          this.vehicleFilter === "all" || item.vehicle === this.vehicleFilter;

        return matchesName && matchesVehicle;
      });
    },
  },
  props: {},
  emits: [],
};
</script>
