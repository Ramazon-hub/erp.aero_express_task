import { AppDataSource } from "./config/typeormconfig";
import { Server } from "./server";
import config from "./config/index";
AppDataSource.initialize()
  .then(() => {
    new Server().app.listen(config.PORT, () => {
      console.log(`Server running on  ${config.PORT} port`);
      console.log(`Swagger url: http://localhost:${config.PORT}/docs`);
    });
  })
  .catch((error) => console.log(error));
