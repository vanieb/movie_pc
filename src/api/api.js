"use strict";

// import env from '.env.development'
// const env = process.env.NODE_ENV === 'development'
//     ? config.dev.env
//     : config.build.env
const host = process.env.VUE_APP_API_URL;

const member = `${host}member/`;

export default {
  movies: `${member}movies`,
  movie: `${member}movie`,
  artists: `${member}artists`,
  logos: `${member}logos`
};