import { Container } from "inversify";
import * as services from "../services";
import * as controller from "../controller";
import { TYPES } from "../utils/type";
import { Auth } from "../middleware/auth";

const container = new Container()

for (const i in controller) {
    const Controller = controller[i]
    container.bind<typeof Controller>(TYPES[Controller.name]).to(Controller)
  }
  
  //services
  for (const i in services) {
    const Services = services[i]
    container.bind<typeof Services>(TYPES[Services.name]).to(Services)
  }

  container.bind<Auth>(Auth).toSelf()

export {container}