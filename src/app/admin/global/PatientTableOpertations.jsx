import Filter from '@/app/components/Filter'
import TableOperations from '@/app/components/TableOperations'
import React from 'react'
import { BrowserRouter } from 'react-router-dom';

export default function PatientTableOpertations(searchBar) {
  return (
    <TableOperations searchBar={searchBar}>
      <BrowserRouter>
        <Filter searchBar={searchBar}/>
      </BrowserRouter>
    </TableOperations>
  )
}
