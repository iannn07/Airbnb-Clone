import { deleteUser } from '@/utils/CreateUser'

function DeleteButtonHiddenInput({ id }: { id: string }) {
  return (
    <form action={deleteUser}>
      <input type='hidden' name='id' value={id} />
      <button type='submit' className='bg-red-500 text-white rounded px-3 py-2'>
        Delete with HiddenInput
      </button>
    </form>
  )
}

export default DeleteButtonHiddenInput
