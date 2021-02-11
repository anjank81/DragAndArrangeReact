import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
const finalSpaceCharacters = [
  {
    id: 'gary',
    name: 'Gary1 Goodspeed',
    thumb: '/images/gary.png',
  },
  {
    id: 'gary1',
    name: 'Gary2 Goodspeed',
    thumb: '/images/gary.png',
  },
  {
    id: 'gary2',
    name: 'Gary3 Goodspeed',
    thumb: '/images/gary.png',
  },
];

export default class ClassApp extends Component {
  constructor(props) {
    super(props);
    this.state = { characters: finalSpaceCharacters };
  }

  handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(this.state.characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    this.setState({ characters: items });
  }
  render() {
    return (
      <div>
        <DragDropContext onDragEnd={(e) => this.handleOnDragEnd(e)}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul
                className="characters"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {this.state.characters.map(({ id, name, thumb }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className="characters-thumb">
                            <img src={thumb} alt={`${name} Thumb`} />
                          </div>
                          <p>{name}</p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}
