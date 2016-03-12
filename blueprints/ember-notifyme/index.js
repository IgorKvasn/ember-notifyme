/*jshint node:true*/
module.exports = {
  description: '',

  normalizeEntityName: function () {
  },
  afterInstall: function () {
    return this.addPackageToProject(
          {name: 'velocity-animate', target: '1.2.3'}
    );
  }
};
