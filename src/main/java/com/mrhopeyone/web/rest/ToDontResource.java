package com.mrhopeyone.web.rest;

import com.mrhopeyone.repository.ToDontRepository;
import com.mrhopeyone.service.ToDontService;
import com.mrhopeyone.service.dto.ToDontDTO;
import com.mrhopeyone.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mrhopeyone.domain.ToDont}.
 */
@RestController
@RequestMapping("/api")
public class ToDontResource {

  private final Logger log = LoggerFactory.getLogger(ToDontResource.class);

  private static final String ENTITY_NAME = "toDont";

  @Value("${jhipster.clientApp.name}")
  private String applicationName;

  private final ToDontService toDontService;

  private final ToDontRepository toDontRepository;

  public ToDontResource(ToDontService toDontService, ToDontRepository toDontRepository) {
    this.toDontService = toDontService;
    this.toDontRepository = toDontRepository;
  }

  /**
   * {@code POST  /to-donts} : Create a new toDont.
   *
   * @param toDontDTO the toDontDTO to create.
   * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new toDontDTO, or with status {@code 400 (Bad Request)} if the toDont has already an ID.
   * @throws URISyntaxException if the Location URI syntax is incorrect.
   */
  @PostMapping("/to-donts")
  public ResponseEntity<ToDontDTO> createToDont(@RequestBody ToDontDTO toDontDTO) throws URISyntaxException {
    log.debug("REST request to save ToDont : {}", toDontDTO);
    if (toDontDTO.getId() != null) {
      throw new BadRequestAlertException("A new toDont cannot already have an ID", ENTITY_NAME, "idexists");
    }
    ToDontDTO result = toDontService.save(toDontDTO);
    return ResponseEntity
      .created(new URI("/api/to-donts/" + result.getId()))
      .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
      .body(result);
  }

  /**
   * {@code PUT  /to-donts/:id} : Updates an existing toDont.
   *
   * @param id the id of the toDontDTO to save.
   * @param toDontDTO the toDontDTO to update.
   * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated toDontDTO,
   * or with status {@code 400 (Bad Request)} if the toDontDTO is not valid,
   * or with status {@code 500 (Internal Server Error)} if the toDontDTO couldn't be updated.
   * @throws URISyntaxException if the Location URI syntax is incorrect.
   */
  @PutMapping("/to-donts/{id}")
  public ResponseEntity<ToDontDTO> updateToDont(
    @PathVariable(value = "id", required = false) final Long id,
    @RequestBody ToDontDTO toDontDTO
  ) throws URISyntaxException {
    log.debug("REST request to update ToDont : {}, {}", id, toDontDTO);
    if (toDontDTO.getId() == null) {
      throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
    }
    if (!Objects.equals(id, toDontDTO.getId())) {
      throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
    }

    if (!toDontRepository.existsById(id)) {
      throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
    }

    ToDontDTO result = toDontService.update(toDontDTO);
    return ResponseEntity
      .ok()
      .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, toDontDTO.getId().toString()))
      .body(result);
  }

  /**
   * {@code PATCH  /to-donts/:id} : Partial updates given fields of an existing toDont, field will ignore if it is null
   *
   * @param id the id of the toDontDTO to save.
   * @param toDontDTO the toDontDTO to update.
   * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated toDontDTO,
   * or with status {@code 400 (Bad Request)} if the toDontDTO is not valid,
   * or with status {@code 404 (Not Found)} if the toDontDTO is not found,
   * or with status {@code 500 (Internal Server Error)} if the toDontDTO couldn't be updated.
   * @throws URISyntaxException if the Location URI syntax is incorrect.
   */
  @PatchMapping(value = "/to-donts/{id}", consumes = { "application/json", "application/merge-patch+json" })
  public ResponseEntity<ToDontDTO> partialUpdateToDont(
    @PathVariable(value = "id", required = false) final Long id,
    @RequestBody ToDontDTO toDontDTO
  ) throws URISyntaxException {
    log.debug("REST request to partial update ToDont partially : {}, {}", id, toDontDTO);
    if (toDontDTO.getId() == null) {
      throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
    }
    if (!Objects.equals(id, toDontDTO.getId())) {
      throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
    }

    if (!toDontRepository.existsById(id)) {
      throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
    }

    Optional<ToDontDTO> result = toDontService.partialUpdate(toDontDTO);

    return ResponseUtil.wrapOrNotFound(
      result,
      HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, toDontDTO.getId().toString())
    );
  }

  /**
   * {@code GET  /to-donts} : get all the toDonts.
   *
   * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of toDonts in body.
   */
  @GetMapping("/to-donts")
  public List<ToDontDTO> getAllToDonts() {
    log.debug("REST request to get all ToDonts");
    return toDontService.findAll();
  }

  /**
   * {@code GET  /to-donts/:id} : get the "id" toDont.
   *
   * @param id the id of the toDontDTO to retrieve.
   * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the toDontDTO, or with status {@code 404 (Not Found)}.
   */
  @GetMapping("/to-donts/{id}")
  public ResponseEntity<ToDontDTO> getToDont(@PathVariable Long id) {
    log.debug("REST request to get ToDont : {}", id);
    Optional<ToDontDTO> toDontDTO = toDontService.findOne(id);
    return ResponseUtil.wrapOrNotFound(toDontDTO);
  }

  /**
   * {@code DELETE  /to-donts/:id} : delete the "id" toDont.
   *
   * @param id the id of the toDontDTO to delete.
   * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
   */
  @DeleteMapping("/to-donts/{id}")
  public ResponseEntity<Void> deleteToDont(@PathVariable Long id) {
    log.debug("REST request to delete ToDont : {}", id);
    toDontService.delete(id);
    return ResponseEntity
      .noContent()
      .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
      .build();
  }
}
