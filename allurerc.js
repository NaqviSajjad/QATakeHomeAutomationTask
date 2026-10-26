module.exports = {
  output: 'allure-report',
  plugins: {
    awesome: {
      import: '@allurereport/plugin-awesome',
      options: {
        // Group the dashboard tree by spec file (login.cy.js, purchase.cy.js, ...)
        // instead of the full package path (demoblaze-cypress > cypress > tests > e2e).
        groupBy: ['specFile'],
      },
    },
  },
};
