const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const filters = require("./mockData.js");

console.log("filters", filters);

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Fl_store {
      label: String!,
      value: String!
      previous_filter_value: String!
  }
    type Fl_placement {
      label: String!,
      value: String!
      previous_filter_value: String!
  }
    type Fl_date {
      label: String!,
      value: String!
      previous_filter_value: String!
  }
    type Fl_category {
      label: String!,
      value: String!
      previous_filter_value: String!
  }
  type Query {
    hello: String,
    getStores(previous_filter_value : String!): [Fl_store!]!,
    getPlacements: [Fl_placement!]!,
    getDates(previous_filter_value : String!): [Fl_date!]!,
    getCategories(previous_filter_value : String!): [Fl_category!]!
  }

`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return "Hello world!";
  },
  getCategories: ({ previous_filter_value }) => {
    return filters.filter.fl_category.filter(
      (el) => el.previous_filter_value === previous_filter_value
    );
  },
  getStores: ({ previous_filter_value }) => {
    return filters.filter.fl_store.filter(
      (el) => el.previous_filter_value === previous_filter_value
    );
  },
  getDates: ({ previous_filter_value }) => {
    console.log(previous_filter_value);
    const arr = filters.filter.fl_dropdown_date.filter((el) => {
      el.previous_filter_value == previous_filter_value;
    });
    console.log("dss", arr);
  },
};

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
