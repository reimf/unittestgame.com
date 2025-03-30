// make tests predictable and faster (resulting in setTimeout(functionRef, 0))
Math.random = () => 0
