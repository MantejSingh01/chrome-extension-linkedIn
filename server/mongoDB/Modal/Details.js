const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let DetailsModal = new Schema({
    Title:{
        type: String,
        default: null,
    },
  AboutUs: {
    type: String,
    default: null,
  },
  ImgSrc: {
    type: String,
    default: null,
  },
  Website: {
    type: String,
    default: null,
  },
  Industry: {
    type: String,
    default: null,
  },
  'Company size': {
    type: String,
    default: null,
  },
  Headquarters: {
    type: String,
    default: null,
  },
  Type: {
    type: String,
    default: null,
  },
  Founded: {
    type: String,
    default: null,
  },
  Specialties:{
    type: String,
    default: null,
  }

} ,{
    timestamps: true
});
module.exports = mongoose.model('details', DetailsModal);