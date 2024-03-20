const info = (...params: any[]) => {
  console.log(...params)
}

const error = (...params: any[]) => {
  console.error('Error', ...params)
}
export default { info, error };