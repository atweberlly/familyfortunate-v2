/**
 * Move an array to different position.
 *
 * @param  arr
 * @param  oldIndex
 * @param  newIndex
 */
export function arrayMove(arr: Array<any>, oldIndex: number, newIndex: number) {
  if (newIndex >= arr.length) {
    let k = newIndex - arr.length + 1
    while (k--) {
      arr.push(undefined)
    }
  }

  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0])

  return arr
}
