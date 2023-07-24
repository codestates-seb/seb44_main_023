import { styled } from "styled-components";
import "dayjs/locale/ko";
import Avatar from "../../assets/avatar.svg";

const GroupInfo = ({ title, members }) => {
	const handleErrorImage = (e) => {
		const randomHue = Math.floor(Math.random() * 360);
		e.target.src = Avatar;
		e.target.style.filter = `invert(16%) sepia(89%) saturate(6054%) hue-rotate(${randomHue}deg) brightness(97%) contrast(113%)`;
	};

	return (
		<StyledWrapper className="group-info">
			<Title>{title}</Title>
			<MemberWrapper>
				<Member>
					<div className="member-title">member</div>
					{members.map((member) => (
						<img
							key={`member-${member.member_id}`}
							id={member.member_id}
							src={member.profile_image}
							onError={handleErrorImage}
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
	font-weight: bold;
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
	justify-content: center;

	.member-title {
		margin-right: 1.2rem;
	}

	img {
		margin-right: -1rem;
		border-radius: 100%;
		width: 100%;
		width: 4rem;
		height: 4rem;
		object-fit: cover;
	}
`;
