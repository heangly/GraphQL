const { GraphQLSchema, GraphQLObjectType } = require('graphql')

const clientQueries = require('./Client/queries')
const clientMutations = require('./Client/mutations')
const projectQueries = require('./Project/queries')
const projectMutations = require('./Project/mutations')

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
    fields: { ...clientQueries, ...projectQueries }
  }),

  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: { ...clientMutations, ...projectMutations }
  })
})
