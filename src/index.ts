import server from "./website";

import { securityComponents } from "./validation/securityComponents";

securityComponents();

const start = new server();

start.listen();