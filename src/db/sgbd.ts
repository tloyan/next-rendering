// DO NOT EDIT THIS FILE //
import {
  AddTodo,
  AddUser,
  CategoriesEnum,
  Post,
  Product,
  RoleEnum,
  Session,
  Todo,
  User,
} from '@/lib/type'
import {JSONFilePreset} from 'lowdb/node'

const randomError = false
const slowConnexion = true
const serverResponseTime = 2000

type BddDataType = {
  posts?: Post[]
  products?: Product[]
  todos?: Todo[]
  users?: User[]
  sessions?: Session[]
}

const defaultData: BddDataType = {
  posts: [{id: '1', title: 'Default post'}],
  products: [
    {
      id: '1',
      title: 'Default product',
      price: 199,
      quantity: 19,
      category: CategoriesEnum.lighting,
      createdAt: '2024-04-24T05:56:06.593Z',
      updadtedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'IPhone',
      price: 1490,
      quantity: 4,
      category: CategoriesEnum.furniture,
      createdAt: '2024-04-25T05:56:06.593Z',
      updadtedAt: new Date().toISOString(),
    },
  ],
  todos: [
    {
      id: 1,
      title: 'Apprendre React',
      isCompleted: true,
      createdAt: new Date().toISOString(),
      updadtedAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'Apprendre Next',
      isCompleted: false,
      createdAt: new Date().toISOString(),
      updadtedAt: new Date().toISOString(),
    },
  ],
  users: [
    {
      id: '1',
      email: 'a@a.fr',
      password: '$2b$10$ctVHPcQ6RdTSIYnxUVbj6uzjbe9P1Cmku.vcon9uLj4I/xYpXGwvO', //pass = a
      name: 'John',
      role: RoleEnum.USER,
    },
  ],
  sessions: [
    {sessionId: '1', userId: '1', expiresAt: new Date().toISOString()},
  ],
}

export default async function lowDb() {
  return initDb()
}
// initialise db with default data and file creation
async function initDb() {
  const db = await JSONFilePreset('./src/db/db.json', defaultData)
  if (db.data.posts?.length === 1) {
    db.update(({posts}: BddDataType) =>
      posts?.push({id: '2', title: 'Un post'})
    )
  }

  return db
}

export async function getTodos() {
  const db = await lowDb()
  const {todos} = db.data
  return todos
}

export async function addTodo(todo: AddTodo) {
  await simulateUnstableServer()
  const db = await lowDb()
  await db.update(({todos}) => {
    todos?.push({
      id: todo.id ?? todos.length + 1,
      title: todo.title,
      isCompleted: todo.isCompleted,
      createdAt: todo.createdAt ?? new Date().toISOString(),
      updadtedAt: todo.updadtedAt ?? new Date().toISOString(),
    })
  })
}
export async function updateTodo(todo: Todo) {
  await simulateUnstableServer()
  todo.updadtedAt = new Date().toISOString()
  const db = await lowDb()
  await db.update(({todos}) => {
    updateById(todos ?? [], todo)
  })
}
//PRODUCTS
export async function getProducts() {
  console.log('getProducts dao')
  const db = await lowDb()
  const {products} = db.data
  return sortByDate(products, 'asc')
}

export async function addProduct(product: Product) {
  console.log('addProduct', product)
  await simulateUnstableServer({slow: true})
  const db = await lowDb()
  await db.update(({products}) => {
    products?.push({
      id: `${products.length + 1}`,
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
      quantity: product.quantity,
      createdAt: product.createdAt ?? new Date().toISOString(),
      updadtedAt: product.updadtedAt ?? new Date().toISOString(),
    })
  })
}

export async function persistProduct(product: Product) {
  console.log(typeof product.id)
  await (product.id ? updateProduct(product) : addProduct(product))
}

export async function updateProduct(product: Product) {
  console.log('updateProduct', product)
  await simulateUnstableServer({slow: true})
  product.updadtedAt = product.updadtedAt ?? new Date().toISOString()
  const db = await lowDb()
  await db.update(({products}) => {
    updateById(products ?? [], product)
  })
}

export async function deleteProduct(id: string) {
  console.log('deleteProduct', id)
  const db = await lowDb()
  await db.update(({products}) => {
    deleteById(products ?? [], id)
  })
}

export async function getProductById(id: string) {
  console.log('getProductById', id)
  const db = await lowDb()
  const {products} = db.data
  return products?.find((product) => product.id === id)
}

export async function getProductByName(name: string) {
  console.log('getProductByName', name)
  const db = await lowDb()
  const {products} = db.data
  const lowerCaseName = name.toLowerCase()
  return products?.find(
    (product) => product.title.toLowerCase() === lowerCaseName
  )
}

interface Identifiable {
  id: number | string
}

// Fonction générique pour mettre à jour un élément dans un tableau
function updateById<T extends Identifiable>(items: T[], updatedItem: T): void {
  const index = items.findIndex((item) => item.id === updatedItem.id)
  if (index === -1) {
    throw new Error(`Item with id ${updatedItem.id} not found`)
  } else {
    items[index] = updatedItem
  }
}

// Fonction générique pour supprimer un élément dans un tableau
function deleteById<T extends Identifiable>(
  items: T[],
  itemId: number | string
): void {
  const index = items.findIndex((item) => item.id === itemId)
  if (index === -1) {
    throw new Error(`Item with id ${itemId} not found`)
  } else {
    items.splice(index, 1)
  }
}

interface Sortable {
  createdAt?: string
  updatedAt?: string
}

function sortByDate<T extends Sortable>(
  items?: T[],
  sortOrder: 'asc' | 'desc' = 'asc'
): T[] {
  if (!items) {
    return []
  }
  return items.toSorted((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt) : new Date()
    const dateB = b.createdAt ? new Date(b.createdAt) : new Date()
    const result = dateA.getTime() - dateB.getTime()
    return sortOrder === 'asc' ? result : -result
  })
}

export async function getPosts() {
  const externalData = false
  const data = await fetch('https://jsonplaceholder.typicode.com/posts')
  const postsAPi: Post[] = await data.json()
  const db = await lowDb()
  const posts = externalData ? (postsAPi ?? []) : (db.data.posts ?? [])
  // experimental_taintObjectReference(
  //   'Do not pass the entire user object to the client. ' +
  //     'Instead, pick off the specific properties you need for this use case.',
  //   posts as object
  // )
  return posts
}

export async function addPost(post: Post) {
  console.log('addPost', post)
  //await simulateUnstableServer({slow: true})
  const db = await lowDb()
  await db.update(({posts}) => {
    posts?.push({
      id: `${posts.length + 1}`,
      title: post.title,
    })
  })
}
export async function getPostById(id: string) {
  console.log('getPostById', id)
  const db = await lowDb()
  const {posts} = db.data
  return posts?.find((post) => post.id === id)
}

async function simulateUnstableServer({
  slow = slowConnexion,
  random = randomError,
  serverTime = serverResponseTime,
}: {slow?: boolean; random?: boolean; serverTime?: number} = {}) {
  if (slow) {
    await new Promise((resolve) => setTimeout(resolve, serverTime))
  }
  if (Math.random() > 0.5 && random) {
    throw new Error('Internal server error')
  }
}

//user

export async function addUser(user: AddUser) {
  console.log('addUser', user)
  //await simulateUnstableServer({slow: true})
  const db = await lowDb()
  user.id = user.id ?? `${(db.data.users?.length ?? 0) + 1}`
  const newUser: User = {
    id: `${(db.data.users?.length ?? 0) + 1}`,
    email: user.email,
    password: user.password,
    name: user.name,
    role: user.role,
  }
  await db.update(({users}) => {
    users?.push(newUser)
  })
  return newUser
}
export async function updateUser(user: User) {
  console.log('updateUser', user)
  await simulateUnstableServer({slow: true})
  //user.updadtedAt = user.updadtedAt ?? new Date().toISOString()
  const db = await lowDb()
  await db.update(({users}) => {
    updateById(users ?? [], user)
  })
}

export async function updateUserRole(email: string, role: RoleEnum) {
  console.log('updateUserRole', role)
  //await simulateUnstableServer({slow: true})
  const user = await getUserByEmail(email)
  if (!user) {
    throw new Error('User not found')
  }
  user.role = role
  await updateUser(user)
}

export async function getUserByEmail(email: string) {
  const db = await lowDb()
  const users = db.data.users ?? []
  // eslint-disable-next-line unicorn/no-null
  const user = users.find((u) => u.email === email) ?? null
  return user
}
export async function getUserById(id: string) {
  console.log('getUserById', id)
  const db = await lowDb()
  const users = db.data.users ?? []
  return users?.find((user) => user.id === id)
}

export async function addSession(session: Session) {
  console.log('addSession', session)
  //await simulateUnstableServer({slow: true})
  const db = await lowDb()
  await db.update(({sessions}) => {
    sessions?.push({
      sessionId: session.sessionId,
      userId: session.userId,
      expiresAt: session.expiresAt,
    })
  })
}

export async function updateSession(session: Session) {
  console.log('updateSession', session)
  //await simulateUnstableServer({slow: true})
  //user.updadtedAt = user.updadtedAt ?? new Date().toISOString()
  const db = await lowDb()
  await db.update(({sessions}) => {
    const index =
      sessions?.findIndex((item) => item.sessionId === session.sessionId) ?? -1
    if (index === -1) {
      throw new Error(`Item with id ${session.sessionId} not found`)
    } else {
      sessions ? (sessions[index] = session) : undefined
    }
  })
}

export async function findSession(sessionId: string) {
  console.log('findSessionDao', sessionId)
  const db = await lowDb()
  const sessions = db.data.sessions ?? []
  // eslint-disable-next-line unicorn/no-null
  const user = sessions.find((u) => u.sessionId === sessionId) ?? null
  return user
}
