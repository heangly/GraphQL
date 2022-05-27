const graphql = require('graphql')
const axios = require('axios')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} = graphql

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve: async (parentValue, args) => {
        const { data } = await axios.get(
          `http://localhost:3000/companies/${parentValue.id}/users`
        )
        return data
      }
    }
  })
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve: async (parentValue, args) => {
        const { data } = await axios.get(
          `http://localhost:3000/companies/${parentValue.companyId}`
        )
        return data
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve: async (parentValue, args) => {
        const { data } = await axios.get(
          `http://localhost:3000/users/${args.id}`
        )
        return data
      }
    },

    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve: async (parentValue, args) => {
        const { data } = await axios.get(
          `http://localhost:3000/companies/${args.id}`
        )
        return data
      }
    }
  }
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString }
      },
      resolve: async (parentValue, { firstName, age }) => {
        const { data } = await axios.post(`http://localhost:3000/users`, {
          firstName,
          age
        })
        return data
      }
    },

    deleteUser: {
      type: UserType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parentValue, { userId }) => {
        const { data } = await axios.delete(
          `http://localhost:3000/users/${userId}`
        )
        return { ...data, id: userId }
      }
    },

    editUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        age: { type: GraphQLString },
        companyId: { type: GraphQLString }
      },
      resolve: async (parentValue, args) => {
        const { data } = await axios.patch(
          `http://localhost:3000/users/${args.id}`,
          args
        )
        return data
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
})
