import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import data from "../../data";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  display: flex; // 設定成horizontal sort, 如果要vertical就移掉
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
const Btn = styled.input`
  cursor: pointer;
`;
const Radio = styled.input`
  cursor: pointer;
`;

type dataType = {
  id: string;
  text: string;
};

function Demo1 () {
  const [list, setList] = useState<dataType[] | []>([]);

  const onDragEnd = (result:any) => {
    const newItems = Array.from(list);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    console.log(newItems); // 拖曳結果
    setList(newItems);
  };

  const renderItems = () => {
    const output = list.map((t, i) => (
      <Draggable draggableId={t.id} index={i} key={t.id}>
        {(p:any) => (
          <Item
            ref={p.innerRef}
            {...p.draggableProps}
            {...p.dragHandleProps}
            key={t.id}
          >
            <Radio type='checkbox' />
            {t.text}
            <Btn type='button' value='查詢' onClick={() => {console.log('點擊id:', t.id)}} />
          </Item>
        )}
      </Draggable>
    ));
    return output;
  }

  useEffect(() => {
    setList(data);
  }, []);

  //如果要vertical就移掉direction="horizontal"
  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId="droppable-1" direction="horizontal">
        {(provided:any) => (
          <Container ref={provided.innerRef} {...provided.droppableProps}>
            {list && renderItems()}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Demo1;