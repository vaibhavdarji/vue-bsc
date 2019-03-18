<template>
  <div>
    <v-toolbar dark color="primary">
      <v-toolbar-title class="white--text">
        {{appTitle}}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <h1 class="headline py-3">
          Total Donation: 
          <v-icon>attach_money</v-icon>
          {{totalFunds}}
        </h1>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'AppBar',
  data () {
    return {
      appTitle: 'Bus-stop crowdsourcing web application'
    };
  },

  computed: {
    ...mapGetters([
      'totalFunds'
    ])
  }
}
</script>

