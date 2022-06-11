const { GraphQLID, GraphQLList } = require('graphql')

const ProjectType = require('./type')
const Project = require('../../models/Project')

module.exports = {
  projects: {
    type: new GraphQLList(ProjectType),
    resolve() {
      return Project.find()
    }
  },

  project: {
    type: ProjectType,
    args: { id: { type: GraphQLID } },
    resolve(parentValue, { id }) {
      return Project.findById(id)
    }
  }
}
