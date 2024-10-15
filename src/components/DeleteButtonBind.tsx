import { deleteBindUser } from '@/utils/CreateUser'

function DeleteButtonBind({ id }: { id: string }) {
  const removeUserWithId = deleteBindUser.bind(null, id)
  return (
    <form action={removeUserWithId}>
      <input type='hidden' name='name' value='shakeAndBake' />
      <button type='submit' className='bg-red-500 text-white rounded px-3 py-2'>
        Delete with Bind
      </button>
    </form>
  )
}

export default DeleteButtonBind
