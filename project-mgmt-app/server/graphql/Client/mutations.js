const { GraphQLString, GraphQLNonNull, GraphQLID } = require('graphql')

const ClientType = require('./type')
const Client = require('../../models/Client')
const Project = require('../../models/Project')

module.exports = {
  addClient: {
    type: ClientType,
    args: {
      name: { type: GraphQLNonNull(GraphQLString) },
      email: { type: GraphQLNonNull(GraphQLString) },
      phone: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve(parent, { name, email, phone }) {
      const client = new Client({ name, email, phone })
      return client.save()
    }
  },

  deleteClient: {
    type: ClientType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) }
    },
    resolve(parent, { id }) {
      Project.find({ clientId: id }).then((projects) => {
        projects.forEach((project) => {
          project.remove()
        })
      })
      return Client.findByIdAndDelete(id)
    }
  }
}
