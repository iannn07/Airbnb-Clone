import Form from '@/components/Form'
import UserList from '@/components/UserList'
import { fetchUser } from '@/utils/CreateUser'

async function CreateUserPage() {
  const userData = await fetchUser()

  return (
    <>
      <Form />
      <UserList userData={userData} />
    </>
  )
}

export default CreateUserPage
