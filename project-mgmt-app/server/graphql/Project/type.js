const { GraphQLID, GraphQLString, GraphQLObjectType } = require('graphql')

const ClientType = require('../Client/type')
const Client = require('../../models/Client')

module.exports = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    clientId: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parentValue, args) {
        return Client.findById(parentValue.clientId)
      }
    }
  })
})
