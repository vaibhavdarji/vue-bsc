<template>
  <v-card>
    <v-container grid-list-xl fluid>
      <v-layout v-if="isLoading" row wrap justify-center align-center>
        <v-progress-circular indeterminate color="primary">
        </v-progress-circular>
      </v-layout>
      <template v-if="errorMsg">
        <custom-error :msg="errorMsg" @onErrorBtnClick="onRefresh"></custom-error>
      </template>
      
       <v-layout row wrap v-else>
         <v-flex xs4 v-for="stop in totalStops" :key="stop.stopId">
           <v-card>
             <v-card-title primary-title>
                <div class="headline">
                  {{stop.name}}
                </div>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-actions>
                <v-flex xs8>
                  <v-list-tile-title>
                    <span class="headline">
                    $ {{stop.donationsRaisedInDollars}}
                    </span>
                    <span class="body-1">
                      {{Constants.CURRENCY}} raised
                    </span>
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                    <v-progress-linear
                    :value="Math.round(stop.donationsRaisedInDollars / Constants.MAX_DONATE * 100)"
                    :background-color="Constants.LINEAR_PROGRESS_BAR.BG_COLOR"
                    :color="Constants.LINEAR_PROGRESS_BAR.COLOR"
                    >
                    </v-progress-linear>
                  </v-list-tile-sub-title>
                  <v-list-tile-title>
                    <span class="subheading">
                    {{`${Math.round(stop.donationsRaisedInDollars / Constants.MAX_DONATE * 100)} %`}}
                    </span>
                    <span class="body-1">
                      of {{`${Constants.CURRENCY} ${Constants.MAX_DONATE}`}} raised
                    </span>
                  </v-list-tile-title>
                </v-flex>
                <v-flex xs4>
                  <custom-button @onClick="selectStop(stop)">
                    Donate
                  </custom-button>
                </v-flex>
              </v-card-actions>
           </v-card>
         </v-flex>
       </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters , mapActions} from 'vuex';
import Constants from '@/constants';
import CustomButton from '@/components/Button.vue';
import CustomError from '@/components/Error.vue';
export default {
  name: 'BusStops',
  data () {
    return {
      errorMsg: '',
      doRefresh: false
    };
  },

  components: {
    CustomButton,
    CustomError
  },

  asyncComputed: {
    totalStops: {
      get () {
        return this.busStops.length ? this.busStops : this.getAllStops().then((data) => {
          this.doRefresh = false;
          return data;
        }).catch((error) => {
          this.errorMsg = error.message;
        });
      },

      default () {
        return [];
      },
      watch () {
        this.doRefresh
      }
   }  
  },

  computed : {
    ...mapGetters(['isLoading', 'busStops']),
    Constants () {
      return Constants;
    }
  },

  methods: {
    ...mapActions([
      'getAllStops',
      'setSelectedStop'
    ]),
    
    selectStop (stop) {
      this.setSelectedStop(stop);
      this.$router.push({ path: 'stop'});
    },

    onRefresh () {
      this.errorMsg = '';
      this.doRefresh = true;
    }
  }
}
</script>

<style>
  .v-progress-linear {
    border-radius: 10px;
  }
</style>


