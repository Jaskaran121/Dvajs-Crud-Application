import dva from "dva";
import Router from "./router";
import Posts from "./models/posts";
// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(Posts);
// 4. Router
app.router(Router);

// 5. Start
app.start("#root");
