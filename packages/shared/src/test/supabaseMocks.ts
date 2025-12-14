export function makeClientWithSingle(result: unknown) {
  function single() {
    return Promise.resolve(result);
  }
  function select() {
    return { single };
  }
  function insert() {
    return { select };
  }
  function from() {
    return { insert };
  }
  return { from };
}

export function makeClientSelectEqSingle(result: unknown) {
  function single() {
    return Promise.resolve(result);
  }
  function eq() {
    return { single };
  }
  function select() {
    return { eq };
  }
  function from() {
    return { select };
  }
  return { from };
}

export function makeClientOrderRange(result: unknown) {
  function range() {
    return Promise.resolve(result);
  }
  function order() {
    return { range };
  }
  function select() {
    return { order };
  }
  function from() {
    return { select };
  }
  return { from };
}

export function makeClientOrderAsync(result: unknown) {
  function order() {
    return Promise.resolve(result);
  }
  function select() {
    return { order };
  }
  function from() {
    return { select };
  }
  return { from };
}

export function makeClientUpdateEqSelectSingle(result: unknown) {
  function single() {
    return Promise.resolve(result);
  }
  function select() {
    return { single };
  }
  function eq() {
    return { select };
  }
  function update() {
    return { eq };
  }
  function from() {
    return { update };
  }
  return { from };
}

export function makeClientDeleteEqSelectSingle(result: unknown) {
  function single() {
    return Promise.resolve(result);
  }
  function select() {
    return { single };
  }
  function eq() {
    return { select };
  }
  function del() {
    return { eq };
  }
  function from() {
    return { delete: del };
  }
  return { from };
}

export function makeClientEqOrder(result: unknown) {
  function order() {
    return Promise.resolve(result);
  }
  function eq() {
    return { order };
  }
  function select() {
    return { eq };
  }
  function from() {
    return { select };
  }
  return { from };
}
