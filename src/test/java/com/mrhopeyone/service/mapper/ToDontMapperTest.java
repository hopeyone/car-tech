package com.mrhopeyone.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ToDontMapperTest {

  private ToDontMapper toDontMapper;

  @BeforeEach
  public void setUp() {
    toDontMapper = new ToDontMapperImpl();
  }
}
