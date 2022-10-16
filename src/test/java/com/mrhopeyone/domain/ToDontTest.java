package com.mrhopeyone.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mrhopeyone.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ToDontTest {

  @Test
  void equalsVerifier() throws Exception {
    TestUtil.equalsVerifier(ToDont.class);
    ToDont toDont1 = new ToDont();
    toDont1.setId(1L);
    ToDont toDont2 = new ToDont();
    toDont2.setId(toDont1.getId());
    assertThat(toDont1).isEqualTo(toDont2);
    toDont2.setId(2L);
    assertThat(toDont1).isNotEqualTo(toDont2);
    toDont1.setId(null);
    assertThat(toDont1).isNotEqualTo(toDont2);
  }
}
