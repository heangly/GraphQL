const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLID
} = require('graphql')

const ProjectType = require('./type')
const Project = require('../../models/Project')

module.exports = {
  addProject: {
    type: ProjectType,
    args: {
      name: { type: GraphQLNonNull(GraphQLString) },
      description: { type: GraphQLNonNull(GraphQLString) },
      status: {
        type: new GraphQLEnumType({
          name: 'ProjectStatus',
          values: {
            new: { value: 'Not Started' },
            progress: { value: 'In Progress' },
            completed: { value: 'Completed' }
          }
        }),
        defaultValue: 'Not Started'
      },
      clientId: { type: GraphQLNonNull(GraphQLID) }
    },
    resolve(parent, { name, description, status, clientId }) {
      const project = new Project({ name, description, status, clientId })
      return project.save()
    }
  },

  deleteProject: {
    type: ProjectType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) }
    },
    resolve(parent, { id }) {
      return Project.findByIdAndDelete(id)
    }
  },

  updateProject: {
    type: ProjectType,
    args: {
      id: {
        type: GraphQLNonNull(GraphQLID)
      },
      name: { type: GraphQLString },
      description: { type: GraphQLString },
      status: {
        type: new GraphQLEnumType({
          name: 'ProjectStatusUpdate',
          values: {
            new: { value: 'Not Started' },
            progress: { value: 'In Progress' },
            completed: { value: 'Completed' }
          }
        })
      }
    },
    resolve(parent, { id, name, description, status }) {
      return Project.findByIdAndUpdate(
        id,
        {
          $set: {
            name,
            description,
            status
          }
        },
        { new: true }
      )
    }
  }
}
