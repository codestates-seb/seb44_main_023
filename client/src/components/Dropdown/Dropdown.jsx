import { styled } from "styled-components";
import { useRef, useState } from "react";
import { AiOutlinePlus, AiOutlineDown } from "react-icons/ai";
import Input from "../../components/Input/PageInput";

const Dropdown = ({ id, menu, add = false, onAddItem = (item) => {} }) => {
  const [isActive, setIsActive] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selected, setSelected] = useState({
    key: "",
    label: "",
  });
  const [newItem, setNewItem] = useState("");

  const inputRef = useRef(selected.label);

  const handleChangeOption = (item) => () => {
    setSelected(item);
    inputRef.current.setAttribute("value", item.label);
    inputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
    handleClickOption();
  };

  const handleClickOption = () => {
    setIsActive(!isActive);
    setIsEdit(false);
  };

  const handleEditMode = () => setIsEdit(!isEdit);

  const handleAddItem = () => {
    setNewItem("");
    handleEditMode();
    onAddItem(newItem);
  };

  const handleNewItem = (event) => setNewItem(event.target.value);

  return (
    <StyledDropdown className="dropdown">
      <input id={id} ref={inputRef} readOnly style={{ display: "none" }} />
      <div className="selected" onClick={handleClickOption}>
        <div className="selected-value">{selected?.label}</div>
        <AiOutlineDown className="down-icon" />
      </div>
      <OptionList isactive={String(isActive)}>
        {menu.map((item) => (
          <li
            className="option"
            key={item.key}
            onClick={handleChangeOption(item)}
          >
            {item.label}
          </li>
        ))}
        {add && (
          <li
            className={`option add ${isEdit ? "edit" : ""}`}
            onClick={!isEdit ? handleEditMode : null}
          >
            {isEdit ? (
              <>
                <Input value={newItem} onChange={handleNewItem} />
                <AiOutlinePlus onClick={handleAddItem} />
              </>
            ) : (
              <>
                추가하기
                <AiOutlinePlus />
              </>
            )}
          </li>
        )}
      </OptionList>
    </StyledDropdown>
  );
};

export default Dropdown;

const StyledDropdown = styled.div`
  color: var(--color-gray-06);
  border: 1px solid var(--color-gray-03);
  border-radius: 5px;
  height: 3.6rem;
  align-items: center;
  min-width: 16rem;
  position: relative;
  cursor: pointer;
  max-width: 20rem;
  font-size: 1.6rem;
  position: relative;
  background-color: var(--color-gray-01);

  .overlay {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    pointer-events: ${({ isactive }) =>
      isactive === "true" ? "default" : "none"};
  }

  .selected {
    position: relative;
    height: 100%;
    padding: 0 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .selected-value {
      margin-right: 0.8rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .down-icon {
      min-width: 1.6rem;
      min-height: 1.6rem;
    }
  }
`;

const OptionList = styled.ul`
  width: 100%;
  z-index: 100 !important;
  list-style-type: none;
  border: 1px solid var(--color-gray-03);
  max-height: 30rem;
  overflow-y: scroll;
  background-color: var(--color-gray-01);
  border-radius: 5px;
  margin-top: 0.1rem;
  display: ${({ isactive }) => (isactive === "true" ? "block" : "none")};
  position: relative;

  .option {
    font-size: 1.6rem;
    padding: 0.8rem 0.8rem;
    transition: 100ms;
    background-color: var(--color-gray-01);

    &: hover {
      background: var(--color-blue-01);
    }

    &.add {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &.edit {
      padding: 0 0.8rem;
    }
  }
`;
