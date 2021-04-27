

export default function (data, message) {

  if (data > 50000 || data == null) {

    // Notify({type: 'warning', message: (message || '请求异常'), duration: 900,})
    return false;
  }
  return true;
}
