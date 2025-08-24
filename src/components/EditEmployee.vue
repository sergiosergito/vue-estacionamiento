<template>
  <h1>{{ title }}</h1>
  <div class="container mt-4">
    <h2 class="mb-4">Editar empleado</h2>

    <form @submit.prevent="submitData" novalidate>
      <div class="mb-3">
        <label class="form-label">Primer nombre</label>
        <input
          v-model="edited.firstName"
          type="text"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Segundo nombre</label>
        <input v-model="edited.middleName" type="text" class="form-control" />
      </div>

      <div class="mb-3">
        <label class="form-label">Primer apellido</label>
        <input
          v-model="edited.firstLastName"
          type="text"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Segundo apellido</label>
        <input v-model="item.secondLastName" type="text" class="form-control" />
      </div>

      <div class="mb-3">
        <label class="form-label">Área</label>
        <select v-model="edited.area" class="form-select" required>
          <option value="">Seleccione</option>
          <option value="Producción">Producción</option>
          <option value="Finanzas">Finanzas</option>
          <option value="Contabilidad">Contabilidad</option>
        </select>
        <div class="invalid-feedback">El área es obligatorio</div>
      </div>

      <div class="mb-3">
        <label class="form-label">Vehículo</label>
        <select v-model="edited.vehicle" class="form-select" required>
          <option value="">Seleccione</option>
          <option value="Automóvil">Automóvil</option>
          <option value="Motocicleta">Motocicleta</option>
          <option value="Sin vehículo">Sin vehículo</option>
        </select>
        <div class="invalid-feedback">Debe seleccionar una opción</div>
      </div>

      <div class="mb-3">
        <label class="form-label">Placa</label>
        <input
          v-model="edited.plateNumber"
          type="text"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Color</label>
        <input
          v-model="edited.color"
          type="text"
          class="form-control"
          required
        />
      </div>

      <button type="submit" class="btn btn-primary">Guardar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "EditEmployee",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      edited: { ...this.item },
    };
  },
  methods: {
    submitData() {
      this.$emit("update", this.edited);
    },
  },
  mounted() {
    console.log("here...?");
  },
};
</script>
