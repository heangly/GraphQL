const { GraphQLID, GraphQLList } = require('graphql')
const ClientType = require('./type')
const Client = require('../../models/Client')

module.exports = {
  clients: {
    type: new GraphQLList(ClientType),
    resolve() {
      return Client.find()
    }
  },

  client: {
    type: ClientType,
    args: { id: { type: GraphQLID } },
    resolve(parentValue, { id }) {
      return Client.findById(id)
    }
  }
}
