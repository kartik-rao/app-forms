import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragDropSubContainer from "./DragDropSubContainer";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: 1,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: "auto"
});

export interface IDragDropContainerProps {
  items: any[];
}

@observer
export class DragDropContainer extends Component<IDragDropContainerProps, any> {
  @observable items: any[] = [];

  constructor(props: IDragDropContainerProps) {
    super(props);
    this.items = this.items.concat(props.items)
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  @action onDragEnd(result) {
    // dropped outside the list
    console.log(result);
    console.log("innner drag");
    if (!result.destination) {
      return;
    }
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    // Re order sections
    if (result.type === "section") {
      this.items = reorder(this.items, sourceIndex, destIndex);
    } else if (result.type === "column") {
      let {draggableId, source, destination} = result;
      let fromListId = source.droppableId;
      let fromListIndex = source.index;
      let toListId = destination.droppableId;
      let toListIndex = destination.index;
      let secColMap = {};
      let colFieldMap = {};
      this.items.forEach((section)=>{
        secColMap[section.id] = section.columns;
        section.columns.forEach((column) => {

        })
      })
      if (fromListId == toListId) {
        // get list then reorder within list
        console.log(`Move within list ${fromListId}, from ${fromListIndex} to ${toListIndex}`);
      } else {
        // remove item at index [fromListIndex] from [fromListId]
        // insert item at index [toListIndex] into [toListId]
        console.log(`Move from list ${fromListId}:${fromListIndex} to ${toListId}:${toListIndex}`);
      }

      return;
      const itemSubItemMap = this.items.reduce((acc, item) => {
        acc[item.id] = item.columns;
        return acc;
      }, {});

      const sourceParentId = parseInt(result.source.droppableId);
      const destParentId = parseInt(result.destination.droppableId);

      const sourceSubItems = itemSubItemMap[sourceParentId];
      const destSubItems = itemSubItemMap[destParentId];

      let newItems = [...this.items];

      /** In this case subItems are reOrdered inside same Parent */
      if (sourceParentId === destParentId) {
        const reorderedSubItems = reorder(sourceSubItems, sourceIndex, destIndex );
        newItems = newItems.map(item => {
          if (item.id === sourceParentId) {
            item.columns = reorderedSubItems;
          }
          return item;
        });
        this.items = newItems
      } else {
        let newSourceSubItems = [...sourceSubItems];
        const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);
        let newDestSubItems = [...destSubItems];
        newDestSubItems.splice(destIndex, 0, draggedItem);
        newItems = newItems.map(item => {
          if (item.id === sourceParentId) {
            item.columns = newSourceSubItems;
          } else if (item.id === destParentId) {
            item.columns = newDestSubItems;
          }
          return item;
        });
        this.items = newItems;
      }
    }
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable" type="section">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
              {this.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div>
                      <div ref={provided.innerRef} {...provided.draggableProps}
                        style={getItemStyle( snapshot.isDragging, provided.draggableProps.style )}>
                        {item.content}
                        <span {...provided.dragHandleProps}
                          style={{ display: "inline-block", margin: "0 5px", border: "1px solid #000" }}>
                          Drag
                        </span>
                        <DragDropSubContainer items={item.columns} id={item.id} type={`column`}/>
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
      </DragDropContext>
    );
  }
}