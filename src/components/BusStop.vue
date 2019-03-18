<template>
  <v-flex :key="stop.stopId" xs4>
    <v-card class="mx-auto">
      <v-card-title primary-title>
        <div>
          <div class="headline">{{stop.name}}</div>
        </div>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <v-list-tile class="grow">
          <v-list-tile-content>
            <v-list-tile-title>
              <span class="font-weight-medium">$ {{stop.donationsRaisedInDollars}}</span>
              <span class="caption">USD raised</span>
            </v-list-tile-title>
            <v-list-tile-sub-title>
              <v-progress-linear :value="20" background-color="#f5f5f5" color="#35CA97"></v-progress-linear>
            </v-list-tile-sub-title>
          </v-list-tile-content>
          <v-spacer></v-spacer>
          <v-layout align-center justify-end>
            <v-btn color="#35CA97" flat >Donate</v-btn>
          </v-layout>
        </v-list-tile>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: "BusStop",
  props: ["stop"],
  data() {},

  methods: {
    selectStop() {
      console.log("\n\n selectStop");
    }
  }
};
</script>

