package com.mrhopeyone.service;

import com.mrhopeyone.domain.ToDont;
import com.mrhopeyone.repository.ToDontRepository;
import com.mrhopeyone.service.dto.ToDontDTO;
import com.mrhopeyone.service.mapper.ToDontMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ToDont}.
 */
@Service
@Transactional
public class ToDontService {

  private final Logger log = LoggerFactory.getLogger(ToDontService.class);

  private final ToDontRepository toDontRepository;

  private final ToDontMapper toDontMapper;

  public ToDontService(ToDontRepository toDontRepository, ToDontMapper toDontMapper) {
    this.toDontRepository = toDontRepository;
    this.toDontMapper = toDontMapper;
  }

  /**
   * Save a toDont.
   *
   * @param toDontDTO the entity to save.
   * @return the persisted entity.
   */
  public ToDontDTO save(ToDontDTO toDontDTO) {
    log.debug("Request to save ToDont : {}", toDontDTO);
    ToDont toDont = toDontMapper.toEntity(toDontDTO);
    toDont = toDontRepository.save(toDont);
    return toDontMapper.toDto(toDont);
  }

  /**
   * Update a toDont.
   *
   * @param toDontDTO the entity to save.
   * @return the persisted entity.
   */
  public ToDontDTO update(ToDontDTO toDontDTO) {
    log.debug("Request to update ToDont : {}", toDontDTO);
    ToDont toDont = toDontMapper.toEntity(toDontDTO);
    toDont = toDontRepository.save(toDont);
    return toDontMapper.toDto(toDont);
  }

  /**
   * Partially update a toDont.
   *
   * @param toDontDTO the entity to update partially.
   * @return the persisted entity.
   */
  public Optional<ToDontDTO> partialUpdate(ToDontDTO toDontDTO) {
    log.debug("Request to partially update ToDont : {}", toDontDTO);

    return toDontRepository
      .findById(toDontDTO.getId())
      .map(existingToDont -> {
        toDontMapper.partialUpdate(existingToDont, toDontDTO);

        return existingToDont;
      })
      .map(toDontRepository::save)
      .map(toDontMapper::toDto);
  }

  /**
   * Get all the toDonts.
   *
   * @return the list of entities.
   */
  @Transactional(readOnly = true)
  public List<ToDontDTO> findAll() {
    log.debug("Request to get all ToDonts");
    return toDontRepository.findAll().stream().map(toDontMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
  }

  /**
   * Get one toDont by id.
   *
   * @param id the id of the entity.
   * @return the entity.
   */
  @Transactional(readOnly = true)
  public Optional<ToDontDTO> findOne(Long id) {
    log.debug("Request to get ToDont : {}", id);
    return toDontRepository.findById(id).map(toDontMapper::toDto);
  }

  /**
   * Delete the toDont by id.
   *
   * @param id the id of the entity.
   */
  public void delete(Long id) {
    log.debug("Request to delete ToDont : {}", id);
    toDontRepository.deleteById(id);
  }
}
