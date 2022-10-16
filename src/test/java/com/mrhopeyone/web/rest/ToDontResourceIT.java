package com.mrhopeyone.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mrhopeyone.IntegrationTest;
import com.mrhopeyone.domain.ToDont;
import com.mrhopeyone.repository.ToDontRepository;
import com.mrhopeyone.service.dto.ToDontDTO;
import com.mrhopeyone.service.mapper.ToDontMapper;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ToDontResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ToDontResourceIT {

  private static final String DEFAULT_TITLE = "AAAAAAAAAA";
  private static final String UPDATED_TITLE = "BBBBBBBBBB";

  private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
  private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

  private static final String ENTITY_API_URL = "/api/to-donts";
  private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

  private static Random random = new Random();
  private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

  @Autowired
  private ToDontRepository toDontRepository;

  @Autowired
  private ToDontMapper toDontMapper;

  @Autowired
  private EntityManager em;

  @Autowired
  private MockMvc restToDontMockMvc;

  private ToDont toDont;

  /**
   * Create an entity for this test.
   *
   * This is a static method, as tests for other entities might also need it,
   * if they test an entity which requires the current entity.
   */
  public static ToDont createEntity(EntityManager em) {
    ToDont toDont = new ToDont().title(DEFAULT_TITLE).description(DEFAULT_DESCRIPTION);
    return toDont;
  }

  /**
   * Create an updated entity for this test.
   *
   * This is a static method, as tests for other entities might also need it,
   * if they test an entity which requires the current entity.
   */
  public static ToDont createUpdatedEntity(EntityManager em) {
    ToDont toDont = new ToDont().title(UPDATED_TITLE).description(UPDATED_DESCRIPTION);
    return toDont;
  }

  @BeforeEach
  public void initTest() {
    toDont = createEntity(em);
  }

  @Test
  @Transactional
  void createToDont() throws Exception {
    int databaseSizeBeforeCreate = toDontRepository.findAll().size();
    // Create the ToDont
    ToDontDTO toDontDTO = toDontMapper.toDto(toDont);
    restToDontMockMvc
      .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(toDontDTO)))
      .andExpect(status().isCreated());

    // Validate the ToDont in the database
    List<ToDont> toDontList = toDontRepository.findAll();
    assertThat(toDontList).hasSize(databaseSizeBeforeCreate + 1);
    ToDont testToDont = toDontList.get(toDontList.size() - 1);
    assertThat(testToDont.getTitle()).isEqualTo(DEFAULT_TITLE);
    assertThat(testToDont.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
  }

  @Test
  @Transactional
  void createToDontWithExistingId() throws Exception {
    // Create the ToDont with an existing ID
    toDont.setId(1L);
    ToDontDTO toDontDTO = toDontMapper.toDto(toDont);

    int databaseSizeBeforeCreate = toDontRepository.findAll().size();

    // An entity with an existing ID cannot be created, so this API call must fail
    restToDontMockMvc
      .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(toDontDTO)))
      .andExpect(status().isBadRequest());

    // Validate the ToDont in the database
    List<ToDont> toDontList = toDontRepository.findAll();
    assertThat(toDontList).hasSize(databaseSizeBeforeCreate);
  }

  @Test
  @Transactional
  void getAllToDonts() throws Exception {
    // Initialize the database
    toDontRepository.saveAndFlush(toDont);

    // Get all the toDontList
    restToDontMockMvc
      .perform(get(ENTITY_API_URL + "?sort=id,desc"))
      .andExpect(status().isOk())
      .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
      .andExpect(jsonPath("$.[*].id").value(hasItem(toDont.getId().intValue())))
      .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
      .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
  }

  @Test
  @Transactional
  void getToDont() throws Exception {
    // Initialize the database
    toDontRepository.saveAndFlush(toDont);

    // Get the toDont
    restToDontMockMvc
      .perform(get(ENTITY_API_URL_ID, toDont.getId()))
      .andExpect(status().isOk())
      .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
      .andExpect(jsonPath("$.id").value(toDont.getId().intValue()))
      .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
      .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
  }

  @Test
  @Transactional
  void getNonExistingToDont() throws Exception {
    // Get the toDont
    restToDontMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
  }

  @Test
  @Transactional
  void putExistingToDont() throws Exception {
    // Initialize the database
    toDontRepository.saveAndFlush(toDont);

    int databaseSizeBeforeUpdate = toDontRepository.findAll().size();

    // Update the toDont
    ToDont updatedToDont = toDontRepository.findById(toDont.getId()).get();
    // Disconnect from session so that the updates on updatedToDont are not directly saved in db
    em.detach(updatedToDont);
    updatedToDont.title(UPDATED_TITLE).description(UPDATED_DESCRIPTION);
    ToDontDTO toDontDTO = toDontMapper.toDto(updatedToDont);

    restToDontMockMvc
      .perform(
        put(ENTITY_API_URL_ID, toDontDTO.getId())
          .contentType(MediaType.APPLICATION_JSON)
          .content(TestUtil.convertObjectToJsonBytes(toDontDTO))
      )
      .andExpect(status().isOk());

    // Validate the ToDont in the database
    List<ToDont> toDontList = toDontRepository.findAll();
    assertThat(toDontList).hasSize(databaseSizeBeforeUpdate);
    ToDont testToDont = toDontList.get(toDontList.size() - 1);
    assertThat(testToDont.getTitle()).isEqualTo(UPDATED_TITLE);
    assertThat(testToDont.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
  }

  @Test
  @Transactional
  void putNonExistingToDont() throws Exception {
    int databaseSizeBeforeUpdate = toDontRepository.findAll().size();
    toDont.setId(count.incrementAndGet());

    // Create the ToDont
    ToDontDTO toDontDTO = toDontMapper.toDto(toDont);

    // If the entity doesn't have an ID, it will throw BadRequestAlertException
    restToDontMockMvc
      .perform(
        put(ENTITY_API_URL_ID, toDontDTO.getId())
          .contentType(MediaType.APPLICATION_JSON)
          .content(TestUtil.convertObjectToJsonBytes(toDontDTO))
      )
      .andExpect(status().isBadRequest());

    // Validate the ToDont in the database
    List<ToDont> toDontList = toDontRepository.findAll();
    assertThat(toDontList).hasSize(databaseSizeBeforeUpdate);
  }

  @Test
  @Transactional
  void putWithIdMismatchToDont() throws Exception {
    int databaseSizeBeforeUpdate = toDontRepository.findAll().size();
    toDont.setId(count.incrementAndGet());

    // Create the ToDont
    ToDontDTO toDontDTO = toDontMapper.toDto(toDont);

    // If url ID doesn't match entity ID, it will throw BadRequestAlertException
    restToDontMockMvc
      .perform(
        put(ENTITY_API_URL_ID, count.incrementAndGet())
          .contentType(MediaType.APPLICATION_JSON)
          .content(TestUtil.convertObjectToJsonBytes(toDontDTO))
      )
      .andExpect(status().isBadRequest());

    // Validate the ToDont in the database
    List<ToDont> toDontList = toDontRepository.findAll();
    assertThat(toDontList).hasSize(databaseSizeBeforeUpdate);
  }

  @Test
  @Transactional
  void putWithMissingIdPathParamToDont() throws Exception {
    int databaseSizeBeforeUpdate = toDontRepository.findAll().size();
    toDont.setId(count.incrementAndGet());

    // Create the ToDont
    ToDontDTO toDontDTO = toDontMapper.toDto(toDont);

    // If url ID doesn't match entity ID, it will throw BadRequestAlertException
    restToDontMockMvc
      .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(toDontDTO)))
      .andExpect(status().isMethodNotAllowed());

    // Validate the ToDont in the database
    List<ToDont> toDontList = toDontRepository.findAll();
    assertThat(toDontList).hasSize(databaseSizeBeforeUpdate);
  }

  @Test
  @Transactional
  void partialUpdateToDontWithPatch() throws Exception {
    // Initialize the database
    toDontRepository.saveAndFlush(toDont);

    int databaseSizeBeforeUpdate = toDontRepository.findAll().size();

    // Update the toDont using partial update
    ToDont partialUpdatedToDont = new ToDont();
    partialUpdatedToDont.setId(toDont.getId());

    partialUpdatedToDont.title(UPDATED_TITLE).description(UPDATED_DESCRIPTION);

    restToDontMockMvc
      .perform(
        patch(ENTITY_API_URL_ID, partialUpdatedToDont.getId())
          .contentType("application/merge-patch+json")
          .content(TestUtil.convertObjectToJsonBytes(partialUpdatedToDont))
      )
      .andExpect(status().isOk());

    // Validate the ToDont in the database
    List<ToDont> toDontList = toDontRepository.findAll();
    assertThat(toDontList).hasSize(databaseSizeBeforeUpdate);
    ToDont testToDont = toDontList.get(toDontList.size() - 1);
    assertThat(testToDont.getTitle()).isEqualTo(UPDATED_TITLE);
    assertThat(testToDont.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
  }

  @Test
  @Transactional
  void fullUpdateToDontWithPatch() throws Exception {
    // Initialize the database
    toDontRepository.saveAndFlush(toDont);

    int databaseSizeBeforeUpdate = toDontRepository.findAll().size();

    // Update the toDont using partial update
    ToDont partialUpdatedToDont = new ToDont();
    partialUpdatedToDont.setId(toDont.getId());

    partialUpdatedToDont.title(UPDATED_TITLE).description(UPDATED_DESCRIPTION);

    restToDontMockMvc
      .perform(
        patch(ENTITY_API_URL_ID, partialUpdatedToDont.getId())
          .contentType("application/merge-patch+json")
          .content(TestUtil.convertObjectToJsonBytes(partialUpdatedToDont))
      )
      .andExpect(status().isOk());

    // Validate the ToDont in the database
    List<ToDont> toDontList = toDontRepository.findAll();
    assertThat(toDontList).hasSize(databaseSizeBeforeUpdate);
    ToDont testToDont = toDontList.get(toDontList.size() - 1);
    assertThat(testToDont.getTitle()).isEqualTo(UPDATED_TITLE);
    assertThat(testToDont.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
  }

  @Test
  @Transactional
  void patchNonExistingToDont() throws Exception {
    int databaseSizeBeforeUpdate = toDontRepository.findAll().size();
    toDont.setId(count.incrementAndGet());

    // Create the ToDont
    ToDontDTO toDontDTO = toDontMapper.toDto(toDont);

    // If the entity doesn't have an ID, it will throw BadRequestAlertException
    restToDontMockMvc
      .perform(
        patch(ENTITY_API_URL_ID, toDontDTO.getId())
          .contentType("application/merge-patch+json")
          .content(TestUtil.convertObjectToJsonBytes(toDontDTO))
      )
      .andExpect(status().isBadRequest());

    // Validate the ToDont in the database
    List<ToDont> toDontList = toDontRepository.findAll();
    assertThat(toDontList).hasSize(databaseSizeBeforeUpdate);
  }

  @Test
  @Transactional
  void patchWithIdMismatchToDont() throws Exception {
    int databaseSizeBeforeUpdate = toDontRepository.findAll().size();
    toDont.setId(count.incrementAndGet());

    // Create the ToDont
    ToDontDTO toDontDTO = toDontMapper.toDto(toDont);

    // If url ID doesn't match entity ID, it will throw BadRequestAlertException
    restToDontMockMvc
      .perform(
        patch(ENTITY_API_URL_ID, count.incrementAndGet())
          .contentType("application/merge-patch+json")
          .content(TestUtil.convertObjectToJsonBytes(toDontDTO))
      )
      .andExpect(status().isBadRequest());

    // Validate the ToDont in the database
    List<ToDont> toDontList = toDontRepository.findAll();
    assertThat(toDontList).hasSize(databaseSizeBeforeUpdate);
  }

  @Test
  @Transactional
  void patchWithMissingIdPathParamToDont() throws Exception {
    int databaseSizeBeforeUpdate = toDontRepository.findAll().size();
    toDont.setId(count.incrementAndGet());

    // Create the ToDont
    ToDontDTO toDontDTO = toDontMapper.toDto(toDont);

    // If url ID doesn't match entity ID, it will throw BadRequestAlertException
    restToDontMockMvc
      .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(toDontDTO)))
      .andExpect(status().isMethodNotAllowed());

    // Validate the ToDont in the database
    List<ToDont> toDontList = toDontRepository.findAll();
    assertThat(toDontList).hasSize(databaseSizeBeforeUpdate);
  }

  @Test
  @Transactional
  void deleteToDont() throws Exception {
    // Initialize the database
    toDontRepository.saveAndFlush(toDont);

    int databaseSizeBeforeDelete = toDontRepository.findAll().size();

    // Delete the toDont
    restToDontMockMvc
      .perform(delete(ENTITY_API_URL_ID, toDont.getId()).accept(MediaType.APPLICATION_JSON))
      .andExpect(status().isNoContent());

    // Validate the database contains one less item
    List<ToDont> toDontList = toDontRepository.findAll();
    assertThat(toDontList).hasSize(databaseSizeBeforeDelete - 1);
  }
}
