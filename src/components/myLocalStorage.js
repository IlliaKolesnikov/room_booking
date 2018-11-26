class storage {
  get(name) {
    return JSON.parse(localStorage.getItem(`${name}`))
  }

  put(name, value) {
    localStorage.setItem(`${name}`, JSON.stringify(value))
  }
}

export default new storage()
