module.exports = {
  prodDB: {
    // mongodb_url: "192.168.10.10:27017",
    mongodb_url: 'localhost:27017',
    db_name: 'NodePractice',
    mongodb_user: 'rich',
    mongodb_password: '1234',
  },
  devDB: {
    // mongodb_url: 'localhost:27017',
    mongodb_url: 'localhost:27017',
    db_name: 'NodePractice',
    mongodb_user: 'rich',
    mongodb_password: '1234',
  },
  storage: {
    bucket: 'NodePractice',
    projectId: 'sellervision-2020',
    keyFilePath: './config/sellervision-api.json',
  },
};
