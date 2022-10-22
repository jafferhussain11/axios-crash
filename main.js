//AXIOS GLOBAL
axios.defaults.headers.common['X-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

// GET REQUEST
function getTodos() {

  // console.log('GET Request');
  // axios({

  //   method : 'get',
  //   url: 'https://jsonplaceholder.typicode.com/todos',
  //   params: {

  //       _limit:20
  //   }
  // }).then(res=>showOutput(res))
  // .catch(err=>console.log(err));
  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=20')
  .then((res) => showOutput(res))
  .catch(err => console.log(err));


}

// POST REQUEST
function addTodo() {
  console.log('POST Request');
  axios({

      method : 'post',
      url :'https://jsonplaceholder.typicode.com/todos',
      data : {

        title :'OUR TODO',
        completed: false
      }

  }).then((res)=>showOutput(res))
  .catch((err)=>console.log(err));
}

// PUT/PATCH REQUEST//put replaces the 
function updateTodo() {
  console.log('PUT/PATCH Request');
  axios({

    method : 'patch',
    url : 'https://jsonplaceholder.typicode.com/todos/2',
    data: {

      title :'MY TODO',
      completed: false
    }

  }).then((res)=>showOutput(res))
  .catch((err)=>console.log(err));
}

// DELETE REQUEST
function removeTodo() {
  console.log('DELETE Request');
  axios.delete('https://jsonplaceholder.typicode.com/todos/2')
  .then((res)=>showOutput(res))
  .catch((err)=>console.log(err));
}

// SIMULTANEOUS DATA//simultaneous api calls
function getData() {
  console.log('Simultaneous Request');
  axios.all([

    axios.get('https://jsonplaceholder.typicode.com/todos'),
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=30')
  ])
    .then(res => {

      console.log(res[0]);
      console.log(res[1]);
      showOutput(res[1]);

    })
    .catch(err => console.log(err));

}
//creating interceptors/loggers ??


// CUSTOM HEADERS
function customHeaders() {
  console.log('Custom Headers');
  const config ={

    headers : {

      'content-Type' : 'application/json',
      Authorization : 'sometoken'
    }
  };
  axios.post('https://jsonplaceholder.typicode.com/todos',
  {
    title : 'NEW TODO',
    completed : false
  },
  config
  )
  .then(res=>showOutput(res))
  .catch(err=>console.log(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  console.log('Transform Response');
}

// ERROR HANDLING
function errorHandling() {
    
  axios.get('https://jsonplaceholder.typicode.com/todos')
  .then((res)=>showOutput(res))
  .catch(err=>{

    if(err.response){

      //server responded with status other than 200 rage
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);

    }
    else if(err.request){
      //request was made but no resp
      console.log(err.request);
    }else{

      console.log(err.message);
    }

  })
}

// CANCEL TOKEN
function cancelToken() {
}

// INTERCEPTING REQUESTS & RESPONSES

axios.interceptors.request.use(

  (config)=>{

    console.log(

        `${config.method.toUpperCase()} request sent to ${
          
          config.url
        } at ${new Date().getTime()}`
    );

    return config;
  },
  (error) => {

    return Promise.reject(error);
  }
)



// AXIOS INSTANCES

const axiosInstance = axios.create({

    baseURL: 'https://jsonplaceholder.typicode.com'
});

axiosInstance.get('/comments').then(res=>showOutput(res));

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
