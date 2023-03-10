import { Dispatch, SetStateAction, useState } from 'react'
import Draggable from './Draggable'
import { arrayMove } from './array-move'

export interface DraggableItem {
  id: string | number
}

export interface DraggableItems {
  items: Array<DraggableItem | any>

  setItems: Dispatch<SetStateAction<any>>

  children?: React.ReactNode

  component: (item: any) => JSX.Element
}

const SortableList = ({ items, setItems, component }: DraggableItems) => {
  const [dragId, setDragId] = useState('')

  const onDrop = (ev: { currentTarget: { id: any } }, item: any) => {
    let currentPos = 0,
      droppedPos = 0

    for (let i = 0; i < items.length; i++) {
      if (dragId === items[i].id) {
        currentPos = i
      }

      if (ev.currentTarget.id === items[i].id) {
        droppedPos = i
      }
    }

    const newItems = arrayMove([...items], currentPos, droppedPos)
    setItems(newItems)
  }

  const onDragStart = (ev: any, item: { id: SetStateAction<string> }) => {
    setDragId(item.id)
  }

  const renderComponent = (
    componentJsx: (item: any) => JSX.Element,
    item: any,
    setItems: Dispatch<SetStateAction<any>>,
    index: number
  ) => {
    const Component = componentJsx

    return <Component item={item} index={index} setItems={setItems} />
  }

  return (
    <>
      {items.map((item, index) => (
        <Draggable key={index} id={item.id} onDrop={onDrop} onDragStart={onDragStart} item={item}>
          {renderComponent(component, item, setItems, index)}
        </Draggable>
      ))}
    </>
  )
}

export default SortableList
