// const b=12
// function show(){
//     console.log(b)
// }
// show()

// const element = {
//   type: "h1",
//   props: {
//     title: "foo",
//     children: "Hello"}
// }
// ​
// const container = document.getElementById("root")
// ​
// const node = document.createElement(element.type)
// node["title"] = element.props.title
// ​
// const text = document.createTextNode("")
// text["nodeValue"] = element.props.children

// create element function


function createTextElement(text) {
    return {
      type: "TEXT_ELEMENT",
      props: {
        nodeValue: text,
        children: [],
      },
    }
  }

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children:children.map(child=>
        typeof(child)==='object' ? child: createTextElement(child)),
    },
  }
}

function render(element, container) {
  const dom =
    element.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type)
  const isProperty = key => key !== "children" 
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name]
    })
  element.props.children.forEach(child =>
    render(child, dom)
  )
  container.appendChild(dom)
}


const reactLib = {
    createElement,
    render,
}

/** @jsx Didact.createElement */
const element = (
    <div id="foo">
      <a>bar</a>
      <b />
    </div>)

const container = document.getElementById("root")
reactLib.render(element, container)