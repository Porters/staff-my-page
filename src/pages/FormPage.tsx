import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import type { Control } from 'react-hook-form'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button, Input, DatePicker } from '../components'
import type { FormField } from '../types'

interface FormData {
  [key: string]: string
}

interface FormFieldComponentProps {
  field: FormField
  control: Control<FormData>
}

const SortableFormField = ({ field, control }: FormFieldComponentProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: field.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="mb-4 p-4 bg-white border border-gray-200 rounded-lg"
    >
      <div className="flex items-center gap-2 mb-2">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="cursor-move text-gray-400 hover:text-gray-600"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 4a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 4a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 4a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
          </svg>
        </button>
        <span className="font-medium text-gray-700">{field.label}</span>
      </div>
      <Controller
        name={field.id}
        control={control}
        rules={{ required: field.required ? `${field.label} is required` : false }}
        render={({ field: formField, fieldState }) => {
          if (field.type === 'date') {
            return (
              <DatePicker
                value={formField.value ? new Date(formField.value) : null}
                onChange={(date) => formField.onChange(date ? date.toISOString() : '')}
                label=""
                error={fieldState.error?.message}
                placeholder={field.placeholder}
              />
            )
          }
          if (field.type === 'select') {
            return (
              <select
                {...formField}
                value={formField.value || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select...</option>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )
          }
          if (field.type === 'textarea') {
            return (
              <textarea
                {...formField}
                value={formField.value || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={4}
                placeholder={field.placeholder}
              />
            )
          }
          return (
            <Input
              {...formField}
              type={field.type}
              error={fieldState.error?.message}
              placeholder={field.placeholder}
            />
          )
        }}
      />
    </div>
  )
}

export const FormPage = () => {
  const [formFields, setFormFields] = useState<FormField[]>([
    { id: '1', type: 'text', label: 'Name', placeholder: 'Enter name', required: true, order: 0 },
    { id: '2', type: 'text', label: 'Email', placeholder: 'Enter email', required: true, order: 1 },
    { id: '3', type: 'date', label: 'Start Date', required: false, order: 2 },
    {
      id: '4',
      type: 'select',
      label: 'Department',
      options: [
        { label: 'IT', value: 'it' },
        { label: 'HR', value: 'hr' },
        { label: 'Finance', value: 'finance' },
      ],
      required: false,
      order: 3,
    },
    {
      id: '5',
      type: 'textarea',
      label: 'Notes',
      placeholder: 'Enter notes',
      required: false,
      order: 4,
    },
  ])

  const { control, handleSubmit, reset } = useForm<FormData>()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setFormFields((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const onSubmit = (_data: FormData) => {
    // TODO: Handle form submission - send to API
    alert('Form submitted successfully!')
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Dynamic Form</h2>
        <p className="text-sm text-gray-600 mt-2">Drag and drop fields to reorder them</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={formFields.map((f) => f.id)}
            strategy={verticalListSortingStrategy}
          >
            {formFields.map((field) => (
              <SortableFormField key={field.id} field={field} control={control} />
            ))}
          </SortableContext>
        </DndContext>

        <div className="flex gap-4 pt-4">
          <Button type="submit">Submit</Button>
          <Button type="button" variant="secondary" onClick={() => reset()}>
            Reset
          </Button>
        </div>
      </form>
    </div>
  )
}
