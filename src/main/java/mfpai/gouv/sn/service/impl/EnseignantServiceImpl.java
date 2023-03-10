package mfpai.gouv.sn.service.impl;

import java.util.Optional;
import mfpai.gouv.sn.domain.Enseignant;
import mfpai.gouv.sn.repository.EnseignantRepository;
import mfpai.gouv.sn.service.EnseignantService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Enseignant}.
 */
@Service
@Transactional
public class EnseignantServiceImpl implements EnseignantService {

    private final Logger log = LoggerFactory.getLogger(EnseignantServiceImpl.class);

    private final EnseignantRepository enseignantRepository;

    public EnseignantServiceImpl(EnseignantRepository enseignantRepository) {
        this.enseignantRepository = enseignantRepository;
    }

    @Override
    public Enseignant save(Enseignant enseignant) {
        log.debug("Request to save Enseignant : {}", enseignant);
        return enseignantRepository.save(enseignant);
    }

    @Override
    public Optional<Enseignant> partialUpdate(Enseignant enseignant) {
        log.debug("Request to partially update Enseignant : {}", enseignant);

        return enseignantRepository
            .findById(enseignant.getId())
            .map(existingEnseignant -> {
                if (enseignant.getMatriculeEns() != null) {
                    existingEnseignant.setMatriculeEns(enseignant.getMatriculeEns());
                }
                if (enseignant.getNom() != null) {
                    existingEnseignant.setNom(enseignant.getNom());
                }
                if (enseignant.getPrenom() != null) {
                    existingEnseignant.setPrenom(enseignant.getPrenom());
                }
                if (enseignant.getNumCI() != null) {
                    existingEnseignant.setNumCI(enseignant.getNumCI());
                }
                if (enseignant.getAnneeDentree() != null) {
                    existingEnseignant.setAnneeDentree(enseignant.getAnneeDentree());
                }
                if (enseignant.getRegion() != null) {
                    existingEnseignant.setRegion(enseignant.getRegion());
                }
                if (enseignant.getAutreRegion() != null) {
                    existingEnseignant.setAutreRegion(enseignant.getAutreRegion());
                }
                if (enseignant.getCodeRegion() != null) {
                    existingEnseignant.setCodeRegion(enseignant.getCodeRegion());
                }
                if (enseignant.getAutrecodeRegion() != null) {
                    existingEnseignant.setAutrecodeRegion(enseignant.getAutrecodeRegion());
                }
                if (enseignant.getSexe() != null) {
                    existingEnseignant.setSexe(enseignant.getSexe());
                }
                if (enseignant.getEmail() != null) {
                    existingEnseignant.setEmail(enseignant.getEmail());
                }

                return existingEnseignant;
            })
            .map(enseignantRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Enseignant> findAll(Pageable pageable) {
        log.debug("Request to get all Enseignants");
        return enseignantRepository.findAll(pageable);
    }

    public Page<Enseignant> findAllWithEagerRelationships(Pageable pageable) {
        return enseignantRepository.findAllWithEagerRelationships(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Enseignant> findOne(Long id) {
        log.debug("Request to get Enseignant : {}", id);
        return enseignantRepository.findOneWithEagerRelationships(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Enseignant : {}", id);
        enseignantRepository.deleteById(id);
    }
}
