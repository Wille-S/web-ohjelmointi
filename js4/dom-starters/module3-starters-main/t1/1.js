const list = document.querySelector("#target")
const html = `
    <li>First item</li>
    <li>Second item</li>
    <li>Third item</li>
`

list.innerHTML = html
list.classList.add("my-list")