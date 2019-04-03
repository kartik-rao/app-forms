import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: 5,
  margin: `0 10px 10px 0`,

  display: "inline-flex",
  // width: "120px",

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",
  border: "1px solid grey",
  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: 2,
  margin: "10px 0"
});

export interface IDragDropContainerProps {
  type: string
  id: string;
  items: any[];
}

export default class DragDropSubContainer extends React.Component<IDragDropContainerProps, any> {
  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    console.log("SubContainer render", this.props.type)
    return (
      <Droppable droppableId={this.props.id} type={this.props.type}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} >
            {this.props.items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div style={{ display: "flex" }}>
                    <div ref={provided.innerRef} {...provided.draggableProps}
                      style={getItemStyle( snapshot.isDragging, provided.draggableProps.style)}>
                      {item.fields && <DragDropSubContainer items={item.fields} id={item.id} type={`field`}/>}
                      <span {...provided.dragHandleProps}
                        style={{ display: "block", margin: "0 5px", border: "1px solid #000" }} >
                        Drag {item.content}
                      </span>
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}