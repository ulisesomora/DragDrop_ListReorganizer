import './App.css'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";

const initialItems = [
  {id: "Item 1", content: "Content 1"},
  {id: "Item 2", content: "Content 2"},
  {id: "Item 3", content: "Content 3"},
]

function App() {
  const [items, setItems] = useState(initialItems);

  const handleDragEnd = (result)=>{
    if(!result.destination) return
    
    const {source, destination} = result;

    const newItems = Array.from(items)
    const [movedItem] = newItems.splice(source.index, 1)
    newItems.splice(destination.index, 0, movedItem)

    setItems(newItems)
  }

  return (
    <div>
      <div>
        <h1>Drag & Drop</h1>
      </div>
      <div className='App'>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable-list">
            {
              (provided)=>(
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {items.map((item,index)=>(
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) =>(
                        <li 
                          className={snapshot.isDragging ? 'dragging' : ''}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        > 
                          {item.content}
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )
            }
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
