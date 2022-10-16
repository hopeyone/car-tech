package com.mrhopeyone.service.mapper;

import com.mrhopeyone.domain.Group;
import com.mrhopeyone.domain.ToDont;
import com.mrhopeyone.service.dto.GroupDTO;
import com.mrhopeyone.service.dto.ToDontDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ToDont} and its DTO {@link ToDontDTO}.
 */
@Mapper(componentModel = "spring")
public interface ToDontMapper extends EntityMapper<ToDontDTO, ToDont> {
  @Mapping(target = "group", source = "group", qualifiedByName = "groupId")
  ToDontDTO toDto(ToDont s);

  @Named("groupId")
  @BeanMapping(ignoreByDefault = true)
  @Mapping(target = "id", source = "id")
  GroupDTO toDtoGroupId(Group group);
}
