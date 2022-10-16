package com.mrhopeyone.service.mapper;

import com.mrhopeyone.domain.Group;
import com.mrhopeyone.service.dto.GroupDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Group} and its DTO {@link GroupDTO}.
 */
@Mapper(componentModel = "spring")
public interface GroupMapper extends EntityMapper<GroupDTO, Group> {}
