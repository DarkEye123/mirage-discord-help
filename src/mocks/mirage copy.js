import { createServer, Factory } from "miragejs";
import { createGraphQLHandler } from "@miragejs/graphql";
import { faker } from "@faker-js/faker";
import gql from "graphql-tag";
import { buildASTSchema } from "graphql";
import { inflections } from "inflected";

import schema from "./schema.graphql";

export const graphQLSchemaAST = gql`
  ${schema}
`;

inflections("en", function (inflect) {
  inflect.irregular("serviceOfferTemplateData", "serviceOfferTemplateData");
});

const getFactories = () => {
  return {
    offerList: Factory.extend({
      afterCreate(offerList, server) {
        offerList.update({
          meta: server.create("metaInfo"),
        });
      },
    }),
    metaInfo: Factory.extend({
      totalCount: faker.datatype.number({ min: 1 }),
    }),
  };
};

const createGraphQLMock = () => {
  return createServer({
    routes() {
      // intercepts all /graphql requests from our app
      this.post(
        "/merchant-admin/graphql",
        createGraphQLHandler(buildASTSchema(graphQLSchemaAST), this.schema)
      );

      this.passthrough();
    },

    factories: getFactories(),

    seeds(server) {
      console.log("server.schema", server.schema);
      server.create("offerList");
      console.log("server.db.dump()", server.db.dump());
    },
  });
};

export { createGraphQLMock };
