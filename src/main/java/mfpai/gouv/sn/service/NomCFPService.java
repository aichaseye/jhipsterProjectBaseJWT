package mfpai.gouv.sn.service;

import java.util.Optional;
import mfpai.gouv.sn.domain.NomCFP;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link NomCFP}.
 */
public interface NomCFPService {
    /**
     * Save a nomCFP.
     *
     * @param nomCFP the entity to save.
     * @return the persisted entity.
     */
    NomCFP save(NomCFP nomCFP);

    /**
     * Partially updates a nomCFP.
     *
     * @param nomCFP the entity to update partially.
     * @return the persisted entity.
     */
    Optional<NomCFP> partialUpdate(NomCFP nomCFP);

    /**
     * Get all the nomCFPS.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<NomCFP> findAll(Pageable pageable);

    /**
     * Get the "id" nomCFP.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<NomCFP> findOne(Long id);

    /**
     * Delete the "id" nomCFP.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
