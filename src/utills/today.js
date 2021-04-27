export function today(){
  let date = new Date();
  let year = date.getFullYear()
  let month = (date.getMonth()+1)<10?'0'+ (date.getMonth()+1): (date.getMonth()+1)
  let day = date.getDate()<10?'0'+date.getDate():date.getDate()
  return `${year}-${month}-${day}`
}
