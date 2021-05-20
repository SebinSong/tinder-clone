// resolves the Promise after ms passed
function Sleep (ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms)
  })
}

export default Sleep