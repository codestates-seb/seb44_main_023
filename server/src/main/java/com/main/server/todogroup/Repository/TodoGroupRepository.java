package com.main.server.todogroup.Repository;

import com.main.server.todogroup.domain.TodoGroup;
import com.main.server.todogroup.domain.TodoGroupMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoGroupRepository extends JpaRepository<TodoGroup, Long> {
}
