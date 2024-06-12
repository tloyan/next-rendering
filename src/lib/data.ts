//import 'server-only'
export async function getData() {
  //access here :http://localhost:3000/_next/static/chunks/app/exercises/rcc/page.js
  const secretKey = '#######_this_is_a_secret_key_#######'
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    headers: {
      authorization: secretKey,
    },
  })

  return res.json()
}
