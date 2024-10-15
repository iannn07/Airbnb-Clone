import DeleteButtonBind from './DeleteButtonBind'
import DeleteButtonHiddenInput from './DeleteButtonHiddenInput'

interface userData {
  id?: string
  name: string
  email: string
  password: string
}

interface UserListProps {
  userData: userData[]
}

function UserList({ userData }: UserListProps) {
  return (
    <div className='flex flex-col gap-10'>
      {userData.length > 0 ? (
        userData.map((user) => (
          <div className='flex gap-5' key={user.id}>
            <div className='flex flex-col gap-2'>
              <label htmlFor='id'>ID</label>
              <label htmlFor='name'>Name</label>
              <label htmlFor='email'>Email</label>
              <label htmlFor='password'>Password</label>
            </div>
            <div className='flex flex-col gap-2'>
              <p>{user.id}</p>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.password}</p>
            </div>
            <div className='flex gap-2'>
              <DeleteButtonHiddenInput id={user.id!} />
              <DeleteButtonBind id={user.id!} />
            </div>
          </div>
        ))
      ) : (
        <p>No users found... Please create one</p>
      )}
    </div>
  )
}

export default UserList
