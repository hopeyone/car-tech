package com.mrhopeyone.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mrhopeyone.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ToDontDTOTest {

  @Test
  void dtoEqualsVerifier() throws Exception {
    TestUtil.equalsVerifier(ToDontDTO.class);
    ToDontDTO toDontDTO1 = new ToDontDTO();
    toDontDTO1.setId(1L);
    ToDontDTO toDontDTO2 = new ToDontDTO();
    assertThat(toDontDTO1).isNotEqualTo(toDontDTO2);
    toDontDTO2.setId(toDontDTO1.getId());
    assertThat(toDontDTO1).isEqualTo(toDontDTO2);
    toDontDTO2.setId(2L);
    assertThat(toDontDTO1).isNotEqualTo(toDontDTO2);
    toDontDTO1.setId(null);
    assertThat(toDontDTO1).isNotEqualTo(toDontDTO2);
  }
}
