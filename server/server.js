const express = require("express");
const port = 3000;
const cors = require("cors");
const songRoutes = require("./routes/songRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/musicPlayer", songRoutes);

app.listen(port, () => {
  console.log(`Server is running in http://localhost:${port}/`);
});
