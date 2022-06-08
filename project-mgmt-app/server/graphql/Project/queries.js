const { GraphQLID, GraphQLList } = require('graphql')

const { projects } = require('../../sampleData')
const ProjectType = require('./type')

module.exports = {
  projects: {
    type: new GraphQLList(ProjectType),
    resolve() {
      return projects
    }
  },

  project: {
    type: ProjectType,
    args: { id: { type: GraphQLID } },
    resolve(parentValue, { id }) {
      return projects.find((project) => project.id === id)
    }
  }
}
