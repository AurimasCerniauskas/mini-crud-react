function getId(key){
  let id = localStorage.getItem(key + '_id');
  // console.log(id);
  if(id === null){
    id = 0;
  }else{
    id = parseInt(id);
  }
  id++;
  localStorage.setItem(key+'_id', id);
  // console.log(id);
  return id;
}

function readData(key){
  const data = localStorage.getItem(key);
  if (data === null){
    localStorage.setItem(key, JSON.stringify([]));
    return [];
  }
  return JSON.parse(data);
}

function write(key, data){
  localStorage.setItem(key, JSON.stringify(data));
}

//crud

export function create(key, data){
  const d = readData(key);
  data.id = getId(key);
  d.push(data);
  write(key, d);
}

export function read(key){
  return readData(key);
}

export function update(key, data, id){
  const d = readData(key);
  write(key, d.map(row => row.id !== id ? {...row} : {...row, ...data, id: id}));

}

export function destroy(key, id){
  const d = readData(key);
  write(key, d.filter(row => row.id !== id));
}