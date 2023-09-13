const React = require('react')
const Default = require('./layouts/default')

function Show ({bread, id}) {
    console.log(bread.baker)
    // Confirm we are getting our bread data in the terminal.
    return (
        <Default>
            <h3>{bread.name}</h3>
            <p>
                and it
                {
                    bread.hasGluten
                        ? <span> does </span>
                        : <span> does NOT </span>
                }
                have gluten.
            </p>
            <img src={bread.image} alt={bread.name} />
            <p>Baked by {bread.baker.name}</p>
            <p>{bread.getBakedBy()}</p>
            <a href={`/breads/${id}/edit`}><button>Edit</button></a>
            <form action={`/breads/${id}?_method=DELETE`} method="POST">
                <input type='submit' value="DELETE"/>
            </form>
            <li><a href="/breads">Go home</a></li>
        </Default>
    )
}


module.exports = Show
