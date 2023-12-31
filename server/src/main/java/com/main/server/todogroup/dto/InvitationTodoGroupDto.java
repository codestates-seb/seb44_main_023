// package com.main.server.todogroup.dto;

// import com.fasterxml.jackson.annotation.JsonProperty;
// import com.main.server.member.Member;
// import com.main.server.todogroup.domain.TodoGroup;
// import java.util.Collections;
// import java.util.List;
// import java.util.stream.Collectors;
// import javax.validation.constraints.NotBlank;
// import javax.validation.constraints.NotEmpty;
// import lombok.AllArgsConstructor;
// import lombok.Getter;

// public class InvitationTodoGroup {

//     @Getter
//     @AllArgsConstructor
//     public static class Post {

//         @JsonProperty(value = "member_id")
//         private Long memberId;
//         @NotEmpty
//         @JsonProperty(value = "emails")
//         private List<EmailDto> emails;

//         /**
//          * Dto -> Entity 변환하는 역할
//          * new Entity(getField1, getField2);
//          * @param member
//          * @return
//          */
// //        public TodoGroup toEntity(Member member) {
// //            return new TodoGroup(member, emails);
// //        }

//     }

//     @Getter
//     @AllArgsConstructor
//     public static class Response {

//         @JsonProperty(value = "member_id")
//         private Long memberId;

//         @JsonProperty(value = "todo_group_id")
//         private Long todoGroupId;

//         @NotEmpty
//         @JsonProperty(value = "emails")
//         private List<EmailDto> emails;

//         public Response(TodoGroup todoGroup) {
//             this.memberId = todoGroup.getMember().getMemberId();
//             this.todoGroupId = todoGroup.getTodoGroupId();

//             List<Member> members = todoGroup.getTodoGroupMembers().stream()
//                 .map((gm) -> gm.getMember())
//                 .collect(Collectors.toList());

//             this.emails = members.stream()
//                 .map((m) -> m.getEmail())
//                 .map((e) -> new EmailDto(e))
//                 .collect(Collectors.toList());
//         }

//     }

//     @Getter
//     @AllArgsConstructor
//     public static class EmailDto {
//         @NotBlank
//         private String email;
//     }
// }
