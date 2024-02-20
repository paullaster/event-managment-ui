class SetupCache {
  setItems(key, items) {
    let data = {
      items: items,
      ttl: new Date(),
    };

    window.localStorage.setItem(key, JSON.stringify(data));
  }

  hasItems(key) {
    this.isExpired(key);
    // eslint-disable-next-line no-prototype-builtins
    return window.localStorage.hasOwnProperty(key);
  }

  getItems(key) {
    let data = JSON.parse(window.localStorage.getItem(key));
    return data ? data.items : null;
  }

  isExpired(key) {
    let data = JSON.parse(window.localStorage.getItem(key));
    if (data && new Date().getHours() !== new Date(data.ttl).getHours()) {
      window.localStorage.removeItem(key);
    }
  }
}

export default new SetupCache();
