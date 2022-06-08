const { GraphQLID, GraphQLList } = require('graphql')
const { clients } = require('../../sampleData')
const ClientType = require('./type')

module.exports = {
  clients: {
    type: new GraphQLList(ClientType),
    resolve() {
      return clients
    }
  },

  client: {
    type: ClientType,
    args: { id: { type: GraphQLID } },
    resolve(parentValue, { id }) {
      return clients.find((client) => client.id === id)
    }
  }
}
