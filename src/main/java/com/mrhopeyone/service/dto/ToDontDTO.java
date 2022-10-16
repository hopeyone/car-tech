package com.mrhopeyone.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.mrhopeyone.domain.ToDont} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ToDontDTO implements Serializable {

  private Long id;

  private String title;

  private String description;

  private GroupDTO group;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public GroupDTO getGroup() {
    return group;
  }

  public void setGroup(GroupDTO group) {
    this.group = group;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof ToDontDTO)) {
      return false;
    }

    ToDontDTO toDontDTO = (ToDontDTO) o;
    if (this.id == null) {
      return false;
    }
    return Objects.equals(this.id, toDontDTO.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(this.id);
  }

  // prettier-ignore
    @Override
    public String toString() {
        return "ToDontDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", group=" + getGroup() +
            "}";
    }
}
