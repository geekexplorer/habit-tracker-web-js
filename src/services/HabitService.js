import { REST } from './fetchHelpers.js';
import { API_URL } from '../config.js';

const HabitService = {
  Create: async function (data) {
    try {
      const response = await REST.Post(`${API_URL}`, data);
      return this._success(response);
    } catch (err) {
      return this._fail('Unable to retrive habit list.', err);
    }
  },

  Retrieve: async function (id = undefined) {
    try {
      const response = await REST.Get(id ? `${API_URL}/${id}` : `${API_URL}`);
      return this._success(response);
    } catch (err) {
      return this._fail(`Unable to retrieve habit${id ? '. (id: ' + id + '.' : 's.'}`, err);
    }
  },

  Update: async function (id, data) {
    try {
      await REST.Put(`${API_URL}/${id}`, data);
      return this._success();
    } catch (err) {
      return this._fail(`Unable to update habit. (id: ${id})`, err);
    }
  },

  Delete: async function (id) {
    try {
      await REST.Delete(`${API_URL}/${id}`);
      return this._success();
    } catch (err) {
      return this._fail(`Unable to delete habit. (id: ${id})`, err);
    }
  },

  _success: function (data = undefined) {
    return { success: true, data: data };
  },

  _fail: function (err = undefined) {
    console.log(err);
    return { success: false, data: err };
  },
};

export default HabitService;
