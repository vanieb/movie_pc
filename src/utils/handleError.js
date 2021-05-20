export function handleError(errors) {
  if (Array.isArray(errors)) {
    return errors.map(error => {
      if (typeof error === 'string') {
        return error
      } else if (typeof error === 'object') {
        let arr = []
        Object.keys(error).forEach(key => {
          arr = [...arr, `${key} : ${error[key]}`]
        })
        return arr.join('\n')
      }
    }).join('\n')
  } else if (typeof errors === 'string') {
    return errors
  }
  return ''
}
