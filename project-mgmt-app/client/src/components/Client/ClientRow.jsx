import { useMutation } from '@apollo/client'
import { FaTrash } from 'react-icons/fa'

import { DELETE_CLIENT } from '../../graphql/mutations/clientMutations'
import { GET_CLIENTS } from '../../graphql/queries/clientQueries'

const ClientRow = ({ client }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    // variable as paremeters to pass in to functions
    variables: { id: client.id },

    // #Method 1 , refetching query without any cache
    // refetchQueries: [{ query: GET_CLIENTS }],

    // #Method 2, update query with use of catche (better performance)
    update(cache, { data: { deleteClient } }) {
      const { clients } = cache.readQuery({
        query: GET_CLIENTS
      })

      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter((client) => client.id !== deleteClient.id)
        }
      })
    }
  })

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className='btn btn-danger btn-sm' onClick={deleteClient}>
          <FaTrash />
        </button>
      </td>
    </tr>
  )
}

export default ClientRow
