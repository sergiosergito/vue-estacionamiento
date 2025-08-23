<template>
  <h1>{{ title }}</h1>
  <div class="container mt-4">
    <h2 class="mb-4">Registrar Nuevo empleado</h2>

    <form @submit.prevent="submit" novalidate>
      <div class="mb-3">
        <label class="form-label">Primer nombre</label>
        <input
          v-model="item.firstName"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': v$.item.firstName.$error }"
        />
        <div class="invalid-feedback">Primer nombre es obligatorio</div>
      </div>

      <div class="mb-3">
        <label class="form-label">Segundo nombre</label>
        <input v-model="item.middleName" type="text" class="form-control" />
      </div>

      <div class="mb-3">
        <label class="form-label">Primer apellido</label>
        <input
          v-model="item.firstLastName"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': v$.item.firstLastName.$error }"
        />
        <div class="invalid-feedback">Primer apellido es obligatorio</div>
      </div>

      <div class="mb-3">
        <label class="form-label">Segundo apellido</label>
        <input v-model="item.secondLastName" type="text" class="form-control" />
      </div>

      <div class="mb-3">
        <label class="form-label">Área</label>
        <select
          v-model="item.area"
          class="form-select"
          :class="{ 'is-invalid': v$.item.area.$error }"
        >
          <option value="">Seleccione</option>
          <option value="Producción">Producción</option>
          <option value="Finanzas">Finanzas</option>
          <option value="Contabilidad">Contabilidad</option>
        </select>
        <div class="invalid-feedback">El área es obligatorio</div>
      </div>

      <div class="mb-3">
        <label class="form-label">Vehículo</label>
        <select
          v-model="item.vehicle"
          class="form-select"
          :class="{ 'is-invalid': v$.item.vehicle.$error }"
        >
          <option value="">Seleccione</option>
          <option value="vehicle">Vehículo</option>
          <option value="motorcycle">Motocicleta</option>
          <option value="None">Sin vehículo</option>
        </select>
        <div class="invalid-feedback">Debe seleccionar una opción</div>
      </div>

      <div class="mb-3">
        <label class="form-label">Placa</label>
        <input
          v-model="item.plateNumber"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': v$.item.plateNumber.$error }"
        />
        <div class="invalid-feedback">Número de placa es obligatorio</div>
      </div>

      <div class="mb-3">
        <label class="form-label">Color</label>
        <input
          v-model="item.color"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': v$.item.color.$error }"
        />
        <div class="invalid-feedback">Color es obligatorio</div>
      </div>

      <button type="submit" class="btn btn-primary">Guardar</button>
    </form>
  </div>
</template>

<script>
import { reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "NewEmployee",
  data() {
    return {
      item: reactive({
        firstName: "",
        middleName: "",
        firstLastName: "",
        secondLastName: "",
        area: "",
        vehicle: "",
        plateNumber: "",
        color: "",
      }),
      v$: null,
    };
  },
  components: {
    // Registro de componentes que se utilizaran.
  },
  created() {
    const rules = {
      item: {
        firstName: { required },
        middleName: {},
        firstLastName: { required },
        secondLastName: {},
        area: { required },
        vehicle: { required },
        plateNumber: { required },
        color: { required },
      },
    };
    this.v$ = useVuelidate(rules, { item: this.item });
  },
  methods: {
    // métodos que se pueden llamar desde la plantilla o desde otras partes del componente.
    async submit() {
      const isValid = await this.v$.$validate();
      if (!isValid) {
        alert("Por favor complete correctamente el formulario.");
        return;
      }
      this.$emit("created", { ...this.item });
    },
  },
  computed: {},
  props: {},
  emits: [],
};
</script>
