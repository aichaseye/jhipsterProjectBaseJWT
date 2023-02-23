package mfpai.gouv.sn.service;

import java.util.Optional;
import mfpai.gouv.sn.domain.NomLycetech;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link NomLycetech}.
 */
public interface NomLycetechService {
    /**
     * Save a nomLycetech.
     *
     * @param nomLycetech the entity to save.
     * @return the persisted entity.
     */
    NomLycetech save(NomLycetech nomLycetech);

    /**
     * Partially updates a nomLycetech.
     *
     * @param nomLycetech the entity to update partially.
     * @return the persisted entity.
     */
    Optional<NomLycetech> partialUpdate(NomLycetech nomLycetech);

    /**
     * Get all the nomLyceteches.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<NomLycetech> findAll(Pageable pageable);

    /**
     * Get the "id" nomLycetech.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<NomLycetech> findOne(Long id);

    /**
     * Delete the "id" nomLycetech.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
