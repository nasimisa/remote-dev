import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    jobs: [],
    savedJobs: [],
    clickedJob: '',
    hideUSonly: false,
    jobsShown: 10,
    searchQuery: '',
    dialog: false,
  },
  mutations: {
    SET_JOBS(state, payload) {
      state.jobs = payload;
    },
    SET_CLICKED_JOB(state, payload) {
      state.clickedJob = payload;
    },
    SET_SAVED_JOB(state, payload) {
      state.savedJobs.push(payload);
    },
    REMOVE_SAVED_JOB(state, payload) {
      const index = state.savedJobs.findIndex(element => element.id === payload.id);

      state.savedJobs.splice(index, 1);
    },
  },
  actions: {
    loadJobs({ commit }) {
      axios
        .get('https://remotive.io/api/remote-jobs?category=software-dev')
        .then(response => {
          const jobs = [];

          response.data.jobs.forEach(element => {
            let bookmarked;

            if (this.state.savedJobs.some(savedJob => savedJob.id === element.id)) {
              bookmarked = true;
            } else {
              bookmarked = false;
            }

            jobs.push({
              id: element.id,
              companyName: element.company_name,
              jobTitle: element.title,
              jobType: element.job_type,
              requiredLocation: element.candidate_required_location,
              publicationDate: element.publication_date,
              salary: element.salary,
              jobURL: element.url,
              imgURL: `https://remotive.io/web/image/hr.job/${element.id}/logo/64x64`,
              jobDescription: element.description,
              bookmarked: bookmarked,
            });
          });

          commit('SET_JOBS', jobs);
        })
        .catch(error => console.log(error));
    },
    searchJobs({ commit }) {
      axios
        .get(`https://remotive.io/api/remote-jobs?search=${this.state.searchQuery}`)
        .then(response => {
          const jobs = [];

          response.data.jobs
            .filter(element => element.category === 'Software Development')
            .forEach(element => {
              let bookmarked;

              if (this.state.savedJobs.some(savedJob => savedJob.id === element.id)) {
                bookmarked = true;
              } else {
                bookmarked = false;
              }

              jobs.push({
                id: element.id,
                companyName: element.company_name,
                jobTitle: element.title,
                jobType: element.job_type,
                requiredLocation: element.candidate_required_location,
                publicationDate: element.publication_date,
                salary: element.salary,
                jobURL: element.url,
                imgURL: `https://remotive.io/web/image/hr.job/${element.id}/logo/64x64`,
                jobDescription: element.description,
                bookmarked: bookmarked,
              });
            });

          commit('SET_JOBS', jobs);
          this.state.searchQuery = '';
        })
        .catch(error => console.log(error));
    },
    openJobModal({ commit }, payload) {
      commit('SET_CLICKED_JOB', payload);
    },
    saveJob({ commit }, payload) {
      commit('SET_SAVED_JOB', payload);
    },
    removeSavedJob({ commit }, payload) {
      commit('REMOVE_SAVED_JOB', payload);
    },
  },
  getters: {
    jobs(state) {
      return state.jobs;
    },
    filteredJobs(state) {
      return state.jobs.filter(element => element.requiredLocation !== 'USA Only');
    },
    clickedJob(state) {
      return state.clickedJob;
    },
    savedJobs(state) {
      return state.savedJobs;
    },
  },
});
