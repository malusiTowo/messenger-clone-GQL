/* eslint-disable import/first */
// eslint-disable-next-line import/newline-after-import
require("dotenv").config();
import "../config/db";
import express from "express";

import graphql from "./servers/graphql";
import schema from "./schema";
import context from "./middleware/context";

(() => {
  const port = process.env.PORT || 4000;
  const app = express();

  const config = {
    schema,
    context,
  };

  graphql(app, config);

  app.listen({ port }, () => {
    console.log(`🚀  Server ready http://localhost:${port}`);
  });
})();
