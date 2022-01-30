export type Predicate<a> = (x:a) => boolean
export type Mapper<a, b> = (x:a) => b

export function * range (start:number = 0, stop:number, step:number = 1) {
  for (let i = start; i < stop; i += step) {
    yield i
  }
}

export const compose = <T1, T2> (fn1:(arg0:any)=>T2, fn2:Function, ...fns:Function[]) => (input:T1):T2 => [fn1, fn2, ...fns].reverse().reduce((acc, fn) => fn(acc), input)

export const map = <a, b> (fn: Mapper<a, b>) => function * (arr: Iterable<a>) {
  for (const elem of arr) {
    yield fn(elem)
  }
}

export const filter = <a>(pred: Predicate<a>) => function * (arr: Iterable<a>) {
  for (const elem of arr) {
    if (pred(elem)) {
      yield elem
    }
  }
}

export const take = <a>(n:number) => function * (arr: Iterable<a>) {
  let i = 0
  for (const elem of arr) {
    yield elem
    if (++i >= n) break
  }
}

export const drop = <a>(n:number) => function * (arr: Iterable<a>) {
  let i = 0
  for (const elem of arr) {
    if (++i <= n) continue
    yield elem
  }
}

export const collect = <T>(arr:Iterable<T>):Array<T> => {
  return Array.from(arr)
}

export const head = compose(arr => arr[0], collect, take(1))
export const tail = drop(1)
export const elemAt = (x:number) => compose(head, drop(x))

export const dropWhile = <a>(pred:Predicate<a>) => function * (arr: Iterable<a>) {
  let match = true
  for (const elem of arr) {
    match = match && pred(elem)

    if (match) {
      continue
    }

    yield elem
  }
}

export const takeWhile = <a>(pred:Predicate<a>) => function * (arr: Iterable<a>) {
  let match = true
  for (const elem of arr) {
    match = match && pred(elem)

    if (!match) break

    yield elem
  }
}

export const not = <a>(pred:Predicate<a>) => (x:a) => !pred(x)
export const odd:Predicate<number> = x => x % 2 === 1
export const even:Predicate<number> = x => x % 2 === 0
export const len = <T>(x:Array<T>|String):number => x ? x.length : 0

export const gt = (x:number) => (y:number) => y > x
export const lt = (x:number) => (y:number) => y < x
export const gte = (x:number) => (y:number) => y >= x
export const lte = (x:number) => (y:number) => y <= x
export const eq = (x:number) => (y:number) => y === x

export const find = <a>(pred:Predicate<a>) => compose(head, filter(pred))
