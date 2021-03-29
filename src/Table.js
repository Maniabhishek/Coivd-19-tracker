import React from 'react'
import './table.css'

function Table({countries}) {
    return (
        <div className="Table">
            {/* destructured it nothing big we could have used it like country.country or country.cases */}
            {countries.map(({country,cases})=>(
                <tr>
                    <td>{country}</td>
                    <td>
                        <strong>{cases}</strong>
                    </td>
                </tr>
            ))
                
            }
        </div>
    );
}

export default Table
