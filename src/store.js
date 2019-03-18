import Vue from "vue";
import Vuex from "vuex";
import BusStopService from '@/services/BusStopService';
import Constants from '@/constants';

const API = new BusStopService();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    busStops: [],
    selectedBusStop: null,
    isLoading: false,
    totalFunds: 0,
    userDonation: {
      ...Constants.USER_INFO
    }
  },
  mutations: {
    SET_STOPS(state, payload) {
      state.busStops = payload;
    },
  
    SET_IS_LOADING (state, payload) {
      state.isLoading = payload;
    },
  
    SET_SELECTED_STOP(state, stop) {
      state.selectedBusStop = stop;
    },
  
    SET_TOTAL_FUNDS(state, payload) {
      state.totalFunds += payload;
    },

    UPDATE_USER_DONATION_INFO (state, payload) {
      Object.assign(state.userDonation, payload);
    },

    UPDATE_BUS_STOP_DONATION (state) {
      Object.assign(state.selectedBusStop, {
        donationsRaisedInDollars: state.selectedBusStop.donationsRaisedInDollars + state.userDonation.amount
      });
      Object.assign(state.busStops, state.busStops.map(el=> el.stopId === state.selectedBusStop.stopId? state.selectedBusStop : el))
    },

    CLEAR_SELECTED_BUS_STOP (state) {
      state.selectedBusStop = null;
    }
  },
  actions: {
    getAllStops: (context) => new Promise((resolve, reject) => {
      context.commit('SET_IS_LOADING', true);
      try {
        const response = API.getAllStops();
        context.commit('SET_STOPS', response);
        setTimeout(() => context.commit('SET_IS_LOADING', false), 2000);
        resolve(response);
      } catch (error) {
        const data = [];
        context.commit('SET_STOPS', []);
        setTimeout(() => context.commit('SET_IS_LOADING', false), 2000);
        reject(error);
      }
    }),

    setSelectedStop (context, stop) {
      context.commit('SET_SELECTED_STOP', stop);
    },

    donateSelectedStop (context, stop) {
      context.commit('SET_SELECTED_STOP', stop);
    },

    updateUserDonationDetail (context, payload) {
      context.commit('UPDATE_USER_DONATION_INFO', payload);
    },

    chargeUserForDonation: () => new Promise((resolve, reject) =>{
      setTimeout(() => resolve(), 4000);
    }),

    updateBusStopDonation: ({state, commit})  => new Promise((resolve, reject) => {
      try {
        API.addDonation(state.selectedBusStop.stopId, state.userDonation.amoun);
        
        setTimeout(() => {
          commit('UPDATE_BUS_STOP_DONATION');
          resolve();
        }, 3000);
      } catch (error) {
        console.log('\n\n error in addDonation', error);
        setTimeout(() => reject(error), 2000);
        
      }
      
    }),

    resetTransaction (context) {
      context.commit('CLEAR_SELECTED_BUS_STOP');
      context.commit('UPDATE_USER_DONATION_INFO', Constants.USER_INFO);
    }
  },
  getters: {
    busStops: state => state.busStops,
    isLoading: state => state.isLoading,
    selectedBusStop: state => state.selectedBusStop,
    userDonation: state => state.userDonation,
    totalFunds: state => state.busStops.map(busStop => busStop.donationsRaisedInDollars).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  }
});
