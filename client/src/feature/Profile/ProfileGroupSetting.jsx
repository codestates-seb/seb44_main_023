import { useEffect, useState } from "react";
import { styled } from "styled-components";
import Dropdown from "../../components/Dropdown/Dropdown";
import { readAllTodoGroups } from "../../api/todogroups.api";
import { readAllLedgerGroups } from "../../api/ledgergroups.api";

const ProfileGroupSetting = () => {
  const [groups, setGroups] = useState({ todoGroup: [], ledgerGroup: [] });
  const [mainGroup, setMainGroup] = useState({
    todoGroup: { key: "", label: "" },
    ledgerGroup: { key: "", label: "" },
  });
  const [isLoading, setIsLoading] = useState(true);

  const handleChangeGroup = (event) => {
    let newGroup = {
      ...mainGroup,
      [event.target.id]: JSON.parse(event.target.value),
    };
    setMainGroup(newGroup);
    localStorage.setItem("planfinity-group", JSON.stringify(newGroup));
  };

  const requestGroup = async () => {
    try {
      const todoGroup = await readAllTodoGroups();
      const ledgerGroup = await readAllLedgerGroups();

      setGroups({ todoGroup, ledgerGroup });
      let defaultGroup = JSON.parse(localStorage.getItem("planfinity-group"));
      if (defaultGroup) {
        setMainGroup(defaultGroup);
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    requestGroup();
  }, []);

  if (isLoading) return null;
  return (
    <form onChange={handleChangeGroup}>
      <StyledWrapper>
        <div className="setting-box">
          <div className="setting-box-title">TODO</div>
          <Dropdown
            id="todoGroup"
            menu={
              groups.todoGroup.length
                ? groups.todoGroup.map((groupItem) => {
                    return {
                      label: groupItem.todo_group_title,
                      key: groupItem.todo_group_id,
                    };
                  })
                : []
            }
            defaultKey={mainGroup.todoGroup}
          />
        </div>
        <div className="setting-box">
          <div className="setting-box-title">가계부</div>
          <Dropdown
            id="ledgerGroup"
            menu={
              groups.ledgerGroup.length
                ? groups.ledgerGroup.map((groupItem) => {
                    return {
                      label: groupItem.ledger_group_title,
                      key: groupItem.ledger_group_id,
                    };
                  })
                : []
            }
            defaultKey={mainGroup.ledgerGroup}
          />
        </div>
      </StyledWrapper>
    </form>
  );
};

export default ProfileGroupSetting;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .setting-box {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .setting-box-title {
      margin-right: 4rem;
    }
  }
`;
