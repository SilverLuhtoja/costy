const fs = require('fs');
const path = require('path');
const { app } = require('electron');

class Storage {
  fileName;
  constructor(fileN) {
    this.fileName = fileN;
  }

  getAll() {
    if (fs.existsSync(pth)) {
      let rawdata = fs.readFileSync(pth);
      return rawdata;
    }
  }

  get(key) {
    let pth = this.fileName;
    if (fs.existsSync(pth)) {
      let rawdata = fs.readFileSync(pth);

      if (rawdata != '') {
        let data = JSON.parse(rawdata);
        return data[key];
      } else return null;
    } else {
      return null;
    }
  }

  async set(key, value) {
    if (key == '') return;
    let data = await this.getFileData();
    data[key] = value;
    fs.writeFileSync(this.fileName, JSON.stringify(data));
    return true;
  }

  async remove(key, value = null) {
    if (key == '') return;
    let data = await this.getFileData();
    if (value == null) {
      delete data[key];
    } else {
      data[key] = data[key].filter(item => item !== value);
    }
    fs.writeFileSync(this.fileName, JSON.stringify(data));
    return true;
  }

  async getFileData() {
    let pth = this.fileName;
    let data = {};
    if (fs.existsSync(pth)) {
      let rawdata = fs.readFileSync(pth);
      if (rawdata != '') data = JSON.parse(rawdata);
    }
    return data;
  }
}

const file_path = `${app.getPath('userData')}/options.json`;
const storage = new Storage(file_path);
module.exports = { storage, file_path };
