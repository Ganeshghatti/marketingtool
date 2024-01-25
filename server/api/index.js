const app = require("../main");

const server = app.listen(5000, () => {
  console.log(`Server running at http://localhost:5000`);
});
