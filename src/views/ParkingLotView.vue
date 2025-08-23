<template>
  <div class="parking-lot">
    <label>
      Filtro por tipo de vehiculo:
      <select
        v-model="vehicleFilter"
        class="form-select form-select-lg mb-3"
        aria-label=".form-select-lg example"
      >
        <option value="all">Todo tipo</option>
        <option value="Automóvil">Automóvil</option>
        <option value="Motocicleta">Motocicleta</option>
      </select>
    </label>
    <input
      type="text"
      v-model="searchByFullName"
      class="form-control mb-3"
      placeholder="Buscar por nombres y apellidos de empleado "
    />
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
          <th></th>
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
</template>

<script>
import axios from "axios";
export default {
  name: "EmployeesList",
  data() {
    return {
      title: "Estacionamiento",
      items: [],
      searchByFullName: "",
      vehicleFilter: "all",
    };
  },
  components: {},
  created() {},
  mounted() {
    this.getItems();
  },
  updated() {},
  destroyed() {},
  methods: {
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
