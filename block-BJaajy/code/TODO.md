- Create four promises that resolve after 1, 2, 3 and 4 seconds with a random value. Using `Promise.all` log the value of each promise that it resolved with.
let promise1= new Promise((res,rej)=>{
  setTimeout(()=>{
    res(3)
  },1000)
})
let promise2= new Promise((res,rej)=>{
  setTimeout(()=>{
    res(3)
  },2000)
})
let promise3= new Promise((res,rej)=>{
  setTimeout(()=>{
    res(3)
  },3000)
})
let promise4= new Promise((res,rej)=>{
  setTimeout(()=>{
    res(3)
  },4000)
})

Promise.all(promise1,promise2,promise3,promise4)
- Create a list of 5 Github usernames in an array and using `Promise.all` get access to the data of each user from GitHub API. Log the number of followers of each user.

let username=[
  "shaziya5416",
  "shaziya5416",
  "shaziya5416",
  "shaziya5416",
  "shaziya5416"
];

const something=Promises.all(username.map((user)=>fetch(`https://api.github.com/users/${user}`).then(res=>res.json()).then((user)=>console.log(users)))

- Use `Promise.race` to see which API resolves faster from the given list of URLs. Log the object you get from the promise that is resolved faster.

  - https://random.dog/woof.json
  - https://aws.random.cat/meow

let urlList = [`https://random.dog/woof.json`, `https://aws.random.cat/meow`];

Promise.race(urlList.map((url) => fetch(url))).then(console.log);

- Use `Promise.allSettled` to log the value of each promise from the given list of promises. And also check if `Promise.all` works with `one`, `two` and `three` or not

```js
const one = new Promise((resolve, reject) =>
  setTimeout(() => resolve('Arya'), 1000)
);
const two = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error('Whoops!')), 2000)
);
const three = new Promise((resolve, reject) =>
  setTimeout(() => resolve('John'), 3000)
);
```
Promise.allSettled([one, two, three]).then((data) =>
  console.log(data,'allSettled')
);
//wont work with all beacuse on epromise is rejected and hence error will come up

- What will be the output of the following code snippet? How much time will it take for the promise to resolve?

```js
let promise1=Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('Arya'), 1000);
  }),
  'Sam',
  { name: 'John' },
]).then(console.log);
```

//['Arya', 'Sam', {…}]
