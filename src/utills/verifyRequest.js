

export default function (data, message) {
  console.log(data)
  if (data > 201 || data == null) {
    // Notify({type: 'warning', message: (message || '请求异常'), duration: 900,})
    return false;
  }
  return true;
}
