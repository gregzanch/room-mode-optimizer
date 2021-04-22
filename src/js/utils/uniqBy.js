export function uniqBy(fn, obj){
  const s = new Set();
  const a = [];
  for(let i = 0; i<obj.length; i++){
    const key = fn(obj[i]);
    if(!s.has(key)){
      s.add(key);
      a.push(obj[i]);
    }
  }
  return a;
}

export default uniqBy;