import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import data from "../../data";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 8px;
  width: 80%;
  margin: 30px auto;
`;

const Item = styled.div`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 3px;
  margin-bottom: 8px;
`;

type dataType = {
  id: string;
  text: string;
};

function Demo1 () {
  const [list, setList] = useState<dataType[] | null>(null);

  useEffect(() => {
    setList(data);
  }, []);

  return (
    <DragDropContext
      onDragEnd={(result:any) => {
        console.log(result);
        const { source, destination, draggableId } = result;
        if (!destination) {
          return;
        }

        let arr = Array.from(data);
        console.log(arr);
        const [remove] = arr.splice(source.index, 1);
        arr.splice(destination.index, 0, remove);
        setList(arr);
      }}
    >
      <Droppable droppableId="droppable-1">
        {(provided:any) => (
          <Container ref={provided.innerRef} {...provided.droppableProps}>
            {list &&
              list.map((t, i) => (
                <Draggable draggableId={t.id} index={i} key={t.id}>
                  {(p:any) => (
                    <Item
                      ref={p.innerRef}
                      {...p.draggableProps}
                      {...p.dragHandleProps}
                      key={t.id}
                    >
                      {t.text}
                    </Item>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Demo1;