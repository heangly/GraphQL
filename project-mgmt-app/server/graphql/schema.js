const { GraphQLSchema, GraphQLObjectType } = require('graphql')
const clientQueries = require('./Client/queries')
const projectQueries = require('./Project/queries')

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
    fields: { ...clientQueries, ...projectQueries }
  })
})
