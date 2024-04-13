
import React from 'react';
import DataTable from 'react-data-table-component';

export default function Table() {
    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true
        },
        {
            name: 'Year',
            selector: row => row.year,
            sortable: true
        },
        {
            name: 'Actions',
            cell: row => (
                <div>
                    <button onClick={() => handleEdit(row)}>Edit</button>
                    <button onClick={() => handleDelete(row)}>Delete</button>
                </div>
            ),
            button: true
        }
    ];

    const data = [
        {
            id: 1,
            title: 'Beetlejuice',
            year: '1988',
        },
        {
            id: 2,
            title: 'Ghostbusters',
            year: '1984',
        },
        {
            id: 3,
            title: 'Another Movie',
            year: '1990',
        }
    ];

    const handleEdit = (row) => {
        // Handle edit action
        console.log("Edit:", row);
    };

    const handleDelete = (row) => {
        // Handle delete action
        console.log("Delete:", row);
    };

    return (
        <div className="container mt-5">
            <DataTable
                columns={columns}
                data={data}
                pagination
                selectableRows
            />
        </div>
    );
}
