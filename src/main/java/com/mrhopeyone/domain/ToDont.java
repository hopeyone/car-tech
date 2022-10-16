package com.mrhopeyone.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ToDont.
 */
@Entity
@Table(name = "to_dont")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ToDont implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "title")
  private String title;

  @Column(name = "description")
  private String description;

  @ManyToOne
  @JsonIgnoreProperties(value = { "toDonts" }, allowSetters = true)
  private Group group;

  // jhipster-needle-entity-add-field - JHipster will add fields here

  public Long getId() {
    return this.id;
  }

  public ToDont id(Long id) {
    this.setId(id);
    return this;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getTitle() {
    return this.title;
  }

  public ToDont title(String title) {
    this.setTitle(title);
    return this;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return this.description;
  }

  public ToDont description(String description) {
    this.setDescription(description);
    return this;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Group getGroup() {
    return this.group;
  }

  public void setGroup(Group group) {
    this.group = group;
  }

  public ToDont group(Group group) {
    this.setGroup(group);
    return this;
  }

  // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof ToDont)) {
      return false;
    }
    return id != null && id.equals(((ToDont) o).id);
  }

  @Override
  public int hashCode() {
    // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
    return getClass().hashCode();
  }

  // prettier-ignore
    @Override
    public String toString() {
        return "ToDont{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
