
function forEachObject(obj, fn) {
  let i = 0;
  for (let key in obj) {
    fn(obj[key], key, i);
    i++;
  }
}
