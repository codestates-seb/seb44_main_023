import { styled } from "styled-components";
import "dayjs/locale/ko";

const GroupInfo = ({ title, members }) => {
  return (
    <StyledWrapper className="group-info">
      <Title>{title}</Title>
      <MemberWrapper>
        <Member>
          <div className="member-title">member</div>
          {members.members.map((member) => (
            <img
              key={`member-${member.member_id}`}
              id={member.member_id}
              src={member.profile_image}
            />
          ))}
        </Member>
      </MemberWrapper>
    </StyledWrapper>
  );
};

export default GroupInfo;

const StyledWrapper = styled.div``;

const Title = styled.div`
  font-size: 3.2rem;
`;

const MemberWrapper = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
`;

const Member = styled.div`
  font-size: 2.4rem;
  display: flex;
  align-items: center;
  justif-content: center;

  .member-title {
    margin-right: 1.2rem;
  }

  img {
    margin-right: -1rem;
    border-radius: 100%;
    width: 100%;
    width: 4rem;
    height: 4rem;
    object:fit: conver;
  }
`;
