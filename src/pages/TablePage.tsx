import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table'
import type { ColumnDef, SortingState, ColumnFiltersState } from '@tanstack/react-table'
import { Button, Input } from '../components'
import type { TableData } from '../types'

// Mock data - replace with actual API call
const fetchTableData = async (): Promise<TableData[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        Array.from({ length: 50 }, (_, i) => ({
          id: `${i + 1}`,
          name: `User ${i + 1}`,
          email: `user${i + 1}@example.com`,
          role: ['Admin', 'User', 'Manager'][i % 3],
          status: ['Active', 'Inactive'][i % 2],
        }))
      )
    }, 500)
  })
}

const columns: ColumnDef<TableData>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
]

export const TablePage = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const { data = [], isLoading } = useQuery({
    queryKey: ['tableData'],
    queryFn: fetchTableData,
  })

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  if (isLoading) {
    return <div className="flex justify-center items-center h-64 text-gray-900 dark:text-white">Loading...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Table</h2>
        <Input
          placeholder="Search..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() && (
                        <span className="ml-2">
                          {header.column.getIsSorted() === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <Button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              variant="secondary"
            >
              Previous
            </Button>
            <Button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              variant="secondary"
            >
              Next
            </Button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing{' '}
                <span className="font-medium">
                  {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
                </span>{' '}
                to{' '}
                <span className="font-medium">
                  {Math.min(
                    (table.getState().pagination.pageIndex + 1) *
                      table.getState().pagination.pageSize,
                    table.getFilteredRowModel().rows.length
                  )}
                </span>{' '}
                of <span className="font-medium">{table.getFilteredRowModel().rows.length}</span>{' '}
                results
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                variant="secondary"
                size="sm"
              >
                First
              </Button>
              <Button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                variant="secondary"
                size="sm"
              >
                Previous
              </Button>
              <Button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                variant="secondary"
                size="sm"
              >
                Next
              </Button>
              <Button
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                variant="secondary"
                size="sm"
              >
                Last
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
